from django.core.paginator import Paginator, EmptyPage
import logging

logger = logging.getLogger(__name__)


def paginator(page_num, table_rows, entries_per_page=50):
    p = Paginator(table_rows, entries_per_page)

    try:
        page = p.page(page_num)
    except EmptyPage:
        page = p.page(1)

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
