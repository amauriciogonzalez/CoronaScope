from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Image
from .ml_models import make_image_predictions
from django.http import HttpResponse
from django.conf import settings
import os

from .serializers import ImageSerializer

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/images/',
            'method': 'GET',
            'description': 'Returns an array of images'
        },
        {
            'Endpoint': '/images/id',
            'method': 'GET',
            'description': 'Returns an image with the specified id'
        },
        {
            'Endpoint': '/images/create',
            'method': 'POST',
            'description': 'Creates an image with data sent in a post request'
        },
        {
            'Endpoint': '/images/id/update',
            'method': 'POST',
            'description': 'Updates an image with the specified id with data sent in a post request'
        },
        {
            'Endpoint': '/images/id/delete',
            'method': 'DELETE',
            'description': 'Deletes an image with the specified id'
        },
    ]
    return Response(routes)


@api_view(['GET'])
def getImageList(request):
    images = Image.objects.all().order_by('-updated_date')
    serializer = ImageSerializer(images, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getImage(request, pk):
    image = Image.objects.get(id=pk)
    serializer = ImageSerializer(image, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def createImage(request):
    data = request.data
    classification, confidence = make_image_predictions(data['uploadedImage'])
    image = Image.objects.create(
        image=data['uploadedImage'],
        classification=classification,
        confidence=confidence,
    )
    serializer = ImageSerializer(image, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateImage(request, pk):
    data = request.data
    image = Image.objects.get(id=pk)
    old_file_path = os.path.join(settings.MEDIA_ROOT, str(image.image))
    classification, confidence = make_image_predictions(data['updatedImage'])
    image.image = data['updatedImage']
    image.classification = classification
    image.confidence = confidence
    image.save()
    # Check if the image file exists
    if os.path.exists(old_file_path):
        # Delete the image file
        os.remove(old_file_path)
    serializer = ImageSerializer(image, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteImage(request, pk):
    image = Image.objects.get(id=pk)
    file_path = os.path.join(settings.MEDIA_ROOT, str(image.image))
    # Delete the image from the database
    image.delete()
    # Check if the image file exists
    if os.path.exists(file_path):
        # Delete the image file
        os.remove(file_path)
    return Response('The image instance was deleted.')


def displayImage(request, pk):
    # Set the file path of the image
    image_instance = Image.objects.get(id=pk)
    file_path = os.path.join(settings.MEDIA_ROOT, str(image_instance.image))

    # Open the image file in binary mode
    with open(file_path, 'rb') as image_file:
        # Read the binary data from the file
        image_data = image_file.read()

    # Create an HttpResponse with the binary data as the content
    return  HttpResponse(image_data, content_type='image/jpeg')


def downloadSampleImages(request):
    zip_path = os.path.join(settings.MEDIA_ROOT, 'SamplePictures.zip')
    with open(zip_path, 'rb') as zip_file:
        # Create an HttpResponse with the zip file as content
        response = HttpResponse(zip_file, content_type='application/zip')
        # Set the Content-Disposition header to trigger download
        response['Content-Disposition'] = 'attachment; filename=SamplePictures.zip'
        return response
