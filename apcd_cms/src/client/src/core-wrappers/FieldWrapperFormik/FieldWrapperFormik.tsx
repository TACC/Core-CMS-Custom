import React from 'react';
import { ErrorMessage } from 'formik';
import { Badge, FormGroup } from 'reactstrap';

import './FieldWrapperFormik.global.css';

export type FieldWrapperProps = {
  name: string;
  label: React.ReactNode;
  required?: boolean;
  className?: string;
  description?: React.ReactNode;
};
const FieldWrapper: React.FC<React.PropsWithChildren<FieldWrapperProps>> = ({
  name,
  label,
  required,
  description,
  className,
  children,
}) => {
  return (
    <FormGroup
      className={`field-wrapper ${required ? 'required' : ''} ${className}`}
    >
      <label htmlFor={name}>
        {label}
        {required && <Badge color="danger">Required</Badge>}
      </label>
      {children}
      <ErrorMessage name={name} component="div" className="isInvalid" />
      {description && <div className="help-text">{description}</div>}
    </FormGroup>
  );
};

export default FieldWrapper;
