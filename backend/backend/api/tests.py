from django.urls import reverse
from django.contrib.auth.models import User
import jwt
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from .models import Community, Pet

class APITests(APITestCase):
    def setUp(self):
        # Create a user
        self.user_data = {"username": "testuser", "password": "testpassword"}
        self.user = User.objects.create_user(**self.user_data)

        # Create a community
        self.community = Community.objects.create(name="Test Community", created_by=self.user.username)
        self.community.users.add(self.user)

        # Create a refresh token for the user
        self.refresh = RefreshToken.for_user(self.user)
        self.access_token = str(self.refresh.access_token)
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)

    def test_user_registration_and_login(self):
        # Test user registration
        response = self.client.post(reverse('register'), data={"username": "newuser", "password": "newpassword"})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Test login and token acquisition
        response = self.client.post(reverse('get_token'), data={"username": "newuser", "password": "newpassword"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        access_token = response.data['access']

        # Decode and verify the token
        decoded_token = jwt.decode(
            access_token,
            settings.SIMPLE_JWT['VERIFYING_KEY'],
            algorithms=[settings.SIMPLE_JWT['ALGORITHM']]
        )
        self.assertEqual(decoded_token['user_id'], 2)  # Check against the new user's ID (assuming it's 2)

    def test_create_community(self):
        # Create a new community
        response = self.client.post(reverse('create_community'), {"name": "New Community"})
        print(response.data)  # Debugging line to show response data
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_pet_in_community(self):
        pet_data = {"name": "Buddy", "type": "dog", "community": self.community.id}
        response = self.client.post(reverse('create_pet', kwargs={"community_id": self.community.id}), data=pet_data)
        print(response.data)  # Debugging line to show response data
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Buddy')
        self.assertEqual(response.data['type'], 'dog')

    def test_feed_pet(self):
        pet = Pet.objects.create(name="Buddy", type="dog", community=self.community, created_by=self.user.username)
        response = self.client.patch(reverse('feed_pet', kwargs={'pk': pet.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['fed'])
        self.assertIsNotNone(response.data['fed_at'])

    def test_logout(self):
        # Send a logout request
        response = self.client.post(reverse('logout'))

        # Ensure the response is valid (status code 205 for reset content)
        self.assertEqual(response.status_code, status.HTTP_205_RESET_CONTENT)

        # Try to access a protected resource after logging out
        response = self.client.get(reverse('community_detail', kwargs={'pk': self.community.id}))

        # Assert that access is denied
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # Verify the token is blacklisted
        self.refresh.blacklist()  # Explicitly blacklist the token for checking
        response = self.client.get(reverse('community_detail', kwargs={'pk': self.community.id}))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_blacklisted_token_access(self):
        # Blacklist the refresh token
        self.refresh.blacklist()

        # Try to access a protected view with the blacklisted token
        response = self.client.get(reverse('community_detail', kwargs={'pk': self.community.id}))

        # Print response status code and data for debugging
        print("Status Code:", response.status_code)  # Should be 401
        print("Response Data:", response.data)  # Check if there is any error message

        # Assert that access is denied
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_invalid_community_access(self):
        other_user = User.objects.create_user(username='otheruser', password='otherpassword')
        other_community = Community.objects.create(name="Other Community", created_by=other_user.username)

        # Attempt to access the other user's community
        response = self.client.get(reverse('community_detail', kwargs={'pk': other_community.id}))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_invalid_pet_access(self):
        other_user = User.objects.create_user(username='otheruser', password='otherpassword')
        other_community = Community.objects.create(name="Other Community", created_by=other_user.username)
        pet = Pet.objects.create(name="OtherPet", type="cat", community=other_community, created_by=other_user.username)

        # Try to access a pet from another user's community
        response = self.client.get(reverse('pet_detail', kwargs={'pk': pet.id}))
        print(response.data)  # Debugging line to show response data
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_community_details(self):
        response = self.client.get(reverse('community_detail', kwargs={'pk': self.community.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Test Community')

    def test_get_pet_details(self):
        pet = Pet.objects.create(name="Buddy", type="dog", community=self.community, created_by=self.user.username)
        response = self.client.get(reverse('pet_detail', kwargs={'pk': pet.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Buddy')
