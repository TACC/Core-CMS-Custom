import logging

logger = logging.getLogger(__name__)


def title_case(value):
    try:
        return value.title()
    except: 
        return value


def table_filter(filter, table_data, filtered_category, check_other_options=True):
    filtered_data = []
    formatted_filter = filter.lower()
    for row in table_data:
        if row[filtered_category] is None:
            continue
        formatted_value = row[filtered_category].lower()
        if formatted_value == formatted_filter or (formatted_filter in formatted_value and check_other_options): # not all filters need this behavior, thus check_other_filters
            filtered_data.append(row)

    return filtered_data
