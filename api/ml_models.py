import pickle
from PIL import Image
import numpy as np
import tensorflow as tf
from tensorflow import keras

def load_image_model():
    image_model = keras.models.load_model('x-ray_covid_classifier.h5')
    return image_model

def preprocess_image(img_path):
    img = Image.open(img_path)
    # Remove the alpha channel if it exists
    if img.mode == 'RGBA':
        img = img.convert('RGB')
    img = img.resize((224, 224))
    preprocessed_img = np.array(img)
    preprocessed_img = np.expand_dims(preprocessed_img, axis=0)
    return preprocessed_img

def make_image_predictions(img_path):
    image_model = load_image_model()
    preprocessed_img = preprocess_image(img_path)
    preds = image_model.predict(preprocessed_img)

    class_index_to_label = {0: 'Covid', 1: 'Normal', 2: 'Viral Pneumonia'}
    classification = class_index_to_label[np.argmax(preds)]
    confidence = round(100 * max(preds[0]))
    return classification, confidence


# classification = models.CharField(max_length=30, null=True)
# confidence = models.IntegerField(null=True)

#classification, confidence = make_image_predictions(data['uploadedImage'])