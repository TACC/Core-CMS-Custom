import logging
from .client import APIClient


logger = logging.getLogger(__name__)

def get_registration(user, reg_id):
    client = APIClient()
    return client.get(user, f'registrations/{reg_id}')

def get_registrations(user, page_num: 1, limit: 50):
    client = APIClient()
    return client.get(user, '/registrations/', params={'skip': page_num * limit, 'limit': limit})

def get_registrations_by_submitter_id(user, submitter_code, page: 1, page_limit: 50):
    client = APIClient()
    return client.get(user, '/registrations/', params={'page': page, 'per_page': page_limit, submitter_code: submitter_code})

def create_registration(user, data):
    client = APIClient()
    return client.post(user, '/registrations/', data=data)

def update_registration(user, reg_id, data):
    client = APIClient()
    return client.post(user, f'/registrations/{reg_id}/', data=data)
