import React, { useEffect, useMemo } from 'react';
import { useSubmissions, SubmissionRow } from 'hooks/admin';

export const AdminSubmissions: React.FC = () => {
  const { data, isLoading, isError } = useSubmissions({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
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
            <td>{row.submission_id}</td>
            <td>{row.submitter_id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
