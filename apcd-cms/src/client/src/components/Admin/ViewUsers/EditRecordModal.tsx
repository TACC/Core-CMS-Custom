import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, FormGroup, Row, Col } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { UserRow } from 'hooks/admin';
import styles from './ViewUsers.module.scss';  // Import SCSS module

interface EditRecordModalProps {
  isOpen: boolean;
  toggle: () => void;
  user: UserRow | null;
}

const EditRecordModal: React.FC<EditRecordModalProps> = ({ isOpen, toggle, user }) => {
  if (!user) return null;

  const initialValues: UserRow = {
    ...user,
    notes: user.notes || 'None',  // Set notes to 'None' if it is null
  };

  const validationSchema = Yup.object({
    user_name: Yup.string().required('Name is required'),
    user_email: Yup.string().email('Invalid email format').required('Email is required'),
    status: Yup.string().required('Status is required'),
    role_name: Yup.string().required('Role is required'),
    notes: Yup.string().max(2000, 'Notes cannot exceed 2000 characters').nullable(),
  });

  const handleSave = async (values: UserRow) => {
    try {
      const response = await axios.post('/administration/edit-user/api/', values);
      console.log('Save successful:', response.data);
      toggle();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const userFields = [
    { label: 'User ID', value: user.user_id },
    { label: 'Name', value: user.user_name },
    { label: 'User Number', value: user.user_number },
    { label: 'Email', value: user.user_email },
    { label: 'Entity Organization', value: user.entity_name },
    { label: 'Role', value: user.role_name },
    { label: 'Status', value: user.status },
    { label: 'Created Date', value: user.created_at },
    { label: 'Updated Date', value: user.updated_at },
    { label: 'Notes', value: user.notes !== null ? user.notes : 'None' },
  ];

  return (
    <Modal isOpen={isOpen} toggle={toggle} className={styles.customModal}>
      <div className={`modal-header ${styles.modalHeader}`}>
        <Label className={styles.customModalTitle}>
        Edit User ID: {user.user_id} for {user.user_name}
        </Label>
        <button type="button" className={`close ${styles.customCloseButton}`} onClick={toggle}>
          <span aria-hidden="true">&#xe912;</span>
        </button>
      </div>
      <ModalBody>
        <div className={styles.greyRectangle}>
          Edit Selected User
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {({ isSubmitting }) => (
            <Form>
            <Row form>
              <Col md={3}>
                <FormGroup>
                  <Label for="user_name" className={styles.customLabel}><strong>Name</strong></Label>
                  <Field
                    type="text"
                    name="user_name"
                    id="user_name"
                    className={`form-control ${styles.viewRecord}`}
                  />
                  <ErrorMessage name="user_name" component="div" className="text-danger" />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="user_email" className={styles.customLabel}><strong>Email</strong></Label>
                  <Field
                    type="email"
                    name="user_email"
                    id="user_email"
                    className={`form-control ${styles.viewRecord}`}
                  />
                  <ErrorMessage name="user_email" component="div" className="text-danger" />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="status" className={styles.customLabel}><strong>Active Status</strong></Label>
                  <Field
                    as="select"
                    name="status"
                    id="status"
                    className={`form-control ${styles.viewRecord}`}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-danger" />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="role_name" className={styles.customLabel}><strong>Role</strong></Label>
                  <Field
                    as="select"
                    name="role_name"
                    id="role_name"
                    className={`form-control ${styles.viewRecord}`}
                  >
                    <option value="SUBMITTER_USER">SUBMITTER_USER</option>
                    <option value="SUBMITTER_ADMIN">SUBMITTER_ADMIN</option>
                    <option value="APCD_ADMIN">APCD_ADMIN</option>
                  </Field>
                  <ErrorMessage name="role_name" component="div" className="text-danger" />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="notes" className={styles.customLabel}><strong>Notes</strong></Label>
                  <Field
                    as="textarea"
                    name="notes"
                    id="notes"
                    rows="5"
                    maxLength="2000"  // Set the maxLength attribute
                    className={`form-control ${styles.viewRecord}`}
                  />
                  <small className="form-text text-muted" style={{ fontStyle: 'italic' }}>
                    2000 character limit
                  </small>
                  <ErrorMessage name="notes" component="div" className="text-danger" />
                </FormGroup>
              </Col>
            </Row>
            <br />
            <Button type="submit" color="primary" disabled={isSubmitting} className={styles.customSubmitButton}>
              Submit
            </Button>
          </Form>
          )}
        </Formik>
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
  );
};

export default EditRecordModal;
