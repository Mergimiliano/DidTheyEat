from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
import jwt
from django.conf import settings
from django.utils import timezone

UserProfile = get_user_model()

class UserTest(APITestCase):

    def setUp(self):
        self.email = 'testuser@example.com'
        self.first_name = 'Test'
        self.last_name = 'User'
        self.password = 'Testpassword123'

        self.user = UserProfile.objects.create_user(
            email=self.email,
            first_name=self.first_name,
            last_name=self.last_name,
            password=self.password
        )

        self.deleted_user = UserProfile.objects.create_user(
            email='deleteduser@example.com',
            first_name='Deleted',
            last_name='User',
            password=self.password
        )
        self.deleted_user.deleted_at = timezone.now()
        self.deleted_user.save()

    def test_user_registration(self):
        url = reverse('register')
        response = self.client.post(url, {
            'email': 'newuser@example.com',
            'first_name': 'New',
            'last_name': 'User',
            'password': 'newpassword123',
            'password2': 'newpassword123',
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_login(self):
        url = reverse('get_token')
        response = self.client.post(url, {
            'email': self.email,
            'password': self.password,
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('refresh', response.data)
        self.assertIn('access', response.data)

        access_token = response.data['access']
        refresh_token = response.data['refresh']

        self.assertIsNotNone(access_token)
        self.assertIsNotNone(refresh_token)

        # Decode access token
        try:
            decoded_access = jwt.decode(access_token, settings.PUBLIC_KEY, algorithms=["RS256"])
            self.assertEqual(decoded_access['user_id'], self.user.id)
        except jwt.ExpiredSignatureError:
            self.fail("Access token has expired.")
        except jwt.InvalidTokenError as e:
            self.fail(f"Invalid access token: {e}")

        # Decode refresh token
        try:
            decoded_refresh = jwt.decode(refresh_token, settings.PUBLIC_KEY, algorithms=["RS256"])
            self.assertEqual(decoded_refresh['user_id'], self.user.id)
        except jwt.ExpiredSignatureError:
            self.fail("Refresh token has expired.")
        except jwt.InvalidTokenError as e:
            self.fail(f"Invalid refresh token: {e}")

        response = self.client.post(url, {
            'email': self.deleted_user.email,
            'password': self.password,
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data['detail'], "This account is inactive or deleted.")

    def test_user_logout_with_blacklisted_token(self):
        url = reverse('get_token')
        response = self.client.post(url, {
            'email': self.email,
            'password': self.password,
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        refresh_token = response.data['refresh']

        # Blacklist the refresh token
        RefreshToken(refresh_token).blacklist()

        logout_url = reverse('logout')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh_token}')
        response = self.client.post(logout_url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('detail', response.data)
        self.assertTrue("Given token not valid" in response.data['detail'])
    
    def test_user_refresh_token(self):
        # Obtain a token for a normal user
        url = reverse('get_token')
        response = self.client.post(url, {
            'email': self.email,
            'password': self.password,
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        refresh_token = response.data['refresh']

        # Now attempt to refresh the token
        refresh_url = reverse('token_refresh')
        response = self.client.post(refresh_url, {'refresh': refresh_token})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

        # Simulate the deleted user and try to refresh token
        self.deleted_user.deleted_at = timezone.now()  # Ensure it's deleted
        self.deleted_user.save()

        # Attempt to refresh the token with the deleted user
        response = self.client.post(refresh_url, {'refresh': refresh_token})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data['detail'], "User account is deleted.")