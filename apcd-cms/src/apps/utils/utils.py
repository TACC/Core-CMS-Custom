import logging

logger = logging.getLogger(__name__)


def title_case(value):
    try:
        return value.title()
    except: 
        return value


def table_filter(filter, table_data, filtered_category):
    filtered_data = [row for row in table_data if row[filtered_category] == filter or filter in row[filtered_category]]

    return filtered_data
