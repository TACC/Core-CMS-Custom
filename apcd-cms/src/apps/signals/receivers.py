import logging
from django.dispatch import receiver
from django.contrib.auth.signals import user_logged_in
from apps.apcd_client.utils import get_apcd_token, APCDToken

logger = logging.getLogger(__name__)


@receiver(user_logged_in, dispatch_uid=__name__)
def apcd_login_token_handler(sender, request, user, **kwargs):
    logger.debug("User logged in. Creating APCD token")

    token_data = get_apcd_token(user.username)

    APCDToken.objects.update_or_create(user=user, defaults={**token_data})
