import React from 'react';
import { Label, Badge, LabelProps } from 'reactstrap';
import styles from './FormLabel.module.css';

interface FormLabelProps extends LabelProps {
  label: string;
  labelFor: string;
  isRequired?: boolean;
}

export const FormLabel: React.FC<FormLabelProps> = ({
  label,
  labelFor,
  isRequired = false,
  children,
  ...props
}) => {
  return (
    <Label for={labelFor} {...props}>
      {children}
      {label}
      {isRequired && (
        <Badge color="badge badge-danger" className={styles.requiredBadge}>
          Required
        </Badge>
      )}
    </Label>
  );
};
