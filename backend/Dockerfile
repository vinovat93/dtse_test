FROM python:3.9.13
ENV PYTHONUNBUFFERED = 1
ENV PYTHONDONTWRITEBYTECODE = 1
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code/
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]