import logging
import requests
from django.conf import settings

logger = logging.getLogger(__name__)


# if __name__ == "__main__":
#     client = APIClient()
    
#     # GET request example
#     user_id = 1
#     user = client.request('get_user', user_id=user_id)
#     print(f"User details for user_id {user_id}:", user)
    
#     # POST request example
#     new_user_details = {'username': 'johndoe', 'email': 'john@example.com'}
#     new_user = client.request('create_user', **new_user_details)
#     print("New user created:", new_user)
    
class APIClient:
    def __init__(self):
        self.base_url = settings.TACC_APCD_API_HOST

    def request(self, user, path, method, data=None, params=None):
        url = self.base_url + path
        headers = {
            'Authorization': f'Bearer {user.apcd_token.get_token()}',
            'Content-Type': 'application/json'
        }

        response = requests.request(
            method=method,
            url=url,
            headers=headers,
            json=data,
            params=params
        )

        response.raise_for_status()
        if response.content:  # Check if the response contains content
            return response.json()
        return None  # Return None if there is no content in the response

    def get(self, user, path, params=None):
        return self.request(user, path, 'GET', params=params)

    def post(self, user, path, data=None):
        return self.request(user, path, 'POST', data=data)

    def put(self, user, path, data=None):
        return self.request(user, path, 'PUT', data=data)