import React, { useState, useEffect } from 'react';
import { useFormikContext, Field, ErrorMessage } from 'formik';
import { cdlObject, useCDLs, cdl } from 'hooks/cdls';
import { Entities, useEntities } from 'hooks/entities';
import styles from './ExceptionForm.module.css';
import LoadingSpinner from 'core-components/LoadingSpinner';
import SectionMessage from 'core-components/SectionMessage';
import { Link } from 'react-router-dom';
import FieldWrapper from 'core-wrappers/FieldWrapperFormik';

export const ExceptionForm: React.FC<{ index: number }> = ({ index }) => {
  const [cdlData, setCdlData] = useState<cdlObject>();
  const [selectedCDL, setSelectedCDL] = useState<cdl>();

  const { setFieldValue, values } = useFormikContext<any>();

  const selectedFileType = values.exceptions[index]?.fileType;

  const {
    data: submitterData,
    isLoading: entitiesLoading,
    isError: entitiesError,
  } = useEntities();

  const {
    data: fetchedCDLData,
    isLoading: cdlLoading,
    isError: cdlError,
  } = useCDLs(selectedFileType);

  useEffect(() => {
    if (fetchedCDLData && fetchedCDLData.cdls) {
      setCdlData(fetchedCDLData);
    }
  }, [fetchedCDLData]);

  useEffect(() => {
    if (selectedCDL) {
      setFieldValue(
        `exceptions[${index}].required_threshold`,
        selectedCDL?.threshold_value || ''
      );
    }
    if (!selectedFileType || selectedFileType === '') {
      setCdlData(undefined);
      setSelectedCDL(undefined);
      setFieldValue(`exceptions[${index}].fieldCode`, '');
      setFieldValue(`exceptions[${index}].required_threshold`, '');
      setFieldValue(`exceptions[${index}].requested_threshold`, '');
    } else if (fetchedCDLData && fetchedCDLData.cdls) {
      setCdlData(fetchedCDLData);
    }
  }, [selectedCDL, selectedFileType, setFieldValue, index]);

  if (entitiesLoading)
    return (
      <div className="loadingField">
        <LoadingSpinner />
      </div>
    );

  return (
    <>
      <hr />
      <h4>Requested Threshold Reduction {index + 1}</h4>
      <FieldWrapper
        name={`exceptions.${index}.businessName`}
        label="Business Name"
        required={true}
      >
        {submitterData && (
          <>
            <Field
              as="select"
              name={`exceptions[${index}].businessName`}
              id={`exceptions[${index}].businessName`}
            >
              <option value="">Select a Business Name</option>
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
        {entitiesError && (
          <SectionMessage type="error">
            There was an error finding your associated businesses.{' '}
            <a href="/workbench/dashboard/tickets/create" className="wb-link">
              Please submit a ticket.
            </a>
          </SectionMessage>
        )}
      </FieldWrapper>
      <FieldWrapper
        name={`exceptions[${index}].fileType`}
        label="File Type"
        required={true}
      >
        <Field
          as="select"
          name={`exceptions[${index}].fileType`}
          id={`exceptions[${index}].fileType`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFieldValue(`exceptions[${index}].fileType`, e.target.value);
            setFieldValue(`exceptions[${index}].fieldCode`, '');
          }}
        >
          <option value="">Select a File Type</option>
          <option value="dc">Dental Claims</option>
          <option value="mc">Medical Claims</option>
          <option value="me">Member Eligibility</option>
          <option value="pc">Pharmacy Claims</option>
          <option value="pv">Provider</option>
        </Field>
      </FieldWrapper>
      <FieldWrapper
        name={`exceptions[${index}].fieldCode`}
        label="Field Code"
        required={true}
      >
        <Field
          as="select"
          name={`exceptions[${index}].fieldCode`}
          id={`exceptions[${index}].fieldCode`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSelectedCDL(
              cdlData?.cdls.find(
                (cdl) => cdl.field_list_code === e.target.value
              )
            );
            setFieldValue(`exceptions[${index}].fieldCode`, e.target.value);
          }}
        >
          {cdlData ? (
            <>
              <option value="">Select Field Code</option>
              {cdlData.cdls.map((cdl: any) => (
                <option
                  key={cdl.field_list_code}
                  id={cdl.field_list_code}
                  value={cdl.field_list_code}
                >
                  {cdl.field_list_code}
                  {' - '}
                  {cdl.field_list_value}
                </option>
              ))}
            </>
          ) : (
            <option value="">Select a File Type Above First</option>
          )}
        </Field>
      </FieldWrapper>
      <div className={styles.fieldRows}>
        <FieldWrapper
          name={`exceptions[${index}].expiration_date`}
          label="Expiration Date"
          required={true}
        >
          <Field
            type="date"
            name={`exceptions[${index}].expiration_date`}
            id={`exceptions[${index}].expiration_date`}
          ></Field>
        </FieldWrapper>
        <FieldWrapper
          name={`exceptions[${index}].requested_threshold`}
          label="Requested Threshold Percentage"
          required={true}
          description={
            selectedCDL &&
            (selectedCDL.threshold_value != 0 ? (
              <>Must be less than the {selectedCDL.threshold_value} required.</>
            ) : (
              <>
                This field code does not require an exception submission.
                <br /> Please choose another.
              </>
            ))
          }
        >
          <Field
            type="number"
            name={`exceptions[${index}].requested_threshold`}
            id={`exceptions[${index}].requested_threshold`}
            className={styles.thresholdRequested}
            max={selectedCDL?.threshold_value}
          ></Field>
        </FieldWrapper>
        <FieldWrapper
          name={`exceptions[${index}].required_threshold`}
          label="Required Threshold Percentage"
          required={true}
        >
          <Field
            className={styles.requiredThreshold}
            type="number"
            readOnly
            name={`exceptions[${index}].required_threshold`}
            id={`exceptions[${index}].required_threshold`}
          ></Field>
        </FieldWrapper>
      </div>
    </>
  );
};
