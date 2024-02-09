# FileInboxCreate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**file_name** | **str** |  | 
**file_size_mb** | **float** |  | 
**file_count** | **int** |  | 
**file_type** | **str** |  | 
**file_owner** | **str** |  | 
**transaction_type** | **str** |  | 
**submitter_code** | **str** |  | 
**payor_code** | **int** |  | 
**data_period_start** | **int** |  | 
**data_period_end** | **int** |  | 
**routed_to** | **str** |  | 
**comment** | **str** |  | 
**file_pv** | **bool** |  | 
**file_mc** | **bool** |  | 
**file_pc** | **bool** |  | 
**file_dc** | **bool** |  | 
**file_me** | **bool** |  | 
**received_date** | **datetime** |  | 
**calendar_item_id** | **int** |  | [optional] 

## Example

```python
from apcd.models.file_inbox_create import FileInboxCreate

# TODO update the JSON string below
json = "{}"
# create an instance of FileInboxCreate from a JSON string
file_inbox_create_instance = FileInboxCreate.from_json(json)
# print the JSON string representation of the object
print FileInboxCreate.to_json()

# convert the object into a dict
file_inbox_create_dict = file_inbox_create_instance.to_dict()
# create an instance of FileInboxCreate from a dict
file_inbox_create_form_dict = file_inbox_create.from_dict(file_inbox_create_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


