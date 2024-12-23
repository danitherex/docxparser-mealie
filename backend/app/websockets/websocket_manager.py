from typing import List
from fastapi import WebSocket
import logging


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[str,WebSocket] = {}


    async def connect(self, websocket: WebSocket, token: str):
        await websocket.accept()
        if token not in self.active_connections:
            self.active_connections[token] = websocket

    async def disconnect(self, websocket: WebSocket, token: str):
        if token in self.active_connections:
            del self.active_connections[token]
        logger.info(f"Client disconnected: {token}")

    async def send_message(self, success:bool, token: str, filename :str):
        if token in self.active_connections:
            try:
                message_data = {"success": success, "filename": filename}
                await self.active_connections[token].send_json(message_data)
            except Exception as e:
                logger.error(f"Error while sending message to {token}: {e}")
                del self.active_connections[token]
        else:
            logger.warning(f"No active connection found for token: {token}")
