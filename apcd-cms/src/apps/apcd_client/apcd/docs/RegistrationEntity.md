# RegistrationEntity


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**entity_name** | **str** |  | [optional] 
**fein** | **str** |  | [optional] 
**license_number** | **int** |  | [optional] 
**naic_company_code** | **int** |  | [optional] 
**total_covered_lives** | **int** |  | [optional] 
**claims_and_encounters_volume** | **int** |  | [optional] 
**total_claims_value** | **int** |  | [optional] 
**registration_entity_id** | **int** |  | 
**registration_id** | **int** |  | 

## Example

```python
from apcd.models.registration_entity import RegistrationEntity

# TODO update the JSON string below
json = "{}"
# create an instance of RegistrationEntity from a JSON string
registration_entity_instance = RegistrationEntity.from_json(json)
# print the JSON string representation of the object
print RegistrationEntity.to_json()

# convert the object into a dict
registration_entity_dict = registration_entity_instance.to_dict()
# create an instance of RegistrationEntity from a dict
registration_entity_form_dict = registration_entity.from_dict(registration_entity_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


