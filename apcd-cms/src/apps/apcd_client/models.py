"""Auth models
"""
import logging
import time
from django.db import models
from django.conf import settings
from django.db import transaction
from .utils import get_apcd_token

logger = logging.getLogger(__name__)


TOKEN_EXPIRY_THRESHOLD = 600


class APCDToken(models.Model):
    """Represents an APCD OAuth Token object.

    Use this class to store login details as well as refresh a token.
    """
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='apcd_token', on_delete=models.CASCADE)
    access_token = models.CharField(max_length=2048)
    expires_in = models.BigIntegerField()
    created = models.BigIntegerField()

    @property
    def expired(self):
        """Check if token is expired

        :return: True or False, depending if the token is expired.
        :rtype: bool
        """
        return self.is_token_expired(self.created, self.expires_in)

    @property
    def created_at(self):
        """Save created time to model property

        :return: The Epoch timestamp this token was created
        :rtype: int
        """
        return self.created_at

    @created_at.setter
    def created_at(self, value):
        """Save created time to model property

        :param int value: The Epoch timestamp this token was created
        """
        self.created = value

    @property
    def token(self):
        """Token dictionary.

        :return: Full token object
        :rtype: dict
        """
        return {
            'access_token': self.access_token,
            'created': self.created,
            'expires_in': self.expires_in
        }

    def get_token(self):
        """Limit one request to APCD /auth/access-token per User.
        :return: APCD access_token.
        :rtype: :string
        """
        if self.expired:
            logger.info('APCD token expired')
            with transaction.atomic():
                # Get a lock on this user's token row in db.
                current_token = APCDToken.objects.select_for_update().filter(user=self.user).first()
                if self.is_token_expired(current_token.created, current_token.expires_in):
                    try:
                        logger.info('Refreshing APCD token')
                        self.refresh_tokens()
                    except Exception:
                        logger.exception('APCD Token refresh failed')
                        raise

                else:
                    logger.info('Token updated by another request. Refreshing token from DB.')
                    # Token is no longer expired, refresh latest token info from DB
                    self.refresh_from_db()

        return self.access_token

    def update(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)
        self.save()

    def refresh_tokens(self):
        token_data = get_apcd_token(self.user)
        self.update(**token_data)

    def __str__(self):
        access_token_masked = self.access_token[-5:]
        return f'access_token:{access_token_masked} expires_in:{self.expires_in} created:{self.created}'

    @staticmethod
    def is_token_expired(created, expires_in):
        current_time = time.time()
        return created + expires_in - current_time - TOKEN_EXPIRY_THRESHOLD <= 0
