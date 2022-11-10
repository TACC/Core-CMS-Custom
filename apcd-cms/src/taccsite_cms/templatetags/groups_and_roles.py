from django import template
from urllib.parse import urlparse
from django.utils.html import format_html
from django.contrib import auth as auth

register = template.Library()

@register.simple_tag(takes_context=True)
def has_apcd_group(context):
    request = context['request']
    user = request.user

    for group in user.groups.all():
        if group.name in ['APCD_ADMIN', 'SUBMITTER_ADMIN', 'SUBMITTER_USER']:
            return True

    return False

@register.simple_tag(takes_context=True)
def is_apcd_admin(context):
    request = context['request']
    user = request.user

    return user.groups.filter(name='APCD_ADMIN').exists()

