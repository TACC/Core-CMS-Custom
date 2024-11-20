import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  Label,
  FormGroup,
  Row,
  Col,
  Alert,
} from 'reactstrap';
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  useFormik,
  FormikHelpers,
  FormikProvider,
} from 'formik';
import { fetchUtil } from 'utils/fetchUtil';
import * as Yup from 'yup';
import { ExtensionRow } from 'hooks/admin';
import { useEntities } from 'hooks/entities';
import QueryWrapper from 'core-wrappers/QueryWrapper';
import { convertPeriodLabelToApiValue, convertApiValueToPeriodLabel } from 'utils/dateUtil';
import styles from './EditExtensionModal.module.css';

interface EditExtensionModalProps {
  isVisible: boolean;
  onClose: () => void;
  extension: ExtensionRow | null;
  statusOptions: string[] | undefined;
  outcomeOptions: string[] | undefined;
  onEditSuccess?: (updatedExtension: ExtensionRow) => void;
}

interface FormValues {
  ext_outcome: string;
  ext_status: string;
  ext_id: string;
  approved_expiration_date: string;
  applicable_data_period: string;
  notes: string;
}

const EditExtensionModal: React.FC<EditExtensionModalProps> = ({
  isVisible,
  onClose,
  extension,
  statusOptions,
  outcomeOptions,
  onEditSuccess,
}) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userFields, setUserFields] = useState([
    {
      label: 'Applicable Data Period',
      value: extension?.applicable_data_period || 'None',
    },
    {
      label: 'Approved Expiration Date',
      value: extension?.approved_expiration_date || 'None',
    },
    { label: 'Exception Status', value: extension?.ext_status },
    { label: 'Exception Outcome', value: extension?.ext_outcome },
    { label: 'Exception Notes', value: extension?.notes || 'None' },
  ]);
  const {
    data: submitterData,
    isLoading: entitiesLoading,
    error: entitiesError,
  } = useEntities();

  if (!extension) return null;

  // Use the custom hook to get form fields and validation
  const useFormFields = () => {
    const initialValues: FormValues = {
      ...extension,
      ext_id: extension?.ext_id,
      notes: extension?.notes || 'None', // Set notes to 'None' if it is null
    };

    const validationSchema = Yup.object({
      notes: Yup.string()
        .max(2000, 'Notes cannot exceed 2000 characters')
        .nullable(),
    });

    return { initialValues, validationSchema };
  };
  const { initialValues, validationSchema } = useFormFields();

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const { ext_id } = values;
    const api_values = {
      ...values,
      'applicable_data_period': convertPeriodLabelToApiValue(values['applicable_data_period']),
    }
    const url = `administration/update-extension/${ext_id}/`;

    try {
      setShowSuccessMessage(false);
      const response = await fetchUtil({
        url,
        method: 'PUT',
        body: api_values,
      });

      if (onEditSuccess && response) {
        onEditSuccess(response);
        setUserFields([
          {
            label: 'Applicable Data Period',
            value: convertApiValueToPeriodLabel(values.applicable_data_period) || 'None',
          },
          {
            label: 'Approved Expiration Date',
            value: values.approved_expiration_date || 'None',
          },
          { label: 'Exception Status', value: values.ext_status },
          { label: 'Exception Outcome', value: values.ext_outcome },
          { label: 'Exception Notes', value: values.notes || 'None' },
        ]);
      }

      setShowSuccessMessage(true);
    } catch (error: any) {
      if (error.response && error.response.data) {
        // Use error message from the server response
        setErrorMessage(
          error.response.data.message ||
            'An error occurred while saving the data. Please try again.'
        );
      } else {
        // Use generic error message
        setErrorMessage(
          'An error occurred while saving the data. Please try again.'
        );
      }
      setShowErrorMessage(true);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const handleClose = () => {
    setShowSuccessMessage(false);
    setShowErrorMessage(false);
  };

  const closeBtn = (
    <button className="close" onClick={onClose} type="button">
      &times;
    </button>
  );

  return (
    <>
      <Modal
        isOpen={isVisible}
        onClose={onClose}
        className={styles.customModal}
        onClosed={handleClose}
      >
        <ModalHeader close={closeBtn}>
          Edit Extension ID {extension.ext_id} for {extension.org_name}
        </ModalHeader>
        <ModalBody>
          <Alert color="success" isOpen={showSuccessMessage}>
            Success: The extension data has been successfully updated.
          </Alert>
          <div className={styles.greyRectangle}>Edit Selected Extension</div>
          <QueryWrapper
            isLoading={entitiesLoading}
            error={entitiesError as Error}
          >
            <FormikProvider value={formik}>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label
                        for="applicable_data_period"
                        className={styles.customLabel}
                      >
                        <strong>Applicable Data Period</strong>
                      </Label>
                      <Field
                        as="select"
                        name="applicable_data_period"
                        id="applicable_data_period"
                        value={convertPeriodLabelToApiValue(
                          formik.values.applicable_data_period
                        )}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-control ${styles.viewRecord}`}
                      >
                        {submitterData?.submitters
                          .find(
                            (s) =>
                              s.submitter_id === Number(extension.submitter_id)
                          )
                          ?.data_periods?.map((item) => (
                            <option
                              key={item.data_period}
                              value={item.data_period}
                            >
                              {item.data_period}
                            </option>
                          ))}
                      </Field>
                      <small
                        className="form-text text-muted"
                        style={{ fontStyle: 'italic' }}
                      >
                        Current: {extension.applicable_data_period}
                      </small>
                      <ErrorMessage
                        name="applicable_data_period"
                        component="div"
                        className="text-danger"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label
                        for="approved_expiration_date"
                        className={styles.customLabel}
                      >
                        <strong>Approved Expiration Date</strong>
                      </Label>
                      <Field
                        type="date"
                        name="approved_expiration_date"
                        id="approved_expiration_date"
                        value={
                          formik.values.approved_expiration_date
                            ? formik.values.approved_expiration_date
                            : ''
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-control ${styles.viewRecord}`}
                      />
                      <small
                        className="form-text text-muted"
                        style={{ fontStyle: 'italic' }}
                      >
                        Current:{' '}
                        {extension.approved_expiration_date
                          ? new Date(
                              extension.approved_expiration_date
                            ).toLocaleDateString()
                          : 'None'}
                      </small>
                      <ErrorMessage
                        name="approved_expiration_date"
                        component="div"
                        className="text-danger"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="ext_status" className={styles.customLabel}>
                        <strong>Extension Status</strong>
                      </Label>
                      <Field
                        as="select"
                        name="ext_status"
                        id="ext_status"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-control ${styles.viewRecord}`}
                        value={formik.values.ext_status}
                      >
                        {statusOptions?.map(
                          (opt) =>
                            opt.value !== 'All' && (
                              <option
                                className="dropdown-text"
                                key={opt.key}
                                value={opt.value}
                              >
                                {opt.value}
                              </option>
                            )
                        )}
                      </Field>
                      <ErrorMessage
                        name="ext_status"
                        component="div"
                        className="text-danger"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="ext_outcome" className={styles.customLabel}>
                        <strong>Extension Outcome</strong>
                      </Label>
                      <Field
                        as="select"
                        name="ext_outcome"
                        id="ext_outcome"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-control ${styles.viewRecord}`}
                        value={formik.values.ext_outcome}
                      >
                        {outcomeOptions?.map((opt) => (
                          <option
                            className="dropdown-text"
                            key={opt.key}
                            value={opt.value}
                          >
                            {opt.value}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="ext_outcome"
                        component="div"
                        className="text-danger"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="notes" className={styles.customLabel}>
                        <strong>Notes</strong>
                      </Label>
                      <Field
                        as="textarea"
                        name="notes"
                        id="notes"
                        rows="5"
                        maxLength="2000" // Set the maxLength attribute
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-control ${styles.viewRecord}`}
                      />
                      <small
                        className="form-text text-muted"
                        style={{ fontStyle: 'italic' }}
                      >
                        2000 character limit
                      </small>
                      <ErrorMessage
                        name="notes"
                        component="div"
                        className="text-danger"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <br />
                <Alert color="danger" isOpen={showErrorMessage}>
                  Error: {errorMessage}
                </Alert>
                <Button
                  type="submit"
                  color="primary"
                  disabled={formik.isSubmitting}
                  className={styles.customSubmitButton}
                >
                  Submit
                </Button>
              </form>
            </FormikProvider>
          </QueryWrapper>
          <hr />
          <div className={styles.viewRecord}>
            {userFields.map((field, index) => (
              <Row key={index}>
                <Col md={6}>
                  <p>{field.label}:</p>
                </Col>
                <Col md={6}>
                  <p>{field.value}</p>
                </Col>
              </Row>
            ))}
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default EditExtensionModal;
