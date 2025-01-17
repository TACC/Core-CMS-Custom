import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { ExtensionRow } from 'hooks/admin';
import styles from './ViewExtensionModal.module.css';

const ViewExtensionModal: React.FC<{
  extension: ExtensionRow;
  isVisible: boolean;
  onClose: () => void;
}> = ({ extension, isVisible, onClose }) => {
  const closeBtn = (
    <button className="close" onClick={onClose} type="button">
      &times;
    </button>
  );
  return (
    <Modal title="View Extension" isOpen={isVisible} toggle={onClose} size="lg">
      <ModalHeader close={closeBtn}>
        Extension Details ID {extension.ext_id} for {extension.org_name}
      </ModalHeader>

      <ModalBody className="modal-body">
        <div>
          <h4>Details</h4>
          <div className="modal-section">
            <dl className="c-data-list--is-vert c-data-list--is-wide">
              <dt className="c-data-list__key">Created</dt>
              <dd className="c-data-list__value">{extension.created}</dd>
              <dt className="c-data-list__key">Entity Organization</dt>
              <dd className="c-data-list__value">{extension.org_name}</dd>
              <dt className="c-data-list__key">Requestor</dt>
              <dd className="c-data-list__value">{extension.requestor}</dd>
              <dt className="c-data-list__key">Requestor Email</dt>
              <dd className="c-data-list__value">
                {extension.requestor_email}
              </dd>
              <dt className="c-data-list__key">Extension Type</dt>
              <dd className="c-data-list__value">{extension.type}</dd>
              <dt className="c-data-list__key">Status</dt>
              <dd className="c-data-list__value">{extension.ext_status}</dd>
              <dt className="c-data-list__key">Outcome</dt>
              <dd className="c-data-list__value">{extension.ext_outcome}</dd>
              <dt className="c-data-list__key">Applicable Data Period</dt>
              <dd className="c-data-list__value">
                {extension.applicable_data_period}
              </dd>
              <dt className="c-data-list__key">Current Expected Date</dt>
              <dd className="c-data-list__value">
                {extension.current_expected_date}
              </dd>
              <dt className="c-data-list__key">Requested Target Date</dt>
              <dd className="c-data-list__value">
                {extension.requested_target_date}
              </dd>
              <dt className="c-data-list__key">Approved Expiration Date</dt>
              <dd className="c-data-list__value">
                {extension.approved_expiration_date}
              </dd>
              <dt className="c-data-list__key">Extension Justification</dt>
              <dd className="c-data-list__value">
                {extension.explanation_justification}
              </dd>
              <dt className="c-data-list__key">Extension Notes</dt>
              <dd className="c-data-list__value">{extension.notes}</dd>
              <dt className="c-data-list__key">Last Updated</dt>
              <dd className="c-data-list__value">{extension.updated_at}</dd>
            </dl>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ViewExtensionModal;
