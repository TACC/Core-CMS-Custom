import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { ExtensionRow } from 'hooks/admin';
import styles from './ViewExtensionModal.module.css';

const ViewExtensionModal: React.FC<{
  extension: ExtensionRow;
  isVisible: boolean;
  onClose: () => void;
}> = ({ extension, isVisible, onClose }) => {
    console.log(extension);
  const { view_modal_content } = extension;
  console.log(view_modal_content);

  const {
    ext_id,
    org_name,
    created,
    type,
    requestor,
    ext_outcome,
    ext_status,
    submitter_id,
    approved_expiration_date,
  } = view_modal_content;
  console.log(view_modal_content);

  return (
    <Modal
      title="View Extension"
      isOpen={isVisible}
      toggle={onClose}
      size="lg"
    >
       <div className="modal-header">
          <h4 className="modal-title">Extension Details ID {extension_id} for {entity_name}</h4>
          <button type="button" className="close" data-dismiss="modal">
            <span aria-hidden="true">&#xe912;</span>
          </button>
        </div>
        <ModalBody className="modal-body">
          <div>
              <h4>Details</h4>
                <div className="modal-section">
                    <dl className="c-data-list--is-vert c-data-list--is-wide">
                        <dt className="c-data-list__key">Created</dt>
                        <dd className="c-data-list__value">{created_at}</dd>
                        <dt className="c-data-list__key">Entity Organization</dt>
                        <dd className="c-data-list__value">{entity_name}</dd>
                        <dt className="c-data-list__key">Requestor</dt>
                        <dd className="c-data-list__value">{requestor_name}</dd>
                        <dt className="c-data-list__key">Requestor Email</dt>
                        <dd className="c-data-list__value">{requestor_email}</dd>
                        <dt className="c-data-list__key">Extension Type</dt>
                        <dd className="c-data-list__value">{extension_type}</dd>
                        <dt className="c-data-list__key">Status</dt>
                        <dd className="c-data-list__value">{status}</dd>
                        <dt className="c-data-list__key">Outcome</dt>
                        <dd className="c-data-list__value">{outcome}</dd>
                        <dt className="c-data-list__key">Applicable Data Period</dt>
                        <dd className="c-data-list__value">{applicable_data_period}</dd>
                        <dt className="c-data-list__key">Current Expected Date</dt>
                        <dd className="c-data-list__value">{current_expected_date}</dd>
                        <dt className="c-data-list__key">Requested Target Date</dt>
                        <dd className="c-data-list__value">{requested_target_date}</dd>
                        <dt className="c-data-list__key">Approved Expiration Date</dt>
                        <dd className="c-data-list__value">{approved_expiration_date}</dd>
                        <dt className="c-data-list__key">Extension Justification</dt>
                        <dd className="c-data-list__value">{explanation_justification}</dd>
                        <dt className="c-data-list__key">Extension Notes</dt>
                        <dd className="c-data-list__value">{notes}</dd>
                        <dt className="c-data-list__key">Last Updated</dt>
                        <dd className="c-data-list__value">{updated_at}</dd>
                    </dl>
                </div>
          </div>
        </ModalBody>
    </Modal>
  );
};

export default ViewExtensionModal;
