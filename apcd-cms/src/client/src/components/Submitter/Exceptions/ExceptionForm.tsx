import React, { useState, useEffect } from 'react';
import { useFormikContext, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormGroup, Label, Input, InputGroup, FormFeedback } from 'reactstrap';
import { cdlObject, useCDLs, cdl } from 'hooks/cdls';
import { Entities, useEntities } from 'hooks/entities';
import styles from './ExceptionForm.module.css';
import LoadingSpinner from 'core-components/LoadingSpinner';
import SectionMessage from 'core-components/SectionMessage';

interface Exception {
  businessName: string;
  fileType: string;
  fieldCode: string;
  expiration_date: string;
  requested_threshold: number;
  required_threshold: number;
}

export const ExceptionForm: React.FC<{ index: number }> = ({ index }) => {
  const [selectedFileType, setSelectedFileType] = useState<string>();
  const [cdlData, setCdlData] = useState<cdlObject>();
  const [selectedCDL, setSelectedCDL] = useState<cdl>();
  const [expirationDate, setExpirationDate] = useState<string>('');
  const [requestedThreshold, setRequestedThreshold] = useState<number>(0);
  index = index + 1;
  

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

  const handleFileChange = (file_type: string) => {
    setSelectedFileType(file_type);
  };
  const handleCDLChange = (cdlCode: string) => {
    setSelectedCDL(
      cdlData?.cdls.find((cdl) => cdl.field_list_code === cdlCode)
    );
  };

  if (entitiesLoading)
    return (
      <div className="loadingField">
        <LoadingSpinner />
      </div>
    );

  return (
    <>
      <hr />
      <h4>Requested Threshold Reduction {index}</h4>
      <FormGroup className="field-wrapper required">
        <Label for={`exceptions[${index}].businessName`}>Business Name</Label>
        {submitterData && (
          <>
            <Field
              as="select"
              name={`exceptions[${index}].businessName`}
              id={`exceptions[${index}].businessName`}
            >
              {submitterData?.submitters?.map((submitter: Entities) => (
                <option key={submitter.entity_name}>
                  {submitter.entity_name} - Payor Code: {submitter.payor_code}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name={`exceptions[${index}].businessName`}
              component={FormFeedback}
            />
          </>
        )}
        {entitiesError && (
          <SectionMessage type="error">
            There was an error finding your associated businesses.{' '}
            <a href="https://txapcd.org/workbench/dashboard/tickets/create">
              Please submit a ticket.
            </a>
          </SectionMessage>
        )}
      </FormGroup>
      <FormGroup className="field-wrapper required">
        <Label for={`exceptions[${index}].fileType`}>File Type</Label>

        <Field
          as="select"
          name={`exceptions[${index}].fileType`}
          id={`exceptions[${index}].fileType`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleFileChange(e.target.value);
          }}
          value={selectedFileType}
        >
          <option value="">-- Choose File Type --</option>
          <option value="dc">Dental Claims</option>
          <option value="mc">Medical Claims</option>
          <option value="me">Member Eligibility</option>
          <option value="pc">Pharmacy Claims</option>
          <option value="pv">Provider</option>
        </Field>
        <ErrorMessage
          name={`exceptions[${index}].fileType`}
          component={FormFeedback}
        />
      </FormGroup>
      <FormGroup className="field-wrapper required">
        <Label for={`exceptions[${index}].fieldCode`}>Field Code</Label>

        <Field
          as="select"
          name={`exceptions[${index}].fieldCode`}
          id={`exceptions[${index}].fieldCode`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleCDLChange(e.target.value);
          }}
          value={selectedCDL?.field_list_code}
        >
          {cdlData ? (
            <>
              <option value="">-- Select Field Code --</option>
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
            <option value="">-- Select a File Type Above First --</option>
          )}
        </Field>
        <ErrorMessage
          name={`exceptions[${index}].fieldCode`}
          component={FormFeedback}
        />
      </FormGroup>
      <div className={styles.fieldRows}>
        <FormGroup className="field-wrapper required">
          <Label for={`exceptions[${index}].expiration_date`}>
            Expiration Date
          </Label>
          <Field
            type="date"
            name={`exceptions[${index}].expiration_date`}
            id={`exceptions[${index}].expiration_date`}
            value={expirationDate} 
            onChange={(e : any) => setExpirationDate(e.target.value)}
          ></Field>
          <ErrorMessage
            name={`exceptions[${index}].expiration_date`}
            component={FormFeedback}
          />
        </FormGroup>
        <FormGroup className="field-wrapper required">
          <Label for={`exceptions[${index}].requested_threshold`}>
            Requested Threshold Percentage
          </Label>
          <Field
            type="number"
            name={`exceptions[${index}].requested_threshold`}
            id={`exceptions[${index}].requested_threshold`}
            min="0"
            className={styles.thresholdRequested}
            max={selectedCDL?.threshold_value}
            value={requestedThreshold}
            onChange={(e : any) => setRequestedThreshold(e.target.value)} 
          ></Field>
          <ErrorMessage
            name={`exceptions[${index}].requested_threshold`}
            component={FormFeedback}
          />

          {selectedCDL && (
            <div className="help-text">
              Must be less than the {selectedCDL.threshold_value} required.
            </div>
          )}
        </FormGroup>
        <FormGroup className="field-wrapper required">
          <Label for={`exceptions[${index}].required_threshold`}>
            Required Threshold Percentage
          </Label>
          <Field
            className={styles.requiredThreshold}
            type="number"
            name={`exceptions[${index}].required_threshold`}
            id={`exceptions[${index}].required_threshold`}
            min="0"
            max="99"
            value={selectedCDL?.threshold_value ? selectedCDL.threshold_value : 0}
          ></Field>
        </FormGroup>
      </div>
    </>
  );
};
