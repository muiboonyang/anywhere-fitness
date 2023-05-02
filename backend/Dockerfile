FROM python:3.9-alpine

WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

# For PIPENV
# copy these two files from <src> to <dest>
# <src> = current directory on host machine
# <dest> = filesystem of the container
COPY Pipfile Pipfile.lock ./

# install pipenv on the container
RUN pip install -U pipenv

# install project dependencies
RUN pipenv install --system


# copy project
COPY . .
