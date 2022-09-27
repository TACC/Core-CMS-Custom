import logging

from djangocms_forms.models import FormSubmission
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=FormSubmission)
def log_data(sender, instance, created, **kwargs):
    print('Running FormIntercepterConfig "receiver()"')
    logging.info('Received "post_save" signal from djangocms_forms.FormSubmission:', sender)

    if created:
        logging.info('Submission success, kwargs:', kwargs)
    else:
        logging.info('Submission failed, kwargs:', kwargs)
