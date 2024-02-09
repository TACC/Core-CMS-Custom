# SubmitterCalendarUpdate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data_period_start** | **str** |  | [optional] 
**data_period_end** | **str** |  | [optional] 
**expected_submission_date** | **date** |  | [optional] 
**submission_id** | **int** |  | [optional] 
**file_me** | **bool** |  | [optional] 
**file_pv** | **bool** |  | [optional] 
**file_mc** | **bool** |  | [optional] 
**file_pc** | **bool** |  | [optional] 
**file_dc** | **bool** |  | [optional] 
**granted_reprieve** | **bool** |  | [optional] 
**cancelled** | **bool** |  | [optional] 
**submitter_id** | **int** |  | [optional] 

## Example

```python
from apcd.models.submitter_calendar_update import SubmitterCalendarUpdate

# TODO update the JSON string below
json = "{}"
# create an instance of SubmitterCalendarUpdate from a JSON string
submitter_calendar_update_instance = SubmitterCalendarUpdate.from_json(json)
# print the JSON string representation of the object
print SubmitterCalendarUpdate.to_json()

# convert the object into a dict
submitter_calendar_update_dict = submitter_calendar_update_instance.to_dict()
# create an instance of SubmitterCalendarUpdate from a dict
submitter_calendar_update_form_dict = submitter_calendar_update.from_dict(submitter_calendar_update_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


