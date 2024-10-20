import React from 'react';
import { Field, ErrorMessage, FieldArray } from 'formik';
import { FormGroup, Label, Row, Col, FormFeedback } from 'reactstrap';
import styles from './ExtensionsForm.module.css';

const ExtensionFormInfo: React.FC<{ index: number }> = ({ index }) => {
  return (
    <div>
      <h4>Extension Information {index + 1}</h4>
      <p>This extension is on behalf of the following organization:</p>

      <FormGroup>
        <Label htmlFor={`extensions.${index}.businessName`}>
          Business Name <span className={styles.requiredText}>(required)</span>
        </Label>
        <Field
          as="select"
          name={`extensions.${index}.businessName`}
          id={`extensions.${index}.businessName`}
          className="form-control"
        >
          <option value="">Select Business Name</option>
          <option value="Test Meritan Health">
            Test Meritan Health - Payor Code: 10000003
          </option>
        </Field>
        <ErrorMessage
          name={`extensions.${index}.businessName`}
          component={FormFeedback}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor={`extensions.${index}.extensionType`}>
          Extension Type <span className={styles.requiredText}>(required)</span>
        </Label>
        <Field
          as="select"
          name={`extensions.${index}.extensionType`}
          id={`extensions.${index}.extensionType`}
          className="form-control"
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
          component={FormFeedback}
        />
      </FormGroup>

      <h6>Submission Dates</h6>
      <Row>
        <Col md={4}>
          <FormGroup>
            <Label htmlFor={`extensions.${index}.applicableDataPeriod`}>
              Applicable Data Period <sup>1</sup>
              <span className={styles.requiredText}> (required)</span>
            </Label>
            <Field
              as="select"
              name={`extensions.${index}.applicableDataPeriod`}
              id={`extensions.${index}.applicableDataPeriod`}
              className="form-control"
            >
              <option value="">-- Select period --</option>
              <option value="2024-01">January 2024</option>
              <option value="2024-02">February 2024</option>
            </Field>
            <small className="form-text text-muted">Enter month and year</small>
            <ErrorMessage
              name={`extensions.${index}.applicableDataPeriod`}
              component={FormFeedback}
            />
          </FormGroup>
        </Col>

        <Col md={4}>
          <FormGroup
            className={`position-relative ${styles.dateInputContainer}`}
          >
            <Label htmlFor={`extensions.${index}.requestedTargetDate`}>
              Requested Target Date <sup>2</sup>
              <span className={styles.requiredText}> (required)</span>
            </Label>
            <Field
              type="date"
              name={`extensions.${index}.requestedTargetDate`}
              id={`requestedTargetDate_${index}`}
              className={`form-control ${styles.dateInputField}`}
            />
            <ErrorMessage
              name={`extensions.${index}.requestedTargetDate`}
              component={FormFeedback}
            />
          </FormGroup>
        </Col>

        <Col md={4}>
          <FormGroup
            className={`position-relative ${styles.dateInputContainer}`}
          >
            <Label htmlFor={`extensions.${index}.currentExpectedDate`}>
              Current Expected Date <sup>3</sup>
              <span className={styles.requiredText}> (required)</span>
            </Label>
            <Field
              type="date"
              name={`extensions.${index}.currentExpectedDate`}
              id={`extensions.${index}.currentExpectedDate`}
              className="form-control"
            />
            <ErrorMessage
              name={`extensions.${index}.currentExpectedDate`}
              component={FormFeedback}
            />
          </FormGroup>
        </Col>
      </Row>

      <hr />
    </div>
  );
};

export default ExtensionFormInfo;
