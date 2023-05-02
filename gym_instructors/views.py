from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import GymInstructorsSerializer
from .models import GymInstructors


# Create your views here.

class GymInstructorsList(APIView):
    def get(self, request):
        gym_instructors = GymInstructors.objects.all().order_by('name')
        serializer = GymInstructorsSerializer(gym_instructors, many=True)

        return Response(serializer.data)


class GymInstructorDetail(APIView):
    def get(self, request, pk):
        gym_instructor = GymInstructors.objects.get(id=pk)
        serializer = GymInstructorsSerializer(gym_instructor, many=False)

        return Response(serializer.data)


class GymInstructorCreate(APIView):
    def post(self, request):
        serializer = GymInstructorsSerializer(data=request.data)

        # if you dont have this, Django will throw an error saying you have not validated
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        else:
            return Response('Error with creating gym instructor')


class GymInstructorUpdate(APIView):
    def post(self, request, pk):
        gym_instructor = GymInstructors.objects.get(id=pk)

        serializer = GymInstructorsSerializer(instance=gym_instructor, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)


class GymInstructorDelete(APIView):
    def delete(self, request, pk):
        gym_instructor = GymInstructors.objects.get(id=pk)
        gym_instructor.delete()

        return Response('Gym instructor deleted')
