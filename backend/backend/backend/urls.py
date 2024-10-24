from django.contrib import admin
from django.urls import path, include
from api.views import CreateUser, CreateCommunity, CreatePet, CommunityDetail, Logout, PetDetail, FeedPet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("user/register/", CreateUser.as_view(), name="register"),
    path("token/", TokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("logout/", Logout.as_view(), name="logout"),
    path('communities/', CreateCommunity.as_view(), name='create_community'),
    path('communities/<int:pk>/', CommunityDetail.as_view(), name='community_detail'),
    path('communities/<int:community_id>/pets/', CreatePet.as_view(), name='create_pet'),
    path('pets/<int:pk>/', PetDetail.as_view(), name='pet_detail'),
    path('pets/<int:pk>/feed/', FeedPet.as_view(), name='feed_pet'),
]
