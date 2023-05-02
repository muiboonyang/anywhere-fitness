from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import GymPackagesSerializer
from .models import GymPackages


# Create your views here.

class GymPackagesList(APIView):
    def get(self, request):
        gym_packages = GymPackages.objects.all().order_by('credits')
        serializer = GymPackagesSerializer(gym_packages, many=True)

        return Response(serializer.data)


class GymPackageDetail(APIView):
    def get(self, request, pk):
        gym_package = GymPackages.objects.get(id=pk)
        serializer = GymPackagesSerializer(gym_package, many=False)

        return Response(serializer.data)


class GymPackageCreate(APIView):
    def post(self, request):
        serializer = GymPackagesSerializer(data=request.data)

        # if you dont have this, Django will throw an error saying you have not validated
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        else:
            return Response('Error with creating gym package')


class GymPackageUpdate(APIView):
    def post(self, request, pk):
        gym_package = GymPackages.objects.get(id=pk)

        serializer = GymPackagesSerializer(instance=gym_package, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)


class GymPackageDelete(APIView):
    def delete(self, request, pk):
        gym_package = GymPackages.objects.get(id=pk)
        gym_package.delete()

        return Response('Gym package deleted')
