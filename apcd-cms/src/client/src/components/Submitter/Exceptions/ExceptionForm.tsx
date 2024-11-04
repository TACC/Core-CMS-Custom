import React, { useState, useEffect } from 'react';
import { useFormikContext, Field, ErrorMessage } from 'formik';
import { FormGroup, Label, Badge } from 'reactstrap';
import { cdlObject, useCDLs, cdl } from 'hooks/cdls';
import { Entities, useEntities } from 'hooks/entities';
import styles from './ExceptionForm.module.css';
import LoadingSpinner from 'core-components/LoadingSpinner';
import SectionMessage from 'core-components/SectionMessage';
import { Link } from 'react-router-dom';
import Pill from 'core-components/Pill';

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
      <FormGroup className="field-wrapper required">
        <Label for={`exceptions[${index}].businessName`}>
          Business Name
          <Badge color="badge badge-danger" className={styles.requiredBadge}>
            Required
          </Badge>
        </Label>
        {submitterData && (
          <>
            <Field
              as="select"
              name={`exceptions[${index}].businessName`}
              id={`exceptions[${index}].businessName`}
            >
              <option>Select a Business Name</option>
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
              name={`exceptions[${index}].businessName`}
              component="div"
              className={styles.isInvalid}
            />
          </>
        )}
        {entitiesError && (
          <SectionMessage type="error">
            There was an error finding your associated businesses.{' '}
            <Link to="/workbench/dashboard/tickets/create" className="wb-link">
              Please submit a ticket.
            </Link>
          </SectionMessage>
        )}
      </FormGroup>
      <FormGroup className="field-wrapper required">
        <Label for={`exceptions[${index}].fileType`}>
          File Type
          <Badge color="badge badge-danger" className={styles.requiredBadge}>
            Required
          </Badge>
        </Label>

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
        <ErrorMessage
          name={`exceptions[${index}].fileType`}
          component="div"
          className={styles.isInvalid}
        />
      </FormGroup>
      <FormGroup className="field-wrapper required">
        <Label for={`exceptions[${index}].fieldCode`}>
          Field Code
          <Badge color="badge badge-danger" className={styles.requiredBadge}>
            Required
          </Badge>
        </Label>

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
        <ErrorMessage
          name={`exceptions[${index}].fieldCode`}
          component="div"
          className={styles.isInvalid}
        />
      </FormGroup>
      <div className={styles.fieldRows}>
        <FormGroup className="field-wrapper required">
          <Label for={`exceptions[${index}].expiration_date`}>
            Expiration Date*
            <Badge color="badge badge-danger" className={styles.requiredBadge}>
              Required
            </Badge>
          </Label>
          <Field
            type="date"
            name={`exceptions[${index}].expiration_date`}
            id={`exceptions[${index}].expiration_date`}
          ></Field>
          <ErrorMessage
            name={`exceptions[${index}].expiration_date`}
            component="div"
            className={styles.isInvalid}
          />
        </FormGroup>
        <FormGroup className="field-wrapper required">
          <Label for={`exceptions[${index}].requested_threshold`}>
            Requested Threshold Percentage
            <Badge color="badge badge-danger" className={styles.requiredBadge}>
              Required
            </Badge>
          </Label>
          <Field
            type="number"
            name={`exceptions[${index}].requested_threshold`}
            id={`exceptions[${index}].requested_threshold`}
            className={styles.thresholdRequested}
            max={selectedCDL?.threshold_value}
          ></Field>
          <ErrorMessage
            name={`exceptions[${index}].requested_threshold`}
            component="div"
            className={styles.isInvalid}
          />

          {selectedCDL &&
            (selectedCDL.threshold_value != 0 ? (
              <div className="help-text">
                Must be less than the {selectedCDL.threshold_value} required.
              </div>
            ) : (
              <div className="help-text">
                This field code does not require an exception submission.
                <br /> Please choose another.
              </div>
            ))}
        </FormGroup>
        <FormGroup className="field-wrapper required">
          <Label for={`exceptions[${index}].required_threshold`}>
            Required Threshold Percentage
          </Label>
          <Field
            className={styles.requiredThreshold}
            type="number"
            readOnly
            name={`exceptions[${index}].required_threshold`}
            id={`exceptions[${index}].required_threshold`}
          ></Field>
          <ErrorMessage
            name={`exceptions[${index}].required_threshold`}
            component="div"
            className={styles.isInvalid}
          />
        </FormGroup>
      </div>
    </>
  );
};
