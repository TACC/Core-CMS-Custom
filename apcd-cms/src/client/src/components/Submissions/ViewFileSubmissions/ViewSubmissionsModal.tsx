import { FileSubmissionLogsModalContent } from 'hooks/submissions';
import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Button from 'core-components/Button';
import styles from './Submissions.css';

interface ViewSubmissionLogsModalProps {
  submission_logs: FileSubmissionLogsModalContent[];
}

export const FileSubmissionLogsModal: React.FC<
  ViewSubmissionLogsModalProps
> = ({ submission_logs }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );

  return (
    <>
      <Button type="link" onClick={() => toggle()}>
        View Logs
      </Button>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        size="lg"
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={toggle} close={closeBtn}>
          <h5>View Logs</h5>
        </ModalHeader>
        <ModalBody>
          <div>
            <dl>
              <h4>Logs</h4>
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
