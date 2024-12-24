#Build Frontend
FROM node:20-alpine as frontend

WORKDIR /usr/src/app
COPY ./frontend /usr/src/app/

RUN npm install
RUN npm run build


#RUN Backend
FROM python:3.13-slim

WORKDIR /code
COPY ./backend/requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./backend/app /code/app

COPY --from=frontend /usr/src/app/dist/frontend /code/app/frontend

ENV STAGE=prod

CMD ["fastapi", "run", "app/main.py", "--port", "99"]