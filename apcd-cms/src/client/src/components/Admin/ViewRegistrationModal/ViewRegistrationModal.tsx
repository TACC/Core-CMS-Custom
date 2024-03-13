import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { RegistrationRow } from 'hooks/admin';
import styles from './ViewRegistrationModal.module.css';

const ViewRegistrationModal: React.FC<{
  registration: RegistrationRow;
  isVisible: boolean;
  onClose: () => void;
}> = ({ registration, isVisible, onClose }) => {
  const { view_modal_content } = registration;

  const {
    for_self,
    year,
    type,
    biz_name,
    address,
    city,
    state,
    zip,
    entities,
    contacts,
  } = view_modal_content;

  return (
    <Modal
      title="View Registration"
      isOpen={isVisible}
      toggle={onClose}
      size="lg"
    >
      <div className="modal-header">
        <h4 className="modal-title text-capitalize">View Registration</h4>
        <button type="button" className="close" onClick={onClose}>
          <span aria-hidden="true">&#xe912;</span>
        </button>
      </div>
      <ModalBody className="modal-body">
        <div>
          <h4>Organization</h4>
          <dd>
            <dl className={styles.verticalDataList}>
              <dt className="c-data-list__key">On behalf of</dt>
              <dd className={styles.verticalDataValue}>
                {for_self ? 'Self' : 'Other'}
              </dd>
              <dt className="c-data-list__key">Registration Year</dt>
              <dd className={styles.verticalDataValue}>{year}</dd>
              <dt className="c-data-list__key">Type</dt>
              <dd className={styles.verticalDataValue}>{type}</dd>
              <dt className="c-data-list__key">Business Name</dt>
              <dd className={styles.verticalDataValue}>{biz_name}</dd>
              <dt className="c-data-list__key">Mailing Address</dt>
              <dd className={styles.verticalDataValue}>{address}</dd>
              <dd
                className={styles.verticalDataValue}
              >{`${city}, ${state}`}</dd>
              <dd className={styles.verticalDataValue}>{zip}</dd>
            </dl>
          </dd>

          <hr />
          <h4>Entity/Entities Being Registered</h4>
          {entities.map((entity, index) => (
            <div key={index}>
              <h5>Entity {index + 1}</h5>
              <dl className={styles.verticalDataList}>
                <dt className="c-data-list__key">Name</dt>
                <dd className={styles.verticalDataValue}>{entity.ent_name}</dd>
                <dt className="c-data-list__key">FEIN</dt>
                <dd className={styles.verticalDataValue}>{entity.fein}</dd>
                <dt className="c-data-list__key">License Number</dt>
                <dd className={styles.verticalDataValue}>{entity.license}</dd>
                <dt className="c-data-list__key">NAIC Company Code</dt>
                <dd className={styles.verticalDataValue}>{entity.naic}</dd>
                <h6>Type of Plan</h6>
                <dd>
                  <dl className="c-data-list--is-vert c-data-list--is-wide">
                    <dt className="c-data-list__key">Types of Plans</dt>
                    {Object.entries(entity.plans_type).map(
                      ([plan_type, selected]) =>
                        selected && (
                          <dd
                            key={plan_type}
                            className={styles.verticalDataValue}
                          >
                            {plan_type}
                          </dd>
                        )
                    )}
                  </dl>
                </dd>
                <h6>File Submission</h6>
                <dd>
                  <dl className={styles.verticalDataList}>
                    <dt className="c-data-list__key">Types of Files</dt>
                    {Object.entries(entity.files_type).map(
                      ([file_type, selected]) =>
                        selected && (
                          <dd
                            key={file_type}
                            className={styles.verticalDataValue}
                          >
                            {file_type}
                          </dd>
                        )
                    )}
                  </dl>
                </dd>
                <h6>
                  Coverage Estimates{' '}
                  <small>
                    (Inclusive of all claims as of December 31 of previous
                    year.)
                  </small>
                </h6>
                <dt className="c-data-list__key">Total Covered Lives</dt>
                <dd className={styles.verticalDataValue}>
                  {entity.no_covered}
                </dd>
                <dt className="c-data-list__key">
                  Claims and Encounters Volume
                </dt>
                <dd className={styles.verticalDataValue}>
                  {entity.claim_and_enc_vol}
                </dd>
                <dt className="c-data-list__key">Total Claims Value (USD)</dt>
                <dd className={styles.verticalDataValue}>{entity.claim_val}</dd>
              </dl>
            </div>
          ))}

          <hr />
          <h4>Contact Information</h4>
          {contacts.map((contact, index) => (
            <div key={index}>
              <h5>Contact {index + 1}</h5>
              <dl className={styles.verticalDataList}>
                <dt className="c-data-list__key">Role</dt>
                <dd className={styles.verticalDataValue}>{contact.role}</dd>
                <dt className="c-data-list__key">Name</dt>
                <dd className={styles.verticalDataValue}>{contact.name}</dd>
                <dt className="c-data-list__key">Phone</dt>
                <dd className={styles.verticalDataValue}>{contact.phone}</dd>
                <dt className="c-data-list__key">Email</dt>
                <dd className={styles.verticalDataValue}>{contact.email}</dd>
                <dt>
                  <i>
                    Should {contact.notif ? '' : 'not'} receive system
                    notifications
                  </i>
                </dt>
              </dl>
            </div>
          ))}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ViewRegistrationModal;
