from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.conf import settings
from django.contrib import auth
from django.template import loader
from django.views.generic import View
from .apcd_database import create_submission
import logging

logger = logging.getLogger(__name__)

class SubmissionFormView(View):
    def get(self, request):
        print('GETGETGETGETGETGETGETGETGETGETGETGETGETGETGETGETGETGETGET')
        # template = loader.get_template('submission_form/submission_form.html')
        template = loader.get_template('submission_form/submission_form.test.html')
        return HttpResponse(template.render({}, request))
    
    def post(self, request):
        form = request.POST.copy()
        print('POSTPOSTPOSTPOSTPOSTPOSTPOSTPOSTPOSTPOSTPOSTPOSTPOSTPOST')
        print(form)
        print(type(form))

        for key, value in form.items():
            print(key)


        # Parse form for submission
        # Submit form to APCD database
        # Redirect and return success

        # response = HttpResponseRedirect('/apcd/')
        template = loader.get_template('submission_form/submission_success.html')
        return HttpResponse(template.render({}, request))






# def set_apcd_user_role(user):
#     #query APCD database...
#     #bookmark:
#     # docker CP'd this file into the running cms containers for CORE see if we can possibly put this login
#     # redirect on APCD custom? We also need the database before we can continue... _LOGIN_REDIRECT_URL = '/remote/apcd/login/'
#     print('Checking APCD database for user: {}'.format(user))
#     user_role = apcd_db_user_role(user)
#     # user = User.objects.get(username=user)
#     # group = Group.objects.get(name=group_name[apcd_user.role])
#     # group.user_set.add(user)

# def verify_and_auth_apcd(request):
#     logger.critical("APCD Authenticating... test test test test test test test test test test test ")
#     user = auth.authenticate(request)
#     if user:
#         # User is valid.  Set request.user and persist user in the session by logging the user in.
#         request.user = user
#         # Get User role from APCD Database
#         logger.info(f'REDIRECTED TO APCD PORTAL AUTH {request.user}')

#         auth.login(request, user)
#         response = HttpResponseRedirect(request.GET.get('next', \
#                                                         getattr(settings, 'LOGIN_REDIRECT_URL', '/workbench/dashboard/')))
#     else:
#         response = HttpResponseRedirect('/')
#     return response

