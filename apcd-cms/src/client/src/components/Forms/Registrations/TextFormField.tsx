import React from 'react';
import { Field, ErrorMessage } from "formik";
import {
    FormGroup,
    Label,
    FormFeedback,
  } from "reactstrap";
  
/* Component to re-use for text input fields */
export const TextFormField: React.FC<{name: string; label: any; helpText?: any; required?: boolean}> = ({name, label, helpText, required}) => {
    return (
        <FormGroup className={`field-wrapper textinput ${ required ? 'required': '' }`}>
            <Label htmlFor={name}>{label}</Label>
            <Field name={name} as="input" id={name} className="textinput"/>
            <ErrorMessage
                name={name}
                component={FormFeedback}
            />
            { helpText ? 
                <div className='help-text'>
                    {helpText}
                </div>
                : <></>
            }
        </FormGroup>
    )
};
