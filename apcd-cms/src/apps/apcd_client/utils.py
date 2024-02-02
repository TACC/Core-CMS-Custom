import logging
import time
import requests
from django.conf import settings
from requests.exceptions import HTTPError

logger = logging.getLogger(__name__)


def get_apcd_token(username):
    url = f"{settings.TACC_APCD_API_HOST}/auth/access-token"
    key = settings.TACC_APCD_API_KEY

    response = requests.post(url, data={"client_id": username, "client_secret": key})
    response_json = response.json()

    if response.status_code != 200 and 'detail' in response_json:
        match response_json['detail']:
            case "Incorrect username":
                raise HTTPError('User is not present in database', status=401)
            case "Incorrect username or password":
                raise HTTPError('Bad client_secret', status=401)
            case _:
                raise HTTPError(response_json['detail'], status=response.status_code)
    elif response.status_code != 200:
        raise HTTPError(response_json, status=response.status_code)
    elif 'access_token' not in response_json:
        logger.debug(response_json)
        raise HTTPError("Bad response from server", status=400)

    token_data = {
        'created': int(time.time()),
        'access_token': response_json['access_token'],
        'expires_in': response_json['expires_in']
    }

    return token_data
