# SubmitterCalendar


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data_period_start** | **str** |  | 
**data_period_end** | **str** |  | 
**expected_submission_date** | **date** |  | [optional] 
**submission_id** | **int** |  | [optional] 
**file_me** | **bool** |  | 
**file_pv** | **bool** |  | 
**file_mc** | **bool** |  | 
**file_pc** | **bool** |  | 
**file_dc** | **bool** |  | 
**granted_reprieve** | **bool** |  | 
**cancelled** | **bool** |  | 
**calendar_item_id** | **int** |  | 
**created_at** | **datetime** |  | [optional] 
**updated_at** | **datetime** |  | [optional] 
**submitter_id** | **int** |  | 

## Example

```python
from apcd.models.submitter_calendar import SubmitterCalendar

# TODO update the JSON string below
json = "{}"
# create an instance of SubmitterCalendar from a JSON string
submitter_calendar_instance = SubmitterCalendar.from_json(json)
# print the JSON string representation of the object
print SubmitterCalendar.to_json()

# convert the object into a dict
submitter_calendar_dict = submitter_calendar_instance.to_dict()
# create an instance of SubmitterCalendar from a dict
submitter_calendar_form_dict = submitter_calendar.from_dict(submitter_calendar_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


