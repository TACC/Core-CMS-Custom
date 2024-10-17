import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ExceptionModalContent, ExceptionRow } from 'hooks/admin';
import styles from './ViewExceptionModal.module.css';

export const ViewExceptionModal: React.FC<{
  exception: ExceptionRow;
  isOpen: boolean;
  onClose: () => void;
}> = ({ exception, isOpen, onClose }) => {
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
      <div className="modal-header">
        <h4 className="modal-title text-capitalize">View Exception</h4>
        <button type="button" className="close" onClick={onClose}>
          <span aria-hidden="true">&#xe912;</span>
        </button>
      </div>
      <ModalBody className="modal-body">
        <div>
          <h4>Details</h4>
          <dd>
            <dl className={styles.verticalDataList}>
              <dt className="c-data-list__key">Created</dt>
              <dd className={styles.verticalDataValue}>
                {new Date(created_at).toLocaleString()}
              </dd>
            </dl>
          </dd>
          <dd>
            <dl className={styles.verticalDataList}>
              <dt className="c-data-list__key">Entity Organization</dt>
              <dd className={styles.verticalDataValue}>{entity_name}</dd>
            </dl>
          </dd>
          <dd>
            <dl className={styles.verticalDataList}>
              <dt className="c-data-list__key">Requestor</dt>
              <dd className={styles.verticalDataValue}>{requestor_name}</dd>
            </dl>
          </dd>
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
              <dd className={styles.verticalDataValue}>{outcome}</dd>
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
              <dd className={styles.verticalDataValue}>{required_threshold}</dd>
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
              <dd className={styles.verticalDataValue}>{approved_threshold}</dd>
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
                {approved_expiration_date}
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
              <dd className={styles.verticalDataValue}>{notes}</dd>
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
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ViewExceptionModal;
