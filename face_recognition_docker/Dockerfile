FROM python:3.8.6

WORKDIR /usr/src/app

# COPY assets ./assets

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY app ./app

EXPOSE 80

ENTRYPOINT [ "python" ]

CMD ["app/app.py"]