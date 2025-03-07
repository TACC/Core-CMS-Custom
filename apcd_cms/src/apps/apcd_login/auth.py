from apps.utils import apcd_database
from django.conf import settings
from django.contrib import auth
from django.http import HttpResponseRedirect
import logging

logger = logging.getLogger(__name__)

UserModel = auth.get_user_model()
Group = auth.models.Group

def auth_and_set_apcd_role(request):
    """ Auth User and Set APCD Role
    This remote login endpoint is used to create and update django user roles
    with the roles defined in the APCD database. These roles regulate access to
    certain views in the CMS and portal. The only reason this is here is because
    we need the apcd database util available in the cms custom app.
    """
    user = auth.authenticate(request)
    if user:
        # User is valid.  Set request.user and persist user in the session by logging the user in.
        request.user = user
        auth.login(request, user)

        # Check if user has an APCD role and add/update to CMS group
        apcd_role = apcd_database.get_user_role(user.username)
        if apcd_role:
            user_model = UserModel.objects.get(username=user.username)
            apcd_admin = Group.objects.get(name='APCD_ADMIN')
            apcd_submitter_admin = Group.objects.get(name='SUBMITTER_ADMIN')
            apcd_submitter_user = Group.objects.get(name='SUBMITTER_USER')
            current_group_role = Group.objects.get(name=apcd_role)

            # remove any existing apcd role from user and update their current role
            user_model.groups.remove(apcd_admin, apcd_submitter_admin, apcd_submitter_user)
            user_model.groups.add(current_group_role)
        else:
            logger.info('No APCD role found for user: {}'.format(user.username))

        response = HttpResponseRedirect(request.GET.get('next', \
                   getattr(settings, 'LOGIN_REDIRECT_URL', '/workbench/dashboard/')))
    else:
        response = HttpResponseRedirect('/')
    return response
