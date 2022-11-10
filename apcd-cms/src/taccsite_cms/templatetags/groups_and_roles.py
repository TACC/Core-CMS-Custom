from django import template
from urllib.parse import urlparse
from django.utils.html import format_html
from django.contrib import auth as auth

register = template.Library()

def has_apcd_group(user):
    for group in user.groups.all():
        if group.name in ['APCD_ADMIN', 'SUBMITTER_ADMIN', 'SUBMITTER_USER']:
            return True
    return False

def is_apcd_admin(user):
    return user.groups.filter(name='APCD_ADMIN').exists()

@register.simple_tag(takes_context=True)
def limit_visibility_in_menu(context, menu_item):
    request = context['request']
    user = request.user
    page_id = menu_item.attr['reverse_id']

    if (
        page_id == 'submissions' and has_apcd_group(user) or
        page_id == 'administration' and is_apcd_admin(user) or
        (not page_id == 'submissions' and not page_id == 'administration')
    ):
        return True
    else:
        return False
