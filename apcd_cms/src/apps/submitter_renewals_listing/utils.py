from apps.utils.apcd_database import (
    get_submitter_info,
)
from django.http import JsonResponse


def get_submitter_codes(user):
    submitter = get_submitter_info(str(user))
    submitter_codes = []
    for i in submitter:
        submitter_codes.append(i[1])
    return JsonResponse({'submitter_codes': submitter_codes} if submitter_codes else [], safe=False)