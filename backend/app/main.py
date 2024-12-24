from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends

from .dependencies import get_manager
from .websockets.websocket_manager import ConnectionManager
from .routers import upload
import dotenv
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import logging
from fastapi.responses import HTMLResponse
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

STAGE = os.getenv("STAGE", "dev")




dotenv.load_dotenv()

app = FastAPI()
if STAGE == "dev":
    logger.info("Running in dev mode")
    origins = [
        "http://localhost",
        "http://localhost:4200",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    logger.info("Running in prod mode")
    # Serve static files for assets
    app.mount('/frontend/', StaticFiles(directory='/code/app/frontend/browser', html=True), name='static')

app.include_router(upload.router)


# WebSocket endpoint
@app.websocket("/ws/{token}",)
async def websocket_endpoint(websocket: WebSocket, token: str, manager: ConnectionManager = Depends(get_manager)):
    await manager.connect(websocket, token)
    while True:
        try:
            await websocket.receive_text()
        except WebSocketDisconnect:
            await manager.disconnect(websocket, token)
            break

    
