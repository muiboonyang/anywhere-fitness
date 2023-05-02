from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import TransactionsSerializer
from .models import Transactions


# Create your views here.

class TransactionList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        transaction = Transactions.objects.all()
        serializer = TransactionsSerializer(transaction, many=True)

        return Response(serializer.data)


class TransactionDetail(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, fk):
        transaction = Transactions.objects.filter(user_id=fk).order_by('date', 'time')
        serializer = TransactionsSerializer(transaction, many=True)

        return Response(serializer.data)


class TransactionCreate(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = TransactionsSerializer(data=request.data)

        # if you dont have this, Django will throw an error saying you have not validated
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        else:
            return Response('Error with creating transaction')


class TransactionUpdate(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, fk):
        transaction = Transactions.objects.get(user_id=fk)
        serializer = TransactionsSerializer(instance=transaction, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)


class TransactionDelete(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request, pk):
        transaction = Transactions.objects.get(id=pk)
        transaction.delete()

        return Response('Review deleted')
