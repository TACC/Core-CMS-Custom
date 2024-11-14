import React from 'react';
import { Field, ErrorMessage } from 'formik';
import FieldWrapper from 'core-wrappers/FieldWrapperFormik';

/* Component to re-use for text input fields */
export const TextFormField: React.FC<{
  name: string;
  label: any;
  helpText?: any;
  required?: boolean;
}> = ({ name, label, helpText, required = false }) => {
  return (
    <FieldWrapper
      name={name}
      label={label}
      required={required}
      className="textinput"
      description={helpText}
    >
      <Field name={name} as="input" id={name} className="textinput" />
    </FieldWrapper>
  );
};
