import React, { useEffect, useMemo, useState } from 'react';
import {
  useListSubmissions,
  FileSubmissionRow,
  useSubmissionFilters,
  FileSubmissionLogsModalContent,
} from 'hooks/submissions';
import LoadingSpinner from 'core-components/LoadingSpinner';
import Button from 'core-components/Button';
import SectionMessage from 'core-components/SectionMessage';
import Paginator from 'core-components/Paginator';
import styles from './ViewSubmissions.module.css';
import { Link } from 'react-router-dom';
import { FileSubmissionLogsModal } from './ViewSubmissionsModal';
import { formatDate } from 'utils/dateUtil';
import { titleCase } from 'utils/stringUtil';

export const ViewFileSubmissions: React.FC = () => {
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
    useState<FileSubmissionRow | null>(null);
  const [selectedSubmissionLog, setSelectedSubmissionLog] = useState<
    FileSubmissionLogsModalContent[]
  >([]);

  const closeModal = () => {
    setViewModalOpen(false);
    setSelectedSubmission(null);
  };

  const {
    data: submissionData,
    isLoading: isSubmissionLoading,
    isError: isSubmissionError,
    refetch,
  } = useListSubmissions(status, sort, page);

  useEffect(() => {
    refetch();
  }, [status, sort, page]);

  if (isSubmissionLoading) {
    return <LoadingSpinner />;
  }

  if (isSubmissionError) {
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
    setSort('Newest Received');
    setPage(1);
  };

  return (
    <div>
      <div className="filter-container">
        <div className="filter-content">
          {/* Filter */}
          <span>
            <b>Filter by Status: </b>
          </span>
          <select
            id="statusFilter"
            className="status-filter"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {filterData?.status_options.map((option: any, index: number) => (
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
              <option className="dropdown-text" key={index} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
          {status !== 'All' || sort !== 'Newest Received' ? (
            <button onClick={clearSelections}>Clear Options</button>
          ) : null}
        </div>
      </div>
      <table id="submissionTable" className="submission-table">
        <thead>
          <tr>
            {header.map((columnName: string, index: number) => (
              <th key={index}>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {submissionData?.page.map(
            (row: FileSubmissionRow, rowIndex: number) => (
              <tr key={rowIndex}>
                <td>{formatDate(row.received_timestamp)}</td>
                <td>{titleCase(row.entity_name)}</td>
                <td>{titleCase(row.file_name)}</td>
                <td>{titleCase(row.outcome)}</td>
                <td>{titleCase(row.status)}</td>
                <td>{formatDate(row.updated_at)}</td>
                <td>
                  <Button
                    type="link"
                    onClick={() => {
                      setSelectedSubmission(row);
                      setSelectedSubmissionLog(row?.view_modal_content);
                      setViewModalOpen(true);
                    }}
                  >
                    View Logs
                  </Button>
                </td>
              </tr>
            )
          )}
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
        <FileSubmissionLogsModal
          isOpen={viewModalOpen}
          parentToggle={closeModal}
          submission_logs={selectedSubmissionLog}
        />
      )}
    </div>
  );
};
