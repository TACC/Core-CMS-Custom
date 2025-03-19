import logging

logger = logging.getLogger(__name__)


def title_case(value):
    try:
        return value.title()
    except: 
        return value


def table_filter(filter, table_data, filtered_category, check_other_options=True, exact_match=False):
    filtered_data = []
    if not exact_match:
        formatted_filter = filter.lower()
    else:
        formatted_filter = filter  # Keep original case
    for row in table_data:
        if row[filtered_category] is None:
            continue
        formatted_value = row[filtered_category] if exact_match else row[filtered_category].lower()
        
        # If exact_match is True, only allow exact matches
        if formatted_value == formatted_filter or (not exact_match and formatted_filter in formatted_value and check_other_options and formatted_filter in formatted_value):
            filtered_data.append(row)

    return filtered_data
