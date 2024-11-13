import React from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { ExceptionModalContent, ExceptionRow } from 'hooks/admin';
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

  return (
    <Modal title="View Exception" isOpen={isOpen} toggle={onClose} size="lg">
      <ModalHeader close={closeBtn}>Exception Detail</ModalHeader>
      <ModalBody className="modal-body">
        <div>
          <h4>Details</h4>
          <div className="modal-section">
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Created</Col>
              <Col md={7}>{new Date(created_at).toLocaleString()}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Entity Organization</Col>
              <Col md={7}>{entity_name}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Requestor</Col>
              <Col md={7}>{requestor_name}</Col>
            </Row>
            <dd>
              <dl className={styles.verticalDataList}>
                <dt className="c-data-list__key">Requestor Email</dt>
                <dd className={styles.verticalDataValue}>{requestor_email}</dd>
              </dl>
            </dd>
            <dd>
              <dl className={styles.verticalDataList}>
                <dt className="c-data-list__key">Exception Type</dt>
                <dd className={styles.verticalDataValue}>{request_type}</dd>
              </dl>
            </dd>
            <dd>
              <dl className={styles.verticalDataList}>
                <dt className="c-data-list__key">Status</dt>
                <dd className={styles.verticalDataValue}>{status}</dd>
              </dl>
            </dd>
            <dd>
              <dl className={styles.verticalDataList}>
                <dt className="c-data-list__key">Outcome</dt>
                <dd className={styles.verticalDataValue}>
                  {outcome || 'None'}
                </dd>
              </dl>
            </dd>
            <dd>
              <dl className={styles.verticalDataList}>
                <dt className="c-data-list__key">File Type</dt>
                <dd className={styles.verticalDataValue}>{data_file_name}</dd>
              </dl>
            </dd>
            <dd>
              <dl className={styles.verticalDataList}>
                <dt className="c-data-list__key">Field Number</dt>
                <dd className={styles.verticalDataValue}>{field_number}</dd>
              </dl>
            </dd>
            <dd>
              <dl className={styles.verticalDataList}>
                <dt className="c-data-list__key">Required Threshold</dt>
                <dd className={styles.verticalDataValue}>
                  {required_threshold || 'None'}
                </dd>
              </dl>
            </dd>
            <dd>
              <dl className={styles.verticalDataList}>
                <dt className="c-data-list__key">Requested Threshold</dt>
                <dd className={styles.verticalDataValue}>
                  {requested_threshold}
                </dd>
              </dl>
            </dd>
            <dd>
              <dl className={styles.verticalDataList}>
                <dt className="c-data-list__key">Approved Threshold</dt>
                <dd className={styles.verticalDataValue}>
                  {approved_threshold || 'Nome'}
                </dd>
              </dl>
            </dd>
            <dd>
              <dl className={styles.verticalDataList}>
                <dt className="c-data-list__key">Requested Expiration Date</dt>
                <dd className={styles.verticalDataValue}>
                  {requested_expiration_date}
                </dd>
              </dl>
            </dd>
            <dd>
              <dl className={styles.verticalDataList}>
                <dt className="c-data-list__key">Approved Expiration Date</dt>
                <dd className={styles.verticalDataValue}>
                  {approved_expiration_date || 'None'}
                </dd>
              </dl>
            </dd>
            <dd>
              <dl className={styles.verticalDataList}>
                <dt className="c-data-list__key">Explanation Justification</dt>
                <dd className={styles.verticalDataValue}>
                  {explanation_justification}
                </dd>
              </dl>
            </dd>
            <dd>
              <dl className={styles.verticalDataList}>
                <dt className="c-data-list__key">Exception Notes</dt>
                <dd className={styles.verticalDataValue}>{notes || 'None'}</dd>
              </dl>
            </dd>
            <dd>
              <dl className={styles.verticalDataList}>
                <dt className="c-data-list__key">Last Updated</dt>
                <dd className={styles.verticalDataValue}>
                  {new Date(updated_at).toLocaleString()}
                </dd>
              </dl>
            </dd>
            <hr />
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ViewExceptionModal;
