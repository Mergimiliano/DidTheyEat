from django.contrib import admin
from django.urls import path
from api.views import CreateUser, CreateCommunity, CreatePet, CommunityDetail, Logout, PetDetail, FeedPet, CustomTokenObtainPairView, CustomTokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("user/register/", CreateUser.as_view(), name="register"),
    path("token/", CustomTokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", CustomTokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", Logout.as_view(), name="logout"),
    path('communities/', CreateCommunity.as_view(), name='create_community'),
    path('communities/<int:pk>/', CommunityDetail.as_view(), name='community_detail'),
    path('communities/<int:community_id>/pets/', CreatePet.as_view(), name='create_pet'),
    path('pets/<int:pk>/', PetDetail.as_view(), name='pet_detail'),
    path('pets/<int:pk>/feed/', FeedPet.as_view(), name='feed_pet'),
]