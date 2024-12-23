import jwt
from typing import Annotated
import time

from fastapi import Header,HTTPException

from .websockets.websocket_manager import ConnectionManager

manager = ConnectionManager()


async def verify_token(token:Annotated[str,Header()]):
    if len(token)>0:
        try:
            header  = jwt.decode(token,algorithms=["HS256"],options={"verify_signature":False})
            expiration = header["exp"]
            valid = time.time() < expiration
            if valid:
                return token
        except:
            raise HTTPException(status_code=401,detail="Invalid token")
    raise HTTPException(status_code=401,detail="Authorization header is missing")


def get_manager():
    return manager