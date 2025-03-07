import React, { useState, useEffect } from 'react';
import { useFormikContext, Field, ErrorMessage } from 'formik';
import styles from './ExtensionsForm.module.css';
import {
  SubmitterEntityData,
  Entities,
  ApplicableDataPeriod,
  useSubmitterDataPeriods,
} from 'hooks/entities';
import SectionMessage from 'core-components/SectionMessage';
import FieldWrapper from 'core-wrappers/FieldWrapperFormik';

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

  const {
    data: fetchedDataPeriods,
    isLoading: dataPeriodsLoading,
    error: dataPeriodsError,
  } = useSubmitterDataPeriods(selectedEntity);

  useEffect(() => {
    setDataPeriods([]); // Reset on entity change
    setFieldValue(`extensions[${index}].currentExpectedDate`, '');
    setFieldValue(`extensions[${index}].applicableDataPeriod`, '');
  }, [selectedEntity, index, setFieldValue]);

  useEffect(() => {
    if (!dataPeriodsLoading && !dataPeriodsError) {
      setDataPeriods(fetchedDataPeriods?.data_periods ?? []);
    }
  }, [fetchedDataPeriods, dataPeriodsLoading, dataPeriodsError]);

  return (
    <>
      <hr />
      <h4>Extension Information {index + 1}</h4>
      <p>This extension is on behalf of the following organization:</p>

      <FieldWrapper
        name={`extensions.${index}.businessName`}
        label="Business Name"
        required={true}
      >
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
          </>
        )}

        {!submitterData && (
          <SectionMessage type="error">
            There was an error finding your associated businesses.{' '}
            <a href="/workbench/dashboard/tickets/create" className="wb-link">
              Please submit a ticket.
            </a>
          </SectionMessage>
        )}
      </FieldWrapper>

      <FieldWrapper
        name={`extensions.${index}.extensionType`}
        label="Extension Type"
        required={true}
      >
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
      </FieldWrapper>

      <h6>Submission Dates</h6>
      <div className={styles.fieldRows}>
        <FieldWrapper
          name={`extensions.${index}.applicableDataPeriod`}
          label={
            <>
              Applicable Data Period <sup>1</sup>
            </>
          }
          required={true}
          description="Enter month and year"
        >
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
              <option value={item.data_period} key={item.data_period}>
                {item.data_period}
              </option>
            ))}
          </Field>
        </FieldWrapper>

        <FieldWrapper
          name={`extensions.${index}.requestedTargetDate`}
          label={
            <>
              Requested Target Date <sup>2</sup>
            </>
          }
          required={true}
          className={`position-relative ${styles.dateInputContainer}`}
        >
          <Field
            type="date"
            name={`extensions.${index}.requestedTargetDate`}
            id={`requestedTargetDate_${index}`}
            className={`${styles.dateInputField}`}
            max={oneYearFromToday}
          />
        </FieldWrapper>

        <FieldWrapper
          name={`extensions.${index}.currentExpectedDate`}
          label={
            <>
              Current Expected Date <sup>3</sup>
            </>
          }
          required={false}
          className={`position-relative ${styles.dateInputContainer} `}
        >
          <Field
            type="date"
            readOnly
            className={`position-relative ${styles.currentExpectedDate}`}
            name={`extensions.${index}.currentExpectedDate`}
            id={`extensions.${index}.currentExpectedDate`}
          />
        </FieldWrapper>
      </div>
    </>
  );
};

export default ExtensionFormInfo;
