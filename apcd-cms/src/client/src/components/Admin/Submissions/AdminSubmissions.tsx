import React, { useEffect, useMemo, useState } from 'react';
import {
  useSubmissions,
  SubmissionRow,
  useSubmissionFilters,
  SubmissionLogsModalContent,
} from 'hooks/admin';
import { ViewSubmissionLogsModal } from './ViewSubmissionLogsModal';
import LoadingSpinner from 'core-components/LoadingSpinner';
import SectionMessage from 'core-components/SectionMessage';
import Button from 'core-components/Button';
import Paginator from 'core-components/Paginator';
import { Link } from 'react-router-dom';
import styles from './AdminSubmissions.module.css';
import { formatDate } from 'utils/dateUtil';
import { titleCase } from 'utils/stringUtil';

export const AdminSubmissions: React.FC = () => {
  const header = [
    'Received',
    'Entity Organization',
    'File Name',
    'Outcome',
    'Status',
    'Last Updated',
    'Actions',
  ];
  const {
    data: filterData,
    isLoading: isFilterLoading,
    isError: isFilterError,
  } = useSubmissionFilters();
  const [status, setStatus] = useState<string>('All');
  const [sort, setSort] = useState<string>('Newest Received');
  const [page, setPage] = useState<number>(1);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] =
    useState<SubmissionRow | null>(null);

  const [selectedSubmissionLog, setSelectedSubmissionLog] =
    useState<SubmissionLogsModalContent[] | null>(null);
  console.log(selectedSubmissionLog);
  const closeModal = () => {
    setViewModalOpen(false);
    setSelectedSubmission(null);
  };

  const {
    data: submissionData,
    isLoading: isSubmissionsLoading,
    isError: isSubmissionsError,
    refetch,
  } = useSubmissions(status, sort, page);

  useEffect(() => {
    refetch();
  }, [status, sort, page]);

  if (isSubmissionsLoading) {
    return <LoadingSpinner />;
  }

  if (isSubmissionsError) {
    return (
      <SectionMessage type="error">
        There was an error loading the page.{' '}
        <Link to="/workbench/dashboard/tickets/create" className="wb-link">
          Please submit a ticket.
        </Link>
      </SectionMessage>
    );
  }

  const clearSelections = () => {
    setStatus('All');
    setSort('Newest Recieved');
    setPage(1);
  };

  return (
    <div>
      <h1>View Submissions</h1>
      <hr />
      <p>All completed submissions by organizations</p>
      <hr />
      <div className="filter-container">
        <div className="filter-content">
          <span>
            <b>Filter by Status: </b>
          </span>
          <select
            id="statusFilter"
            className="status-filter"
            value={status === '' ? filterData?.status_options[0] : status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {filterData?.status_options?.map((option: string, index: number) => (
              <option className="dropdown-text" key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span>
            <b>Sort by: </b>
          </span>
          <select
            id="dateSort"
            className="status-filter"
            value={sort === '' ? filterData?.sort_options[0] : sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {filterData?.sort_options.map((option: any, index: number) => (
              <option
                className="dropdown-text"
                key={index}
                value={option.name}
              >
                {option.name}
              </option>
            ))}
          </select>
          {submissionData?.selected_status || submissionData?.selected_sort ? (
            <button onClick={clearSelections}>Clear Options</button>
          ) : null}
        </div>
      </div>
      <table id="submissionTable" className={styles.submissionTable}>
        <thead>
          <tr>
            {header.map((columnName: string, index: number) => (
              <th key={index}>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {submissionData?.page.map((row: SubmissionRow, rowIndex: number) => (
            <tr key={rowIndex}>
              <td>{formatDate(row.received_timestamp)}</td>
              <td>{titleCase(row.entity_name)}</td>
              <td>{row.file_name}</td>
              <td>{titleCase(row.outcome)}</td>
              <td>{titleCase(row.status)}</td>
              <td>{formatDate(row.updated_at)}</td>
              <td>
                <Button
                  type="link"
                  onClick={() => {
                    setSelectedSubmission(row); // Set selected submission here
                    setSelectedSubmissionLog(row?.view_modal_content); // Set the logs (assuming logs are part of row data)
                    setViewModalOpen(true);
                  }}
                >
                  View Logs
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.paginatorContainer}>
        <Paginator
          pages={submissionData?.total_pages ?? 0}
          current={submissionData?.page_num ?? 0}
          callback={setPage}
        />
      </div>
      {selectedSubmission && viewModalOpen && (
        <ViewSubmissionLogsModal
          isOpen={viewModalOpen}
          parentToggle={closeModal}
          submission_logs={selectedSubmissionLog}
        />
      )}
    </div>
  );
};
