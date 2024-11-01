import React from 'react';
import { Field, ErrorMessage } from "formik";
import {
    FormGroup,
    Label,
    FormFeedback,
  } from "reactstrap";
import styles from './RegistrationForm.module.css';
  
/* Component to re-use for text input fields */
export const TextFormField: React.FC<{name: string; label: any; helpText?: any; required?: boolean}> = ({name, label, helpText, required}) => {
    return (
        <FormGroup 
            className={`field-wrapper textinput ${ required ? 'required': '' }`}
            noMargin={true}
        >
            <Label htmlFor={name}>
                {label}
                {required ? <span className={styles.isRequired}> (required)</span> : <></>}
            </Label>
            <Field name={name} as="input" id={name} className="textinput"/>
            <ErrorMessage
                name={name}
                component="div"
                className={styles.isInvalid}
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
