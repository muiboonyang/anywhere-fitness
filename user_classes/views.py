from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import FitnessClassSerializer
from .models import FitnessClass


# Create your views here.

class ClassList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        fitness_classes = FitnessClass.objects.all()
        serializer = FitnessClassSerializer(fitness_classes, many=True)

        return Response(serializer.data)


class ClassDetail(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, fk):
        fitness_classes = FitnessClass.objects.filter(user_id=fk).order_by('date', 'time')
        serializer = FitnessClassSerializer(fitness_classes, many=True)

        return Response(serializer.data)


class ClassCreate(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = FitnessClassSerializer(data=request.data)

        # if you dont have this, Django will throw an error saying you have not validated
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        else:
            return Response('Error with creating class')


class ClassUpdate(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, pk):
        class_details = FitnessClass.objects.get(id=pk)
        serializer = FitnessClassSerializer(instance=class_details, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)


class ClassDelete(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request, pk):
        class_details = FitnessClass.objects.get(id=pk)
        class_details.delete()

        return Response('Unenrolled from class')
