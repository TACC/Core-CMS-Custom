# PaginatedResponseUser


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**total_count** | **int** | Total number of records in the database matching criteria | 
**current_count** | **int** | Number of items returned in the response | 
**total_pages** | **int** | Total number of pages matching criteria | 
**current_page** | **int** | Current page of data being sent | 
**items** | [**List[User]**](User.md) | List of items returned in the response matching criteria | 

## Example

```python
from apcd.models.paginated_response_user import PaginatedResponseUser

# TODO update the JSON string below
json = "{}"
# create an instance of PaginatedResponseUser from a JSON string
paginated_response_user_instance = PaginatedResponseUser.from_json(json)
# print the JSON string representation of the object
print PaginatedResponseUser.to_json()

# convert the object into a dict
paginated_response_user_dict = paginated_response_user_instance.to_dict()
# create an instance of PaginatedResponseUser from a dict
paginated_response_user_form_dict = paginated_response_user.from_dict(paginated_response_user_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


