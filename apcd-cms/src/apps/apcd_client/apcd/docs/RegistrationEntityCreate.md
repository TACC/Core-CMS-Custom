# RegistrationEntityCreate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**entity_name** | **str** |  | 
**fein** | **str** |  | [optional] 
**license_number** | **int** |  | [optional] 
**naic_company_code** | **int** |  | [optional] 
**total_covered_lives** | **int** |  | 
**claims_and_encounters_volume** | **int** |  | 
**total_claims_value** | **int** |  | 

## Example

```python
from apcd.models.registration_entity_create import RegistrationEntityCreate

# TODO update the JSON string below
json = "{}"
# create an instance of RegistrationEntityCreate from a JSON string
registration_entity_create_instance = RegistrationEntityCreate.from_json(json)
# print the JSON string representation of the object
print RegistrationEntityCreate.to_json()

# convert the object into a dict
registration_entity_create_dict = registration_entity_create_instance.to_dict()
# create an instance of RegistrationEntityCreate from a dict
registration_entity_create_form_dict = registration_entity_create.from_dict(registration_entity_create_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


