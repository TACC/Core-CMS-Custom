import React from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { ExceptionModalContent, ExceptionRow } from 'hooks/admin';
import { formatDate } from 'utils/dateUtil';
import styles from './ViewExceptionModal.module.css';

export const ViewExceptionModal: React.FC<{
  exception: ExceptionRow;
  isOpen: boolean;
  onClose: () => void;
}> = ({ exception, isOpen, onClose }) => {
  const closeBtn = (
    <button className="close" onClick={onClose} type="button">
      &times;
    </button>
  );

  const {
    created_at,
    entity_name,
    requestor_name,
    requestor_email,
    request_type,
    status,
    outcome,
    data_file_name,
    field_number,
    required_threshold,
    requested_threshold,
    approved_threshold,
    requested_expiration_date,
    approved_expiration_date,
    explanation_justification,
    notes,
    updated_at,
  } = exception.view_modal_content;
  const dateFormat: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return (
    <Modal title="View Exception" isOpen={isOpen} toggle={onClose} size="lg">
      <ModalHeader close={closeBtn}>Exception Detail</ModalHeader>
      <ModalBody className="modal-body">
        <div>
          <h4>Details</h4>
          <div className="modal-section">
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Created</Col>
              <Col md={7}>
                {(created_at && formatDate(created_at)) || 'None'}
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Entity Organization</Col>
              <Col md={7}>{entity_name}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Requestor</Col>
              <Col md={7}>{requestor_name}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Requestor Email</Col>
              <Col md={7}>{requestor_email}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Exception Type</Col>
              <Col md={7}>{request_type}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Status</Col>
              <Col md={7}>{status}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Outcome</Col>
              <Col md={7}>{outcome || 'None'}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>File Type</Col>
              <Col md={7}>{data_file_name || 'None'}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Field Number</Col>
              <Col md={7}>{field_number || 'None'}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Required Threshold</Col>
              <Col md={7}>{required_threshold || 'None'}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Requested Threshold</Col>
              <Col md={7}>{requested_threshold || 'None'}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Approved Threshold</Col>
              <Col md={7}>{approved_threshold || 'None'}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Requested Expiration Date</Col>
              <Col md={7}>
                {(requested_expiration_date &&
                  new Date(requested_expiration_date).toLocaleDateString(
                    undefined,
                    dateFormat
                  )) ||
                  'None'}
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Approved Expiration Date</Col>
              <Col md={7}>
                {(approved_expiration_date &&
                  new Date(approved_expiration_date).toLocaleDateString(
                    undefined,
                    dateFormat
                  )) ||
                  'None'}
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Explanation Justification</Col>
              <Col md={7}>{explanation_justification || 'None'}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Exception Notes</Col>
              <Col md={7}>{notes || 'None'}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Last Updated</Col>
              <Col md={7}>
                {(updated_at && formatDate(updated_at)) || 'None'}
              </Col>
            </Row>
            <hr />
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ViewExceptionModal;
