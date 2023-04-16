from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Image
from .utils import getImageList, createImage, getImageUtil, updateImage, deleteImage
from django.http import HttpResponse
from django.conf import settings
import os

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
            'body': {'image': ""},
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


@api_view(['GET', 'POST'])
def getImages(request):
    if request.method == 'GET':
        return getImageList(request)
    elif request.method == 'POST':
        return createImage(request)


@api_view(['GET', 'PUT', 'DELETE'])
def getImage(request, pk):
    if request.method == 'GET':
        return getImageUtil(request, pk)
    elif request.method == 'PUT':
        return updateImage(request, pk)
    elif request.method == 'DELETE':
        return deleteImage(request, pk)


def displayImage(request, pk):
    # Set the file path of the image
    image_instance = Image.objects.get(id=pk)
    file_path = os.path.join(settings.MEDIA_ROOT, str(image_instance.image))
    print(file_path)

    # Open the image file in binary mode
    with open(file_path, 'rb') as image_file:
        # Read the binary data from the file
        image_data = image_file.read()

    # Create an HttpResponse with the binary data as the content
    return  HttpResponse(image_data, content_type='image/jpeg')