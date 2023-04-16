from rest_framework.response import Response
from .models import Image
from .serializers import ImageSerializer

def getImageList(request):
    images = Image.objects.all().order_by('-updated_date')
    serializer = ImageSerializer(images, many=True)
    return Response(serializer.data)

def getImageUtil(request, pk):
    image = Image.objects.get(id=pk)
    serializer = ImageSerializer(image, many=False)
    return Response(serializer.data)

def createImage(request):
    data = request.data
    image = Image.objects.create(
        image=data['image']
    )
    serializer = ImageSerializer(image, many=False)
    return Response(serializer.data)

def updateImage(request, pk):
    data = request.data
    image = Image.objects.get(id=pk)
    serializer = ImageSerializer(instance=image, data=data)
    if serializer.is_valid():
        serializer.save()
    return serializer.data

def deleteImage(request, pk):
    image = Image.objects.get(id=pk)
    image.delete()
    return Response('The image instance was deleted.')