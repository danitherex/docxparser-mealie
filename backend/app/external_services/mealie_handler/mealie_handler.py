from ..openai_handler.recipe import OpenAIRecipe
import requests
import os 
import logging
import json

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

BASE_URL = os.getenv("MEALIE_BASE_URL")

def add_recipe_to_mealie(recipe_json:dict, token:str):
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    body={
        "includeTags": False,
        "data": json.dumps(recipe_json)
    }
    logger.info(f"{json.dumps(recipe_json)}")
    response = requests.post(f"{BASE_URL}recipes/create/html-or-json", headers=headers, json={
            "includeTags": False,
            "data": json.dumps(recipe_json)
        })
    return response
    