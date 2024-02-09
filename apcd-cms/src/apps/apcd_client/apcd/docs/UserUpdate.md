# UserUpdate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**notes** | **str** |  | [optional] 
**user_id** | **str** |  | 
**user_email** | **str** |  | [optional] 
**user_name** | **str** |  | [optional] 
**org_name** | **str** |  | [optional] 
**role_id** | **int** |  | [optional] 
**active** | **bool** |  | [optional] 

## Example

```python
from apcd.models.user_update import UserUpdate

# TODO update the JSON string below
json = "{}"
# create an instance of UserUpdate from a JSON string
user_update_instance = UserUpdate.from_json(json)
# print the JSON string representation of the object
print UserUpdate.to_json()

# convert the object into a dict
user_update_dict = user_update_instance.to_dict()
# create an instance of UserUpdate from a dict
user_update_form_dict = user_update.from_dict(user_update_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


