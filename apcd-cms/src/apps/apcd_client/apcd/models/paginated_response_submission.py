# coding: utf-8

"""
    APCD API

    No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)

    The version of the OpenAPI document: 0.1.0
    Generated by OpenAPI Generator (https://openapi-generator.tech)

    Do not edit the class manually.
"""  # noqa: E501


from __future__ import annotations
import pprint
import re  # noqa: F401
import json


from typing import Any, ClassVar, Dict, List
from pydantic import BaseModel, StrictInt
from pydantic import Field
from apcd.models.submission import Submission
try:
    from typing import Self
except ImportError:
    from typing_extensions import Self

class PaginatedResponseSubmission(BaseModel):
    """
    PaginatedResponseSubmission
    """ # noqa: E501
    total_count: StrictInt = Field(description="Total number of records in the database matching criteria")
    current_count: StrictInt = Field(description="Number of items returned in the response")
    total_pages: StrictInt = Field(description="Total number of pages matching criteria")
    current_page: StrictInt = Field(description="Current page of data being sent")
    items: List[Submission] = Field(description="List of items returned in the response matching criteria")
    __properties: ClassVar[List[str]] = ["total_count", "current_count", "total_pages", "current_page", "items"]

    model_config = {
        "populate_by_name": True,
        "validate_assignment": True,
        "protected_namespaces": (),
    }


    def to_str(self) -> str:
        """Returns the string representation of the model using alias"""
        return pprint.pformat(self.model_dump(by_alias=True))

    def to_json(self) -> str:
        """Returns the JSON representation of the model using alias"""
        # TODO: pydantic v2: use .model_dump_json(by_alias=True, exclude_unset=True) instead
        return json.dumps(self.to_dict())

    @classmethod
    def from_json(cls, json_str: str) -> Self:
        """Create an instance of PaginatedResponseSubmission from a JSON string"""
        return cls.from_dict(json.loads(json_str))

    def to_dict(self) -> Dict[str, Any]:
        """Return the dictionary representation of the model using alias.

        This has the following differences from calling pydantic's
        `self.model_dump(by_alias=True)`:

        * `None` is only added to the output dict for nullable fields that
          were set at model initialization. Other fields with value `None`
          are ignored.
        """
        _dict = self.model_dump(
            by_alias=True,
            exclude={
            },
            exclude_none=True,
        )
        # override the default output from pydantic by calling `to_dict()` of each item in items (list)
        _items = []
        if self.items:
            for _item in self.items:
                if _item:
                    _items.append(_item.to_dict())
            _dict['items'] = _items
        return _dict

    @classmethod
    def from_dict(cls, obj: Dict) -> Self:
        """Create an instance of PaginatedResponseSubmission from a dict"""
        if obj is None:
            return None

        if not isinstance(obj, dict):
            return cls.model_validate(obj)

        _obj = cls.model_validate({
            "total_count": obj.get("total_count"),
            "current_count": obj.get("current_count"),
            "total_pages": obj.get("total_pages"),
            "current_page": obj.get("current_page"),
            "items": [Submission.from_dict(_item) for _item in obj.get("items")] if obj.get("items") is not None else None
        })
        return _obj


