from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, PermissionDenied, AuthenticationFailed
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework.views import APIView
from .models import Pet, Community, UserProfile
from .serializers import UserProfileSerializer, PetSerializer, CommunitySerializer

User = get_user_model()

class CreateUser(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [AllowAny]


class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        user = User.objects.filter(email=request.data.get('email')).first()
        if user and (user.deleted_at is None):
            return super().post(request, *args, **kwargs)
        else:
            raise AuthenticationFailed("This account is inactive or deleted.")
        
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        if 'refresh' not in request.data:
            return Response({"detail": "Refresh token is missing."}, status=400)

        refresh_token = request.data['refresh']
        try:
            token = RefreshToken(refresh_token)
        except InvalidToken:
            return Response({"detail": "Invalid or expired token."}, status=401)
        
        serializer = TokenRefreshSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except InvalidToken:
            return Response({"detail": "Invalid or expired token."}, status=401)
        
        user_id = token['user_id']
        try:
            user = get_user_model().objects.get(id=user_id)
            if user.deleted_at is not None:
                return Response({"detail": "User account is deleted."}, status=401)
        except get_user_model().DoesNotExist:
            return Response({"detail": "User not found."}, status=404)

        return Response(serializer.validated_data, status=200)


class Logout(APIView):
    def post(self, request):
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response({"detail": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Logout successful."}, status=status.HTTP_200_OK)

        except TokenError as e:
            print(f"TokenError: {str(e)}")
            return Response({"detail": str(e)}, status=status.HTTP_401_UNAUTHORIZED)

        except Exception:
            return Response({"detail": "An error occurred."}, status=status.HTTP_400_BAD_REQUEST)

class SoftDeleteProfileView(APIView):
    def delete(self, request, *args, **kwargs):
        user = request.user

        ''' 
        if user != request.user:
        return Response({"detail": "You can only delete your own account."}, status=status.HTTP_400_BAD_REQUEST)
        '''
        user.deleted_at = timezone.now()
        user.save()

        return Response({"detail": "Account successfully deleted."}, status=status.HTTP_200_OK)

class CreatePet(generics.ListCreateAPIView):
    serializer_class = PetSerializer

    def get_queryset(self):
        community_id = self.kwargs.get('community_id')
        return Pet.objects.filter(community_id=community_id)

    def perform_create(self, serializer):
        community_id = self.kwargs.get('community_id')
        if not Community.objects.filter(id=community_id).exists():
            raise ValidationError("The specified community does not exist.")
        user = self.request.user
        created_by_name = f"{user.first_name} {user.last_name}"
        serializer.save(created_by=created_by_name)

class PetDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PetSerializer

    def get_object(self):
        return get_object_or_404(Pet, id=self.kwargs['pk'])

    def perform_update(self, serializer):
        serializer.save()

class FeedPet(generics.UpdateAPIView):
    serializer_class = PetSerializer

    def get_object(self):
        pet = get_object_or_404(Pet, id=self.kwargs['pk'])
        if pet.community not in self.request.user.communities.all():
            raise PermissionDenied("You do not have permission to feed this pet.")
        return pet
    
    def patch(self, request, *args, **kwargs):
        pet = self.get_object()
        if pet.fed:
            return Response({"detail": "This pet has already been fed."}, status=status.HTTP_400_BAD_REQUEST)
        pet.fed = True
        pet.fed_at = timezone.now()
        pet.fed_by = f"{request.user.first_name} {request.user.last_name}"
        pet.save()
        return Response(PetSerializer(pet).data, status=status.HTTP_200_OK)

class CreateCommunity(generics.ListCreateAPIView):
    serializer_class = CommunitySerializer

    def get_queryset(self):
        return self.request.user.communities.all()

    def perform_create(self, serializer):
        user = self.request.user
        created_by_name = f"{user.first_name} {user.last_name}"

        community = serializer.save(
            created_by=created_by_name,
            users=[user]
        )

class CommunityDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommunitySerializer

    def get_object(self):
        community = get_object_or_404(Community, id=self.kwargs['pk'])
        if self.request.user not in community.users.all():
            self.permission_denied(self.request, message="You do not have access to this community.")
        return community
