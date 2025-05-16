import { FileSubmissionLogsModalContent } from 'hooks/submissions';
import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { titleCase } from 'utils/stringUtil';
import { Link } from 'react-router-dom';

interface ViewSubmissionLogsModalProps {
  submission_logs: FileSubmissionLogsModalContent[];
  isOpen: boolean;
  parentToggle: () => void;
  isAdminUser?: boolean;
}

export const ViewSubmissionLogsModal: React.FC<
  ViewSubmissionLogsModalProps
> = ({ submission_logs, isOpen, parentToggle, isAdminUser = false }) => {
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
                submission_logs.map((log: any, index: number) => (
                  <div className="modal-section" key={index}>
                    <dl className="c-data-list--is-vert c-data-list--is-wide">
                      <dt className="c-data-list__key">Log ID</dt>
                      <dd className="c-data-list__value">{log.log_id}</dd>
                      <dt className="c-data-list__key">Entity Organization</dt>
                      <dd className="c-data-list__value">
                        {titleCase(log.entity_name)}
                      </dd>
                      <dt className="c-data-list__key">File Type</dt>
                      <dd className="c-data-list__value">
                        {titleCase(log.file_type)}
                      </dd>
                      <dt className="c-data-list__key">Validation Suite</dt>
                      <dd className="c-data-list__value">
                        {titleCase(log.validation_suite)}
                      </dd>
                      <dt className="c-data-list__key">Outcome</dt>
                      <dd className="c-data-list__value">
                        {titleCase(log.outcome)}
                      </dd>
                      <dt className="c-data-list__key">HTML Log</dt>
                      <dd className="c-data-list__value">
                        {log.has_html_log === 1 ? (
                          <Link
                            to={`${
                              isAdminUser ? 'administration' : 'submissions'
                            }/view_log?log_type=html&log_id=${log.log_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download
                          </Link>
                        ) : (
                            <div className="modal-section">
                            No available logs
                            </div>
                            )}
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
