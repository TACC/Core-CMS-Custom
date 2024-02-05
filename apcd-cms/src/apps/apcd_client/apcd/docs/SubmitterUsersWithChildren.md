# SubmitterUsersWithChildren


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**user_id** | **str** |  | 
**submitter_id** | **int** |  | 
**user_number** | **int** |  | 
**user** | [**User**](User.md) |  | 

## Example

```python
from apcd.models.submitter_users_with_children import SubmitterUsersWithChildren

# TODO update the JSON string below
json = "{}"
# create an instance of SubmitterUsersWithChildren from a JSON string
submitter_users_with_children_instance = SubmitterUsersWithChildren.from_json(json)
# print the JSON string representation of the object
print SubmitterUsersWithChildren.to_json()

# convert the object into a dict
submitter_users_with_children_dict = submitter_users_with_children_instance.to_dict()
# create an instance of SubmitterUsersWithChildren from a dict
submitter_users_with_children_form_dict = submitter_users_with_children.from_dict(submitter_users_with_children_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


