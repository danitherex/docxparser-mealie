import json
from textwrap import dedent
from openai import OpenAI
import logging
from .recipe import OpenAIDataInjection, OpenAIRecipe


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class OpenAIConverter:
    def __init__(self):
        self.client = OpenAI()
        self.prePrompt = ""
        self.__generate_prepromt()

    def __generate_prepromt(self):
        prePrompt= ""
        with open("app/external_services/openai_handler/parse-recipe-text.txt", "r") as file:
            file_contents = file.read()
            prePrompt = file_contents
        
        description = '''
        This is the JSON response schema. You must respond in valid JSON that follows this schema. 
        Your payload should be as compact as possible, eliminating unncessesary whitespace. 
        Any fields with default values which you do not populate should not be in the payload.
        You should not prefix the json Object with the word 'json' or any other word that would make the json invalid when copied and pasted into a json file.
        '''

        data_injection = OpenAIDataInjection(
            description=(description),
            value=OpenAIRecipe,
        )


        self.prePrompt=prePrompt+ dedent(
        f"""
        ###
        {data_injection.description}
        ---

        {data_injection.value}
        """
        )

    def create_json_from_text(self,recipe_text:str):
        prompt = f"{self.prePrompt}\n\n{recipe_text}"

        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": prompt},
            ]
        )

        content = response.choices[0].message.content
        logger.info(f"Response: {content}")
        try:
            json_response = json.loads(content)
            #recipe = OpenAIRecipe(**json_response)
            return json_response
        except Exception as e:
            logger.error(f"Error while converting response to json: {e}")
            return None