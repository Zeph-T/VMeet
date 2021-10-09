#!e:\python\face-recognition\venv\scripts\python.exe
import cv2
import argparse
import ssl
import numpy as np
from pathlib import Path
import urllib.request

from face_compare.images import get_face
from face_compare.model import facenet_model, img_to_encoding

# load model
model = facenet_model(input_shape=(3, 96, 96))
context = ssl._create_unverified_context()

def get_image_from_url(url):
  resp = urllib.request.urlopen(url, context=context)
  image = np.asarray(bytearray(resp.read()), dtype="uint8")
  image = cv2.imdecode(image, cv2.IMREAD_COLOR)
  return image

def run_from_url(image_one, image_two, save_dest=None):
    face_one = get_image_from_url(image_one)
    face_two = get_image_from_url(image_two)
    return run(face_one, face_two, save_dest)

def run_from_path(image_one, image_two, save_dest=None):
    #load_images
    face_one = get_face(cv2.imread(str(image_one), 1))
    face_two = get_face(cv2.imread(str(image_two), 1))
    return run(face_one, face_two, save_dest)

def run(face_one, face_two, save_dest=None):
    # Optionally save cropped images
    if save_dest is not None:
        print(f'Saving cropped images in {save_dest}.')
        cv2.imwrite(str(save_dest.joinpath('face_one.png')), face_one)
        cv2.imwrite(str(save_dest.joinpath('face_two.png')), face_two)

    # Calculate embedding vectors
    embedding_one = img_to_encoding(face_one, model)
    embedding_two = img_to_encoding(face_two, model)

    dist = np.linalg.norm(embedding_one - embedding_two)
    print(f'Distance between two images is {dist}')
    if dist > 0.7:
        print('These images are of two different people!')
    else:
        print('These images are of the same person!')
    
    return dist
