from django.core.paginator import Paginator, EmptyPage
from apps.components.paginator.api_pagination import APIPagination
import logging

logger = logging.getLogger(__name__)


def paginator(request, api_content, entries_per_page=50):
    try:
        page_num = int(request.GET.get('page'))
    except:
        page_num = 1

    """
     First entry: Content for page
     2nd Entry: Count of items per page
     3rd entry: Total records matching criteria
    """
    p = APIPagination(api_content['items'], entries_per_page, api_content['total_count'])


    try:
        page = p.page(page_num)
    except EmptyPage:
        page = p.page(1)

    # print(f"Page info is: {page.object_list}")

    elided_pages = []
    on_ends = 1
    current_page_buffer = 2
    if page.paginator.num_pages <= (current_page_buffer + on_ends) * 2:
        return {'page': page, 'elided_pages': page.paginator.page_range}

    if page_num > (1 + current_page_buffer + on_ends) + 1:
        elided_pages.extend(range(1, on_ends + 1))
        elided_pages.append('...')
        elided_pages.extend(range(page_num - current_page_buffer, page_num + 1))
    else:
        elided_pages.extend(range(1, page_num + 1))

    if page_num < (page.paginator.num_pages - current_page_buffer - on_ends) - 1:
        elided_pages.extend(range(page_num + 1, page_num + current_page_buffer + 1))
        elided_pages.append('...')
        elided_pages.extend(range(page.paginator.num_pages - on_ends + 1, page.paginator.num_pages + 1))
    else:
        elided_pages.extend(range(page_num + 1, page.paginator.num_pages + 1))

    return {'page': page, 'elided_pages': elided_pages}
