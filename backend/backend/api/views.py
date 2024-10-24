from django.contrib.auth.models import User
from .models import Pet, Community
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer, PetSerializer, CommunitySerializer
from django.utils import timezone
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, PermissionDenied
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken
from rest_framework_simplejwt.tokens import OutstandingToken


class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class Logout(generics.GenericAPIView):
    def post(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        if not auth_header:
            return Response({"detail": "No token provided."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = auth_header.split()[1]
            
            outstanding_token = OutstandingToken.objects.filter(token=token).first()
            if outstanding_token:
                BlacklistedToken.objects.create(token=outstanding_token)

            return Response(status=status.HTTP_205_RESET_CONTENT)

        except IndexError:
            return Response({"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)

class CreatePet(generics.ListCreateAPIView):
    serializer_class = PetSerializer

    def get_queryset(self):
        community_id = self.kwargs.get('community_id')
        return Pet.objects.filter(community_id=community_id)

    def perform_create(self, serializer):
        community_id = self.kwargs.get('community_id')
        if not Community.objects.filter(id=community_id).exists():
            raise ValidationError("The specified community does not exist.")
        serializer.save(created_by=self.request.user.username)

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
        pet.save()
        return Response(PetSerializer(pet).data, status=status.HTTP_200_OK)

class CreateCommunity(generics.ListCreateAPIView):
    serializer_class = CommunitySerializer

    def get_queryset(self):
        return self.request.user.communities.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user.username)

class CommunityDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommunitySerializer

    def get_object(self):
        community = get_object_or_404(Community, id=self.kwargs['pk'])
        if self.request.user not in community.users.all():
            self.permission_denied(self.request, message="You do not have access to this community.")
        return community
