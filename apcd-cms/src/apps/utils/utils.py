import logging

logger = logging.getLogger(__name__)


def title_case(value):
    try:
        return value.title()
    except: 
        return value


def table_filter(filter, table_data, filtered_category):
    filtered_data = []
    formatted_filter = filter.lower()
    for row in table_data:
        if row[filtered_category] is None:
            continue
        formatted_value = row[filtered_category].lower()
        if formatted_value == formatted_filter or formatted_filter in formatted_value:
            filtered_data.append(row)

    return filtered_data
