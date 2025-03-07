import React, { useEffect, useState } from 'react';
import { useSubmissions, useSubmissionFilters } from 'hooks/admin';
import {
  FileSubmissionRow,
  FileSubmissionLogsModalContent,
} from 'hooks/submissions';
import { Entities, useEntities } from 'hooks/entities';
import { ViewSubmissionLogsModal } from 'apcd-components/Submissions/ViewFileSubmissions';
import LoadingSpinner from 'core-components/LoadingSpinner';
import SectionMessage from 'core-components/SectionMessage';
import Button from 'core-components/Button';
import Paginator from 'core-components/Paginator';
import styles from './AdminSubmissions.module.css';
import { formatDate } from 'utils/dateUtil';
import { titleCase } from 'utils/stringUtil';
import { ClearOptionsButton } from 'apcd-components/ClearOptionsButton';

export const AdminSubmissions: React.FC = () => {
  const header = [
    'Received',
    'Entity Organization',
    'File Name',
    'Outcome',
    'Status',
    'Last Updated',
    'Payor Code',
    'Actions',
  ];
  const {
    data: filterData,
    isLoading: isFilterLoading,
    isError: isFilterError,
  } = useSubmissionFilters();

  const [status, setStatus] = useState<string>('In Process');
  const [sort, setSort] = useState<string>('Newest Received');
  const [page, setPage] = useState<number>(1);
  const [submitterId, setSubmitterId] = useState<string>('All');
  const [payorCode, setPayorCode] = useState<string>('All');
  const [submitterPayorCode, setSubmitterPayorCode] = useState<string>('All');
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
    isLoading: isSubmissionsLoading,
    isError: isSubmissionsError,
    refetch,
  } = useSubmissions(status, sort, submitterId, payorCode, page);

  useEffect(() => {
    if (submitterId && payorCode) {
      setSubmitterPayorCode(`${submitterId},${payorCode}`);
    } else {
      setSubmitterPayorCode('All');
    }
  }, [submitterId, payorCode]);

  useEffect(() => {
    refetch();
  }, [status, sort, page]);

  const {
    data: submitterData,
    isLoading: entitiesLoading,
    error: entitiesError,
  } = useEntities(true);

  if (isSubmissionsLoading) {
    return <LoadingSpinner />;
  }

  if (isSubmissionsError) {
    return (
      <SectionMessage type="error">
        There was an error loading the page.{' '}
        <a href="/workbench/dashboard/tickets/create" className="wb-link">
          Please submit a ticket.
        </a>
      </SectionMessage>
    );
  }

  const clearSelections = () => {
    setStatus('In Process');
    setSort('Newest Received');
    setSubmitterId('All');
    setPayorCode('All');
    setPage(1);
  };

  return (
    <div>
      <h1>View File Submissions</h1>
      <hr />
      <p>All submissions by organizations</p>
      <hr />
      <div className="filter-container">
        <div className="filter-content">
          <span>
            <b>Filter by Status: </b>
          </span>
          <select
            id="statusFilter"
            className="status-filter"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            {filterData?.status_options?.map((option: any, index: number) => (
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
          <span>
            <b>Payor Code: </b>
          </span>
          <select
            id="payorFilter"
            className="status-filter"
            value={submitterPayorCode}
            onChange={(e) => {
              if (e.target.value === 'All') {
                setSubmitterId('All');
                setPayorCode('All');
              } else {
                const [submitterId, payorCode] = e.target.value.split(',');
                setSubmitterId(submitterId);
                setPayorCode(payorCode);
              }
            }}
          >
            <option>All</option>
            {submitterData?.submitters?.map((submitter: Entities) => (
              <option
                value={`${submitter.submitter_id},${submitter.payor_code}`}
                key={`${submitter.submitter_id},${submitter.payor_code}`}
              >
                {submitter.org_name} - Payor Code: {submitter.payor_code}
              </option>
            ))}
          </select>
          {status !== 'In Process' ||
          sort !== 'Newest Received' ||
          submitterId !== 'All' ||
          payorCode !== 'All' ? (
            <ClearOptionsButton onClick={clearSelections} />
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
          {submissionData?.page && submissionData.page.length > 0 ? (
            submissionData?.page.map(
              (row: FileSubmissionRow, rowIndex: number) => (
                <tr key={rowIndex}>
                  <td>{formatDate(row.received_timestamp)}</td>
                  <td>{titleCase(row.entity_name)}</td>
                  <td>{row.file_name}</td>
                  <td>{titleCase(row.outcome)}</td>
                  <td>{titleCase(row.status)}</td>
                  <td>{formatDate(row.updated_at)}</td>
                  <td>{row.org_name}</td>
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
            )
          ) : (
            <tr>
              <td colSpan={header.length} style={{ textAlign: 'center' }}>
                No Data available
              </td>
            </tr>
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
        <ViewSubmissionLogsModal
          isOpen={viewModalOpen}
          parentToggle={closeModal}
          submission_logs={selectedSubmissionLog}
          isAdminUser={true}
        />
      )}
    </div>
  );
};
