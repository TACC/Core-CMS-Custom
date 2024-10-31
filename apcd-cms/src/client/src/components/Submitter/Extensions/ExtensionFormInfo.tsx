import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FormGroup, Label } from 'reactstrap';
import styles from './ExtensionsForm.module.css';
import { SubmitterEntityData, Entities } from 'hooks/entities';
import SectionMessage from 'core-components/SectionMessage';
import { Link } from 'react-router-dom';

const ExtensionFormInfo: React.FC<{
  index: number;
  submitterData: SubmitterEntityData | undefined;
}> = ({ index, submitterData }) => {
  return (
    <>
      <hr />
      <h4>Extension Information {index + 1}</h4>
      <p>This extension is on behalf of the following organization:</p>

      <FormGroup className="field-wrapper required">
        <Label htmlFor={`extensions.${index}.businessName`}>
          Business Name
        </Label>
        {submitterData && (
          <>
            <Field
              as="select"
              name={`extensions.${index}.businessName`}
              id={`extensions.${index}.businessName`}
            >
              <option value="">Select Business Name</option>
              {submitterData?.submitters?.map((submitter: Entities) => (
                <option
                  value={submitter.submitter_id}
                  key={submitter.submitter_id}
                >
                  {submitter.entity_name} - Payor Code: {submitter.payor_code}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name={`extensions.${index}.businessName`}
              component="div"
              className={styles.isInvalid}
            />
          </>
        )}
        {!submitterData && (
          <SectionMessage type="error">
            There was an error finding your associated businesses.{' '}
            <Link to="/workbench/dashboard/tickets/create" className="wb-link">
              Please submit a ticket.
            </Link>
          </SectionMessage>
        )}
      </FormGroup>

      <FormGroup className="field-wrapper required">
        <Label htmlFor={`extensions.${index}.extensionType`}>
          Extension Type
        </Label>
        <Field
          as="select"
          name={`extensions.${index}.extensionType`}
          id={`extensions.${index}.extensionType`}
        >
          <option value="">Select Extension Type</option>
          <option value="regular">Regularly Scheduled Submission</option>
          <option value="resubmission">Corrected Resubmission</option>
          <option value="small_carrier">
            Small Carrier (Fewer Than 10,000 Lives Covered)
          </option>
        </Field>
        <ErrorMessage
          name={`extensions.${index}.extensionType`}
          component="div"
          className={styles.isInvalid}
        />
      </FormGroup>

      <h6>Submission Dates</h6>
      <div className={styles.fieldRows}>
        <FormGroup className="field-wrapper required">
          <Label htmlFor={`extensions.${index}.applicableDataPeriod`}>
            Applicable Data Period <sup>1</sup>
          </Label>
          <Field
            as="select"
            name={`extensions.${index}.applicableDataPeriod`}
            id={`extensions.${index}.applicableDataPeriod`}
          >
            <option value="">-- Select period --</option>
            <option value="2024-01">January 2024</option>
            <option value="2024-02">February 2024</option>
          </Field>
          <div className="help-text">Enter month and year</div>
          <ErrorMessage
            name={`extensions.${index}.applicableDataPeriod`}
            component="div"
            className={styles.isInvalid}
          />
        </FormGroup>

        <FormGroup
          className={`position-relative field-wrapper required ${styles.dateInputContainer}`}
        >
          <Label htmlFor={`extensions.${index}.requestedTargetDate`}>
            Requested Target Date <sup>2</sup>
          </Label>
          <Field
            type="date"
            name={`extensions.${index}.requestedTargetDate`}
            id={`requestedTargetDate_${index}`}
            className={`${styles.dateInputField}`}
          />
          <ErrorMessage
            name={`extensions.${index}.requestedTargetDate`}
            component="div"
            className={styles.isInvalid}
          />
        </FormGroup>

        <FormGroup
          className={`position-relative field-wrapper required ${styles.dateInputContainer} `}
        >
          <Label htmlFor={`extensions.${index}.currentExpectedDate`}>
            Current Expected Date <sup>3</sup>
          </Label>
          <Field
            type="date"
            name={`extensions.${index}.currentExpectedDate`}
            id={`extensions.${index}.currentExpectedDate`}
          />
          <ErrorMessage
            name={`extensions.${index}.currentExpectedDate`}
            component="div"
            className={styles.isInvalid}
          />
        </FormGroup>
      </div>
    </>
  );
};

export default ExtensionFormInfo;
