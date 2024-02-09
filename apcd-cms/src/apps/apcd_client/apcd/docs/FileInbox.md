# FileInbox


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**file_name** | **str** |  | 
**file_size_mb** | **float** |  | 
**file_count** | **int** |  | 
**file_type** | **str** |  | 
**file_owner** | **str** |  | 
**transaction_type** | **str** |  | [optional] 
**submitter_code** | **str** |  | [optional] 
**payor_code** | **int** |  | 
**data_period_start** | **int** |  | [optional] 
**data_period_end** | **int** |  | [optional] 
**routed_to** | **str** |  | [optional] 
**comment** | **str** |  | [optional] 
**file_pv** | **bool** |  | [optional] 
**file_mc** | **bool** |  | [optional] 
**file_pc** | **bool** |  | [optional] 
**file_dc** | **bool** |  | [optional] 
**file_me** | **bool** |  | [optional] 
**received_date** | **datetime** |  | [optional] 
**calendar_item_id** | **int** |  | [optional] 
**received_id** | **int** |  | 
**duplicate_sequence** | **int** |  | [optional] 
**created_at** | **datetime** |  | [optional] 
**updated_at** | **datetime** |  | [optional] 

## Example

```python
from apcd.models.file_inbox import FileInbox

# TODO update the JSON string below
json = "{}"
# create an instance of FileInbox from a JSON string
file_inbox_instance = FileInbox.from_json(json)
# print the JSON string representation of the object
print FileInbox.to_json()

# convert the object into a dict
file_inbox_dict = file_inbox_instance.to_dict()
# create an instance of FileInbox from a dict
file_inbox_form_dict = file_inbox.from_dict(file_inbox_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


