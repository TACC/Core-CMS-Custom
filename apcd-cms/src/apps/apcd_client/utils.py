import logging
import time
import apcd
from apcd.rest import ApiException
from django.conf import settings
from requests.exceptions import HTTPError

logger = logging.getLogger(__name__)


def get_apcd_token(username):
    configuration = apcd.Configuration(
        host=settings.TACC_APCD_API_HOST
    )
    with apcd.ApiClient(configuration) as api_client:
        api_instance = apcd.AuthenticateApi(api_client)
        try:
            # Get Access Token
            response_json = api_instance.get_access_token_auth_access_token_post(client=username, client_secret=settings.TACC_APCD_API_KEY)
            if 'access_token' not in response_json:
                logger.debug(response_json)
                raise HTTPError("Bad response from server", status=400)
            token_data = {
                'created': int(time.time()),
                'access_token': response_json["access_token"],
                'expires_in': response_json["expires_in"]
            }
            return token_data
        except ApiException as e:
            logger.error("Exception when requesting auth token for APCD api : %s\n" % e)
            raise e
