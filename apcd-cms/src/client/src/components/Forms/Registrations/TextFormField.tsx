import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
    FormGroup,
    FormText,
    Label,
    Input,
    Button,
    Badge,
    InputGroup,
    FormFeedback,
  } from "reactstrap";
  

export const TextFormField: React.FC<{name: string; label: string; helpText?: string; touched: any; errors: any;}> = ({name, label, helpText, touched, errors}) => {
    return (
        <FormGroup>
        <Label for={name}>{label}</Label>
        <InputGroup>
            <Field name={name}>
            {({ field }: { field: any }) => (
                <Input
                    type="text"
                    id={name}
                    className='textinput'
                    {...field}
                    invalid={touched[name] && !!errors[name]}
                />
            )}
            </Field>
            <ErrorMessage
                name={name}
                component={FormFeedback}
            />
        </InputGroup>
        { helpText ? 
            <FormText className='help-text'>
                {helpText}
            </FormText>
            : <></>
        }
        </FormGroup>
    )
};
