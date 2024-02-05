# SubmittersWithChildren


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**org_name** | **str** |  | [optional] 
**submitter_code** | **str** |  | [optional] 
**payor_code** | **int** |  | [optional] 
**file_me** | **bool** |  | [optional] 
**file_pv** | **bool** |  | [optional] 
**file_mc** | **bool** |  | [optional] 
**file_pc** | **bool** |  | [optional] 
**file_dc** | **bool** |  | [optional] 
**submission_method** | **str** |  | [optional] 
**fein** | **str** |  | [optional] 
**license_number** | **int** |  | [optional] 
**naic_company_code** | **int** |  | [optional] 
**fingerprint** | **str** |  | [optional] 
**development** | **bool** |  | [optional] 
**submitter_id** | **int** |  | 
**apcd_id** | **int** |  | 
**registration_id** | **int** |  | 
**encryption_key** | **str** |  | [optional] 
**submitting_for_self** | **bool** |  | [optional] 
**status** | **str** |  | [optional] 
**test_submissions_only** | **bool** |  | [optional] 
**compliant** | **bool** |  | [optional] 
**last_updated_timestamp** | **datetime** |  | [optional] 
**created_at** | **datetime** |  | [optional] 
**updated_at** | **datetime** |  | [optional] 
**notes** | **str** |  | [optional] 
**users** | [**List[SubmitterUsersWithChildren]**](SubmitterUsersWithChildren.md) |  | [optional] [default to []]

## Example

```python
from apcd.models.submitters_with_children import SubmittersWithChildren

# TODO update the JSON string below
json = "{}"
# create an instance of SubmittersWithChildren from a JSON string
submitters_with_children_instance = SubmittersWithChildren.from_json(json)
# print the JSON string representation of the object
print SubmittersWithChildren.to_json()

# convert the object into a dict
submitters_with_children_dict = submitters_with_children_instance.to_dict()
# create an instance of SubmittersWithChildren from a dict
submitters_with_children_form_dict = submitters_with_children.from_dict(submitters_with_children_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


