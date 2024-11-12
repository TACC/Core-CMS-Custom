import React, { useEffect, useMemo, useState } from 'react';
import { useListSubmissions, FileSubmissionRow } from 'hooks/submissions';
import { FileSubmissionLogsModal } from './ViewSubmissionsModal';
import { formatDate } from 'utils/dateUtil';

export const ViewFileSubmissions: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError, refetch } = useListSubmissions(
    status,
    sort,
    page
  );

  useEffect(() => {
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
    <div>
      <div className="filter-container">
        <div className="filter-content">
          {/* Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>
              <b>Filter by Status: </b>
            </span>
            <select
              id="statusFilter"
              className="status-filter"
              defaultValue={data?.selected_status} // Use defaultValue to set the initial selected value
              onChange={(e) => setStatus(e.target.value)}
            >
              {data?.filter_options.map((status, index) => (
                <option className="dropdown-text" key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <span>
              <b>Sort by: </b>
            </span>
            <select
              id="dateSort"
              className="status-filter"
              defaultValue=""
              onChange={(e) => setSort(e.target.value)}
            >
              {Object.entries(data?.sort_options || {}).map(
                (option: any, index: number) => (
                  <option
                    className="dropdown-text"
                    key={index}
                    value={option[0]}
                  >
                    {option[1]}
                  </option>
                )
              )}
            </select>
            {data?.selected_status || data?.selected_sort ? (
              <button onClick={clearSelections}>Clear Options</button>
            ) : null}
          </div>
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
          {data?.page.map((row: FileSubmissionRow, rowIndex: number) => (
            <tr key={rowIndex}>
              <td>{formatDate(row.received_timestamp)}</td>
              <td>{row.file_name}</td>
              <td>{row.outcome}</td>
              <td>{row.status}</td>
              <td>{row.updated_at}</td>
              <td>
                <FileSubmissionLogsModal
                  submission_logs={row.view_modal_content}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};