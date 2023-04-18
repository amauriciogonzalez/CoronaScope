from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Image
#from .utils import getImageList, createImage, getImageUtil, updateImage, deleteImage
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


# @api_view(['GET', 'POST'])
# def getImages(request):
#     if request.method == 'GET':
#         return getImageList(request)
#     elif request.method == 'POST':
#         return createImage(request)


# @api_view(['GET', 'PUT', 'DELETE'])
# def getImage(request, pk):
#     if request.method == 'GET':
#         return getImageUtil(request, pk)
#     elif request.method == 'PUT':
#         return updateImage(request, pk)
#     elif request.method == 'DELETE':
#         return deleteImage(request, pk)


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
    print('HEY', data['uploadedImage'])
    image = Image.objects.create(
        image=data['uploadedImage']
    )
    serializer = ImageSerializer(image, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateImage(request, pk):
    data = request.data
    image = Image.objects.get(id=pk)
    image.image = data['updatedImage']
    image.save()
    serializer = ImageSerializer(image, many=False)
    return Response(serializer.data)




# @api_view(['POST'])
# def updateImage(request, pk):
#     data = request.data
#     try:
#         image = Image.objects.get(id=pk)
#     except Image.DoesNotExist:
#         print('IMAGE DOES NOT EXIST')
#         return Response({"error": "Image not found"}, status=status.HTTP_404_NOT_FOUND)

#     serializer = ImageSerializer(instance=image, data=data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     else:
#         print('INVALID SERIALIZER UPDATE:', serializer.errors)
#         return Response(serializer.errors)


@api_view(['DELETE'])
def deleteImage(request, pk):
    image = Image.objects.get(id=pk)
    image.delete()
    return Response('The image instance was deleted.')


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
