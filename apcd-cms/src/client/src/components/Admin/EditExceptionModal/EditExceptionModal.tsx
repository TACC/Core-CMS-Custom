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
  Field,
  ErrorMessage,
  useFormik,
  FormikHelpers,
  FormikProvider,
} from 'formik';
import { fetchUtil } from 'utils/fetchUtil';
import * as Yup from 'yup';
import { ExceptionRow } from 'hooks/admin';
import styles from './EditExceptionModal.module.css';

interface EditRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  exception: ExceptionRow | null;
  statusOptions: string[] | undefined;
  outcomeOptions: string[] | undefined;
  onEditSuccess?: (updatedException: ExceptionRow) => void;
}

interface FormValues {
  exception_id: string;
  approved_threshold: string;
  approved_expiration_date: string;
  status: string;
  outcome: string;
  notes: string;
}

const EditExceptionModal: React.FC<EditRecordModalProps> = ({
  isOpen,
  onClose,
  exception,
  statusOptions,
  outcomeOptions,
  onEditSuccess,
}) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!exception) return null;

  // Use the custom hook to get form fields and validation
  const useFormFields = () => {
    const initialValues: FormValues = {
      ...exception,
      notes: exception?.notes || 'None', // Set notes to 'None' if it is null
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
    const { exception_id } = values;
    const url = `administration/exceptions/${exception_id}/`;
    try {
      setShowSuccessMessage(false);
      const response = await fetchUtil({
        url,
        method: 'PUT',
        body: values,
      });

      if (onEditSuccess && response) {
        onEditSuccess(response);
      }

      setShowSuccessMessage(true);
    } catch (error: any) {
      console.error('Error saving data:', error);
      console.log(url);
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

  const userFields = [
    {
      label: 'Approved Threshold',
      value: exception.approved_threshold
        ? exception.approved_threshold
        : 'None',
    },
    {
      label: 'Approved Expiration Date',
      value: exception.approved_expiration_date
        ? exception.approved_expiration_date
        : 'None',
    },
    { label: 'Exception Status', value: exception.status },
    { label: 'Exception Outcome', value: exception.outcome },
    {
      label: 'Exception Notes',
      value: exception.notes ? exception.notes : 'None',
    },
  ];

  const closeBtn = (
    <button className="close" onClick={onClose} type="button">
      &times;
    </button>
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className={styles.customModal}
        onClosed={handleClose}
      >
        <ModalHeader close={closeBtn}>
          Edit Exception ID {exception.exception_id} for {exception.entity_name}
        </ModalHeader>
        <ModalBody>
          <Alert color="success" isOpen={showSuccessMessage}>
            Success: The exception data has been successfully updated.
          </Alert>
          <div className={styles.greyRectangle}>Edit Selected Exception</div>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <Row>
                {exception.request_type == 'Threshold' && (
                  <Col md={6}>
                    <FormGroup>
                      <Label
                        for="approved_threshold"
                        className={styles.customLabel}
                      >
                        <strong>Approved Threshold</strong>
                      </Label>
                      <Field
                        type="text"
                        name="approved_threshold"
                        id="approved_threshold"
                        value={
                          formik.values.approved_threshold
                            ? formik.values.approved_threshold
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
                        Requested: {exception.requested_threshold}%
                      </small>
                      <ErrorMessage
                        name="approved_threshold"
                        component="div"
                        className="text-danger"
                      />
                    </FormGroup>
                  </Col>
                )}
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
                      {exception.approved_expiration_date
                        ? new Date(
                            exception.approved_expiration_date
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
                    <Label for="status" className={styles.customLabel}>
                      <strong>Exception Status</strong>
                    </Label>
                    <Field
                      as="select"
                      name="status"
                      id="status"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`form-control ${styles.viewRecord}`}
                      value={formik.values.status}
                    >
                      {statusOptions?.map(
                        (val, index) =>
                          val !== 'All' && (
                            <option
                              className="dropdown-text"
                              key={index}
                              value={val}
                            >
                              {val}
                            </option>
                          )
                      )}
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="outcome" className={styles.customLabel}>
                      <strong>Exception Outcome</strong>
                    </Label>
                    <Field
                      as="select"
                      name="outcome"
                      id="outcome"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`form-control ${styles.viewRecord}`}
                      value={formik.values.outcome}
                    >
                      {outcomeOptions?.map((val, index) => (
                        <option
                          className="dropdown-text"
                          key={index}
                          value={val}
                        >
                          {val}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="outcome"
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

export default EditExceptionModal;
