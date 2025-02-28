from django.http import HttpResponseRedirect, JsonResponse
from django.views import View
from apps.utils.apcd_groups import is_apcd_admin, has_apcd_group, has_groups
import logging

logger = logging.getLogger(__name__)


class BaseAPIView(View):
    """ Base class for all API views with automatic error handling """

    def dispatch(self, request, *args, **kwargs):
        try:
            return super().dispatch(request, *args, **kwargs)
        except Exception as e:
            logger.error(e, exc_info=True)
            return JsonResponse(
                {'message': "Something went wrong here..."},
                status=500)


class AuthenticatedUserTemplateMixin:
    """ API Mixin to restrict access to authenticated users only. """

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponseRedirect('/')
        return super().dispatch(request, *args, **kwargs)
    
class APCDAdminAccessTemplateMixin:
    """ API Mixin to restrict access to authenticated APCD admins only. """

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user):
            return HttpResponseRedirect('/')
        return super().dispatch(request, *args, **kwargs)


class APCDGroupAccessTemplateMixin:
    """ Template Mixin to restrict access to users with any APCD group. """

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not has_apcd_group(request.user):
            return HttpResponseRedirect('/')
        return super().dispatch(request, *args, **kwargs)


class APCDSubmitterAdminAccessTemplateMixin:
    """ Template Mixin to restrict access to users with Admin and Submitter Admin. """

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not has_groups(request.user, ['APCD_ADMIN', 'SUBMITTER_ADMIN']):
            return HttpResponseRedirect('/')
        return super().dispatch(request, *args, **kwargs)


class AuthenticatedUserAPIMixin:
    """ API Mixin to restrict access to authenticated users."""

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'Unauthorized'}, status=403)
        return super().dispatch(request, *args, **kwargs)

class APCDAdminAccessAPIMixin:
    """ API Mixin to restrict access to authenticated APCD admins only. """

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user):
            return JsonResponse({'error': 'Unauthorized'}, status=403)
        return super().dispatch(request, *args, **kwargs)


class APCDGroupAccessAPIMixin:
    """ API Mixin to restrict access to users with any APCD group. """

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not has_apcd_group(request.user):
            return JsonResponse({'error': 'Unauthorized'}, status=403)
        return super().dispatch(request, *args, **kwargs)


class APCDSubmitterAdminAccessAPIMixin:
    """ API Mixin to restrict access to users with Admin and Submitter Admin. """

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not has_groups(request.user, ['APCD_ADMIN', 'SUBMITTER_ADMIN']):
            return JsonResponse({'error': 'Unauthorized'}, status=403)
        return super().dispatch(request, *args, **kwargs)
