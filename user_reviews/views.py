from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import ReviewSerializer
from .models import Review


# Create your views here.

class ReviewList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        reviews = Review.objects.all().order_by('date', 'time')
        serializer = ReviewSerializer(reviews, many=True)

        return Response(serializer.data)


class ReviewDetail(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, fk):
        reviews = Review.objects.get(user_id=fk)
        serializer = ReviewSerializer(reviews, many=False)

        return Response(serializer.data)


class ReviewCreate(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = ReviewSerializer(data=request.data)

        # if you dont have this, Django will throw an error saying you have not validated
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        else:
            return Response('Error with creating review')


class ReviewUpdate(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, fk):
        review = Review.objects.get(user_id=fk)
        serializer = ReviewSerializer(instance=review, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)


class ReviewDelete(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request, pk):
        review = Review.objects.get(id=pk)
        review.delete()

        return Response('Review deleted')
