import logging

logger = logging.getLogger(__name__)

def table_filter(filter, table_data, filtered_category):
    filtered_data = [row for row in table_data if row[filtered_category] == filter]

    return filtered_data
