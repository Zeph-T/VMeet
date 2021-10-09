FROM python:3.8.6

WORKDIR /usr/src/app

# COPY assets ./assets

COPY requirements.txt ./

RUN pip install --upgrade pip

RUN pip install flask
RUN pip install flask_cors
RUN pip install waitress
RUN pip install face-compare
RUN pip uninstall tensorflow -y
RUN pip install tensorflow-cpu==2.6.0
RUN pip install intel-tensorflow==2.6.0
RUN pip install opencv-python

RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y

COPY app ./app

EXPOSE 8080

ENTRYPOINT [ "python" ]

CMD ["app/app.py","run","--host","0.0.0.0"]