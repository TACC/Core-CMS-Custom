import React, { useState, useEffect } from 'react';
import { useFormikContext, Field, ErrorMessage } from 'formik';
import { FormGroup } from 'reactstrap';
import styles from './ExtensionsForm.module.css';
import {
  SubmitterEntityData,
  Entities,
  ApplicableDataPeriod,
} from 'hooks/entities';
import SectionMessage from 'core-components/SectionMessage';
import { Link } from 'react-router-dom';
import { FormLabel } from 'apcd-components/Components/FormLabel/FormLabel';

const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() + 1);
const oneYearFromToday = maxDate.toISOString().split('T')[0];

const ExtensionFormInfo: React.FC<{
  index: number;
  submitterData: SubmitterEntityData | undefined;
}> = ({ index, submitterData }) => {
  const [selectedEntity, setSelectedEntity] = useState<string>();
  const [dataPeriods, setDataPeriods] = useState<ApplicableDataPeriod[]>([]);
  const { setFieldValue, values } = useFormikContext<any>();

  useEffect(() => {
    if (selectedEntity) {
      const entityId = parseInt(selectedEntity, 10);
      setFieldValue(`extensions[${index}].currentExpectedDate`, '');
      setFieldValue(`extensions[${index}].applicableDataPeriod`, '');
      setDataPeriods(
        submitterData?.submitters.find((s) => s.submitter_id === entityId)
          ?.data_periods ?? []
      );
    } else {
      setFieldValue(`extensions[${index}].currentExpectedDate`, '');
      setFieldValue(`extensions[${index}].applicableDataPeriod`, '');
      setDataPeriods([]);
    }
  }, [selectedEntity, index]);

  return (
    <>
      <hr />
      <h4>Extension Information {index + 1}</h4>
      <p>This extension is on behalf of the following organization:</p>

      <FormGroup className="field-wrapper required">
        <FormLabel
          labelFor={`extensions.${index}.businessName`}
          label={'Business Name'}
          isRequired={true}
        />
        {submitterData && (
          <>
            <Field
              as="select"
              name={`extensions.${index}.businessName`}
              id={`extensions.${index}.businessName`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSelectedEntity(e.target.value);
                setFieldValue(
                  `extensions[${index}].businessName`,
                  e.target.value
                );
              }}
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
        <FormLabel
          labelFor={`extensions.${index}.extensionType`}
          label={'Extension Type'}
          isRequired={true}
        />
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
          <FormLabel
            labelFor={`extensions.${index}.applicableDataPeriod`}
            label={''}
            isRequired={true}
          >
            Applicable Data Period <sup>1</sup>
          </FormLabel>
          <Field
            as="select"
            name={`extensions.${index}.applicableDataPeriod`}
            id={`extensions.${index}.applicableDataPeriod`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFieldValue(
                `extensions[${index}].applicableDataPeriod`,
                e.target.value
              );
              setFieldValue(
                `extensions[${index}].currentExpectedDate`,
                dataPeriods.find((p) => p.data_period === e.target.value)
                  ?.expected_date
              );
            }}
          >
            <option value="">-- Select period --</option>
            {dataPeriods.map((item) => (
              <option value={item.data_period}>{item.data_period}</option>
            ))}
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
          <FormLabel
            labelFor={`extensions.${index}.requestedTargetDate`}
            label={''}
            isRequired={true}
          >
            Requested Target Date <sup>2</sup>
          </FormLabel>
          <Field
            type="date"
            name={`extensions.${index}.requestedTargetDate`}
            id={`requestedTargetDate_${index}`}
            className={`${styles.dateInputField}`}
            max={oneYearFromToday}
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
          <FormLabel
            labelFor={`extensions.${index}.currentExpectedDate`}
            label={''}
            isRequired={true}
          >
            Current Expected Date <sup>3</sup>
          </FormLabel>
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
