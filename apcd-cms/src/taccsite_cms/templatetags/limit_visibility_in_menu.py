from django import template
from django.contrib import auth as auth
from apps.utils.apcd_groups import has_apcd_group, is_apcd_admin

register = template.Library()

@register.simple_tag(takes_context=True)
def limit_visibility_in_menu(context, menu_item):
    """
    Custom Template Tag `limit_visibility_in_menu`

    Use: Return (boolean) whether given menu item is visible by current user.

    Load custom tag into template:
        {% load limit_visibility_in_menu %}

    Template inline usage:
        {# (renders `True` or `False`) #}
        {% limit_visibility_in_menu menu_item %}

        {# (renders "A" or "B") #}
        {% limit_visibility_in_menu menu_item as can_view %}
        {% if can_view %} A {% else %} B {% endif %}

    Example:
        ../templates/cms_menu.html
    """
    request = context['request']
    user = request.user
    has_page_id = ('reverse_id' in menu_item.attr)
    page_id = menu_item.attr['reverse_id'] if has_page_id else ''

    if (
        user.is_superuser or
        page_id == 'submissions' and has_apcd_group(user) or
        page_id == 'administration' and is_apcd_admin(user) or
        (not page_id == 'submissions' and not page_id == 'administration')
    ):
        return True
    else:
        return False
