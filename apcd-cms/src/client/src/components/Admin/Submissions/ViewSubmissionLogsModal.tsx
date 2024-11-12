import { SubmissionLogsModalContent } from 'hooks/admin';
import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Button from 'core-components/Button';
import styles from './Submissions.css';

interface ViewSubmissionLogsModalProps {
  submission_logs: SubmissionLogsModalContent | null;
  isOpen: boolean;
  parentToggle: () => void;
}

export const ViewSubmissionLogsModal: React.FC<
  ViewSubmissionLogsModalProps
> = ({ submission_logs, isOpen, parentToggle }) => {
  console.log(submission_logs);
  const closeBtn = (
    <button className="close" onClick={parentToggle} type="button">
      &times;
    </button>
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={parentToggle}
        size="lg"
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={parentToggle} close={closeBtn}>
          View Logs
        </ModalHeader>
        <ModalBody>
          <div>
            <dl>
              <h4>Logs</h4>
              {submission_logs ? (
                submission_logs.map((log: any, index: number) => (
                  <div className="modal-section" key={index}>
                    <dl className="c-data-list--is-vert c-data-list--is-wide">
                      <dt className="c-data-list__key">Log ID</dt>
                      <dd className="c-data-list__value">{log.log_id}</dd>
                      <dt className="c-data-list__key">Entity Organization</dt>
                      <dd className="c-data-list__value">{log.entity_name}</dd>
                      <dt className="c-data-list__key">File Type</dt>
                      <dd className="c-data-list__value">{log.file_type}</dd>
                      <dt className="c-data-list__key">Validation Suite</dt>
                      <dd className="c-data-list__value">
                        {log.validation_suite}
                      </dd>
                      <dt className="c-data-list__key">Outcome</dt>
                      <dd className="c-data-list__value">{log.outcome}</dd>
                    </dl>
                    <hr />
                  </div>
                ))
              ) : (
                <div className="modal-section">
                  No logs found for this submission
                </div>
              )}
            </dl>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
