import logging

from djangocms_forms.models import FormSubmission
from django.db.models.signals import post_save
from django.dispatch import receiver

logger = logging.getLogger(__name__)

@receiver(post_save, sender=FormSubmission)
def log_data(sender, instance, created, **kwargs):
    print('Received "post_save" signal from djangocms_forms.FormSubmission:', sender)

    if created:
        print('Submission success, kwargs:', kwargs)
    else:
        print('Submission failed, kwargs:', kwargs)
