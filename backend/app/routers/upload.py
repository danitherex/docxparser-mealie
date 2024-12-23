import shutil
from tempfile import NamedTemporaryFile
from typing import Annotated, List
from fastapi import APIRouter, File, UploadFile, Depends,BackgroundTasks

from ..websockets.websocket_manager import ConnectionManager
from ..utils.check_extension import is_docx
from ..external_services.docx_handler.docx_handler import getTextFromDocx
from ..external_services.openai_handler.openai_handler import OpenAIConverter
from ..external_services.mealie_handler.mealie_handler import add_recipe_to_mealie
from ..dependencies import verify_token,get_manager
import logging
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
router = APIRouter()

openAIConverter = OpenAIConverter()

async def parse_and_add_to_mealie(file_path:str,mealie_token:str,file_name:str,ws_manager:ConnectionManager):
    logger.info(f"Processing file '{file_name}'")
    failed_files = []
    try:
        with open(file_path, "rb") as file:
            text = getTextFromDocx(file)
        recipe = openAIConverter.create_json_from_text(text)
        logger.info(f"Recipe Object created!")
        response = add_recipe_to_mealie(recipe,mealie_token)
        if response.status_code <300:
            await ws_manager.send_message(True,mealie_token,file_name)
            logger.info(f"Recipe added to mealie successfully")
        else:
            await ws_manager.send_message(False,mealie_token,file_name)
            logger.error(f"Failed to add recipe to mealie. {response.status_code}: {response.json()}")
            failed_files.append(file.filename)
    except Exception as e:
        await ws_manager.send_message(False,mealie_token,file_name)
        logger.error(f"Error while processing file '{file_name}': {e}")
        failed_files.append(file_name)
    finally:
        os.remove(file_path)



@router.post("/upload")
def upload_files(background_tasks: BackgroundTasks, files:List[UploadFile],mealie_token :str= Depends(verify_token),ws_manager=Depends(get_manager)):
    failed_files = []
    for file in files:
        if is_docx(file.filename):
            with NamedTemporaryFile(delete=False,suffix=".docx") as temp:
                shutil.copyfileobj(file.file,temp)
                temp_file_path = temp.name
            background_tasks.add_task(parse_and_add_to_mealie,temp_file_path,mealie_token,file.filename,ws_manager)            
        else:
            logger.error(f"File '{file.filename}' is not a docx file")
            failed_files.append(file.filename)
    return {"failed_files": failed_files}