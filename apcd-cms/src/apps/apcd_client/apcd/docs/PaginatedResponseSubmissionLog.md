# PaginatedResponseSubmissionLog


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**total_count** | **int** | Total number of records in the database matching criteria | 
**current_count** | **int** | Number of items returned in the response | 
**total_pages** | **int** | Total number of pages matching criteria | 
**current_page** | **int** | Current page of data being sent | 
**items** | [**List[SubmissionLog]**](SubmissionLog.md) | List of items returned in the response matching criteria | 

## Example

```python
from apcd.models.paginated_response_submission_log import PaginatedResponseSubmissionLog

# TODO update the JSON string below
json = "{}"
# create an instance of PaginatedResponseSubmissionLog from a JSON string
paginated_response_submission_log_instance = PaginatedResponseSubmissionLog.from_json(json)
# print the JSON string representation of the object
print PaginatedResponseSubmissionLog.to_json()

# convert the object into a dict
paginated_response_submission_log_dict = paginated_response_submission_log_instance.to_dict()
# create an instance of PaginatedResponseSubmissionLog from a dict
paginated_response_submission_log_form_dict = paginated_response_submission_log.from_dict(paginated_response_submission_log_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


