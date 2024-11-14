import { FileSubmissionLogsModalContent } from 'hooks/submissions';
import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { titleCase } from 'utils/stringUtil';

interface ViewSubmissionLogsModalProps {
  submission_logs: FileSubmissionLogsModalContent[];
  isOpen: boolean;
  parentToggle: () => void;
}

export const FileSubmissionLogsModal: React.FC<
  ViewSubmissionLogsModalProps
> = ({ submission_logs, isOpen, parentToggle }) => {
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
              {submission_logs.length > 0 ? (
                submission_logs.map((log, index) => (
                  <div className="modal-section" key={index}>
                    <dl className="c-data-list--is-vert c-data-list--is-wide">
                      <dt className="c-data-list__key">Log ID</dt>
                      <dd className="c-data-list__value">{log.log_id}</dd>
                      <dt className="c-data-list__key">Submission ID</dt>
                      <dd className="c-data-list__value">
                        {log.submission_id}
                      </dd>
                      <dt className="c-data-list__key">File Type</dt>
                      <dd className="c-data-list__value">{log.file_type}</dd>
                      <dt className="c-data-list__key">Validation Suite</dt>
                      <dd className="c-data-list__value">
                        {titleCase(log.validation_suite)}
                      </dd>
                      <dt className="c-data-list__key">Outcome</dt>
                      <dd className="c-data-list__value">
                        {titleCase(log.outcome)}
                      </dd>
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
