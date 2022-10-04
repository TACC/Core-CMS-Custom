import logging

from djangocms_forms.models import FormSubmission
from django.db.models.signals import post_save
from django.dispatch import receiver

logger = logging.getLogger(__name__)

@receiver(post_save, sender=FormSubmission)
def log_data(sender, instance, created, **kwargs):
    print('Running FormIntercepterConfig "receiver()"')
    logger.info('Received "post_save" signal from djangocms_forms.FormSubmission:', sender)

    if created:
        logger.info('Submission success, kwargs:', kwargs)
    else:
        logger.info('Submission failed, kwargs:', kwargs)
