import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FormGroup, Label, FormFeedback } from 'reactstrap';
import { TextFormField } from './TextFormField';
import styles from './RegistrationForm.module.css';
import FieldWrapper from 'core-wrappers/FieldWrapperFormik/FieldWrapperFormik';

export const RegistrationContact: React.FC<{ index: number }> = ({ index }) => {
  return (
    <div>
      <h5 className={`${styles.boldedHeader} ${styles.spacedHeader}`}>
        CONTACT {index + 1}
      </h5>

      <TextFormField
        name={`contacts.${index}.contact_type`}
        label="Company Role"
        required={true}
      />

      <TextFormField
        name={`contacts.${index}.contact_name`}
        label="Name"
        required={true}
      />

      <TextFormField
        name={`contacts.${index}.contact_phone`}
        label="Phone"
        required={true}
      />
      <div className="help-text">
        <details>
          <summary>
            <a
              href="https://en.wikipedia.org/wiki/North_American_Numbering_Plan"
              target="_blank"
              rel="noreferrer"
            >
              {' '}
              North American Numbering Plan{' '}
            </a>
            e.g. <samp>123 456-7890</samp>…
          </summary>
          <ul>
            <li>
              <samp>123-456-7890</samp>
            </li>
            <li>
              <samp>(123) 456-7890</samp>
            </li>
            <li>
              <samp>123 456 7890</samp>
            </li>
            <li>
              <samp>123.456.7890</samp>
            </li>
            <li>
              <samp>+1 (123) 456-7890</samp>
            </li>
          </ul>
        </details>
      </div>

      <TextFormField
        name={`contacts.${index}.contact_email`}
        label="Email"
        required={true}
      />

      <FormGroup className="field-wrapper checkboxinput" noMargin={true}>
        <Label htmlFor={`contacts.${index}.contact_notifications`}>
          <Field
            type="checkbox"
            name={`contacts.${index}.contact_notifications`}
            id={`contacts.${index}.contact_notifications`}
          ></Field>
          Select to receive system notifications
        </Label>
        <ErrorMessage
          name={`contacts.${index}.contact_notifications`}
          component="div"
          className={styles.isInvalid}
        />
      </FormGroup>
    </div>
  );
};
