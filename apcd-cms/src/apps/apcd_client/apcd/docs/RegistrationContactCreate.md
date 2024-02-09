# RegistrationContactCreate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**notify_flag** | **bool** |  | 
**contact_type** | **str** |  | 
**contact_name** | **str** |  | 
**contact_phone** | **str** |  | 
**contact_email** | **str** |  | 

## Example

```python
from apcd.models.registration_contact_create import RegistrationContactCreate

# TODO update the JSON string below
json = "{}"
# create an instance of RegistrationContactCreate from a JSON string
registration_contact_create_instance = RegistrationContactCreate.from_json(json)
# print the JSON string representation of the object
print RegistrationContactCreate.to_json()

# convert the object into a dict
registration_contact_create_dict = registration_contact_create_instance.to_dict()
# create an instance of RegistrationContactCreate from a dict
registration_contact_create_form_dict = registration_contact_create.from_dict(registration_contact_create_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


