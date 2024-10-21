from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Pet, Community
from rest_framework import generics
from .serializers import UserSerializer, PetSerializer, CommunitySerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CreatePet(generics.ListCreateAPIView):
    serializer_class = PetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Pet.objects.filter(created_by=user.username)
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user.username)
