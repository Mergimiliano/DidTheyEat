from django.contrib.auth.models import User
from .models import Pet, Community
from rest_framework import generics
from .serializers import UserSerializer, PetSerializer, CommunitySerializer
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import NotFound, MethodNotAllowed
from django.utils import timezone

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CreatePet(generics.ListCreateAPIView):
    serializer_class = PetSerializer

    def get_queryset(self):
        community_id = self.kwargs.get('community_id')
        return Pet.objects.filter(community_id=community_id)
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user.username)

class PetRetrievalMixin:
    def get_pet(self):
        try:
            return Pet.objects.get(id=self.kwargs['pk'])
        except Pet.DoesNotExist:
            raise NotFound({"detail": "Pet not found."})
        
    def get_pets(self, community_id):
        return Pet.objects.filter(community_id=community_id)

class PetDetail(PetRetrievalMixin, generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PetSerializer

    def perform_update(self, serializer):
        if self.request.data.get('fed') == 'true':  
            serializer.save(fed=True, fed_at=timezone.now())
        else:
            serializer.save()
 
    def get_object(self):
        return self.get_pet()
    
class CreateCommunity(generics.ListCreateAPIView):
    serializer_class = CommunitySerializer

    def get_queryset(self):
        user = self.request.user
        return Community.objects.filter(users=user)

    def perform_create(self, serializer): 
        serializer.save(created_by=self.request.user.username)

class CommunityRetrievalMixin:
    def get_community(self):
        try:
            return Community.objects.get(id=self.kwargs['pk'])
        except Community.DoesNotExist:
            raise NotFound({"detail": "Community not found."})
        
    def get_communities(self):
        user = self.request.user
        return Community.objects.filter(users=user)

class CommunityDetail(CommunityRetrievalMixin, generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommunitySerializer

    def get_object(self):
        community = self.get_community()
        if self.request.user not in community.users.all():
            raise MethodNotAllowed({"detail": "You do not have access to this community."})
        return community
