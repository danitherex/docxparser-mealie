
from io import BufferedReader
from docx import Document
from fastapi import UploadFile
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def getTextFromDocx(file:BufferedReader) -> str:
    doc = Document(file)
    fullText = ""
    for para in doc.paragraphs:
        fullText = f"{fullText}\n{para.text}"
    logger.info(f"Text extracted from docx: {fullText}")
    return fullText

