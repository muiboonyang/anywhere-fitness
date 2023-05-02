from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import AccountSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Account
from rest_framework import status

# JWT settings
from rest_framework_simplejwt.tokens import RefreshToken


# 1) Login new user
# Insert info in payload: username, token, that shows in API call
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['name'] = user.name
        token['surname'] = user.surname
        token['email'] = user.email
        # token['superuser'] = user.is_superuser
        token['admin'] = user.is_admin
        # token['staff'] = user.is_staff
        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# 2) Create new user
class CreateUser(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        else:
            return Response('Error with creating user')


# 3) Update existing user
class UpdateUser(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, pk):
        account_details = Account.objects.get(id=pk)
        serializer = AccountSerializer(instance=account_details, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)


# 4) Get all users
class GetUserAll(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        account_details = Account.objects.all()
        serializer = AccountSerializer(account_details, many=True)

        return Response(serializer.data)

# 5) Get one user
class GetUserOne(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        account_details = Account.objects.get(id=pk)
        serializer = AccountSerializer(account_details, many=False)

        return Response(serializer.data)

# 6) Logout user

class LogoutAndBlacklist(APIView):
    def post(self, request):
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()

        return Response("Logout + token blacklist successful!")



