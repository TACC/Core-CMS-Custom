import logging
from .client import APIClient
import json


logger = logging.getLogger(__name__)


def get_users(user, page_num: 1, limit: 50, status: None, org: None):
    client = APIClient()
    payload = {
        'page': page_num,
        'per_page': limit,
        'status': status,
        'org': org,
    }
    return client.get(user, '/users/paged_users/', params=payload)


def update_api_users(user, user_id: int, payload: dict):
    client = APIClient()
    return client.get(user, '/users/{user_id}', data=json.dumps(payload))


def get_user_orgs(user):
    client = APIClient()
    return client.get(user, '/users/orgs')
