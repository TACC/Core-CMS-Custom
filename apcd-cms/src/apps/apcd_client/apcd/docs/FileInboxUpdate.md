# FileInboxUpdate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**file_name** | **str** |  | 
**file_size_mb** | **float** |  | [optional] 
**file_count** | **int** |  | [optional] 
**file_type** | **str** |  | [optional] 
**file_owner** | **str** |  | [optional] 
**transaction_type** | **str** |  | [optional] 
**submitter_code** | **str** |  | 
**payor_code** | **int** |  | 
**data_period_start** | **int** |  | [optional] 
**data_period_end** | **int** |  | [optional] 
**routed_to** | **str** |  | [optional] 
**comment** | **str** |  | [optional] 
**file_pv** | **bool** |  | 
**file_mc** | **bool** |  | 
**file_pc** | **bool** |  | 
**file_dc** | **bool** |  | 
**file_me** | **bool** |  | 
**received_date** | **datetime** |  | 
**calendar_item_id** | **int** |  | [optional] 

## Example

```python
from apcd.models.file_inbox_update import FileInboxUpdate

# TODO update the JSON string below
json = "{}"
# create an instance of FileInboxUpdate from a JSON string
file_inbox_update_instance = FileInboxUpdate.from_json(json)
# print the JSON string representation of the object
print FileInboxUpdate.to_json()

# convert the object into a dict
file_inbox_update_dict = file_inbox_update_instance.to_dict()
# create an instance of FileInboxUpdate from a dict
file_inbox_update_form_dict = file_inbox_update.from_dict(file_inbox_update_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


