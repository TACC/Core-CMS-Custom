
from apps.components.paginator.paginator import paginator
from apps.utils.registrations_data_formatting import (
    _set_registration_for_listing,
)
from apps.utils.utils import table_filter
from datetime import date as datetimeDate


def get_registration_list_json(registrations_content, status_filter, org_filter, page_num, *args, **kwargs):
    context = {}

    context['header'] = ['Business Name', 'Year', 'Type', 'Location', 'Registration Status', 'Actions']
    context['status_options'] = ['All', 'Received', 'Processing', 'Complete', 'Withdrawn']
    context['org_options'] = ['All']

    def getDate(row):
        date = row[1]
        return date if date is not None else datetimeDate(1, 1, 1)  # put 'None' date entries all together at end of listing w/ date 1-1-0001

    registrations_content = sorted(registrations_content, key=lambda row: getDate(row), reverse=True)  # sort registrations by newest to oldest

    registration_table_entries = []
    for registration in registrations_content:
        registration_table_entries.append(_set_registration_for_listing(registration))
        org_name = registration[5]
        if org_name not in context['org_options']:
            context['org_options'].append(org_name)

    queryStr = ''

    context['selected_status'] = None
    if status_filter is not None and status_filter != 'All':
        context['selected_status'] = status_filter
        queryStr += f'&status={status_filter}'
        registration_table_entries = table_filter(status_filter, registration_table_entries, 'reg_status')

    context['selected_org'] = None
    if org_filter is not None and org_filter != 'All':
        context['selected_org'] = org_filter
        queryStr += f'&org={org_filter}'
        registration_table_entries = table_filter(org_filter.replace("(", "").replace(")", ""), registration_table_entries, 'biz_name', exact_match=True)

    context['query_str'] = queryStr
    page_info = paginator(page_num, registration_table_entries)
    context['page'] = [
        {
            'biz_name': obj['biz_name'],
            'year': obj['year'],
            'type': obj['type'],
            'location': obj['location'],
            'reg_status': obj['reg_status'],
            'reg_id': obj['reg_id'],
        }
        for obj in page_info['page']
    ]
    context['page_num'] = page_num
    context['total_pages'] = page_info['page'].paginator.num_pages
    context['pagination_url_namespaces'] = 'administration:admin_regis_table'
    return context

