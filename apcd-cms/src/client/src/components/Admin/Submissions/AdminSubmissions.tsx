import React, { useEffect, useMemo, useState } from 'react';
import { useSubmissions, SubmissionRow } from 'hooks/admin';
import { ViewSubmissionLogsModal } from './ViewSubmissionLogsModal';
import Paginator from 'core-components/Paginator';
import styles from './AdminSubmissions.module.css';

export const AdminSubmissions: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError, refetch } = useSubmissions(
    status,
    sort,
    page
  );

  useEffect(() => {
    console.log('useEffect', status, sort, page);
    refetch();
  }, [status, sort, page]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const clearSelections = () => {
    setStatus('');
    setSort('');
    setPage(1);
  };

  return (
    <>
      <div className="filter-container">
        <div className="filter-content">
          <span>
            <b>Filter by Status: </b>
          </span>
          <select
            id="statusFilter"
            className="status-filter"
            value={status === '' ? data?.status_options[0] : status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {data?.status_options.map((option: string, index: number) => (
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
            value={sort === '' ? data?.sort_options[0].value : sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {data?.sort_options.map((option: any, index: number) => (
              <option
                className="dropdown-text"
                key={index}
                value={option.value}
              >
                {option.name}
              </option>
            ))}
          </select>
          {data?.selected_status || data?.selected_sort ? (
            <button onClick={clearSelections}>Clear Options</button>
          ) : null}
        </div>
      </div>
      <table id="submissionTable" className="submission-table">
        <thead>
          <tr>
            {data?.header.map((columnName: string, index: number) => (
              <th key={index}>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.page.map((row: SubmissionRow, rowIndex: number) => (
            <tr key={rowIndex}>
              <td>{row.received_timestamp}</td>
              <td>{row.entity_name}</td>
              <td>{row.file_name}</td>
              <td>{row.outcome}</td>
              <td>{row.status}</td>
              <td>{row.updated_at}</td>
              <td>
                <ViewSubmissionLogsModal
                  submission_logs={row.view_modal_content}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.paginatorContainer}>
        <Paginator
          pages={data?.total_pages ?? 0}
          current={data?.page_num ?? 0}
          callback={setPage}
        />
      </div>
    </>
  );
};
