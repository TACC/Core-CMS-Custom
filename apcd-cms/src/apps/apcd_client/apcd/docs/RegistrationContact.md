# RegistrationContact


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**notify_flag** | **bool** |  | [optional] 
**contact_type** | **str** |  | [optional] 
**contact_name** | **str** |  | [optional] 
**contact_phone** | **str** |  | [optional] 
**contact_email** | **str** |  | [optional] 
**registration_contact_id** | **int** |  | 
**registration_id** | **int** |  | 

## Example

```python
from apcd.models.registration_contact import RegistrationContact

# TODO update the JSON string below
json = "{}"
# create an instance of RegistrationContact from a JSON string
registration_contact_instance = RegistrationContact.from_json(json)
# print the JSON string representation of the object
print RegistrationContact.to_json()

# convert the object into a dict
registration_contact_dict = registration_contact_instance.to_dict()
# create an instance of RegistrationContact from a dict
registration_contact_form_dict = registration_contact.from_dict(registration_contact_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


