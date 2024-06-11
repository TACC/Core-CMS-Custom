import React, { useEffect, useMemo } from 'react';
import { useExtensions, ExtensionRow } from 'hooks/admin';

export const AdminExtensions: React.FC = () => {
  const { data, isLoading, isError } = useExtensions({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <table id="extensionTable" className="extension-table">
      <thead>
        <tr>
          {data?.header.map((columnName: string, index: number) => (
            <th key={index}>{columnName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.page.map((row: ExtensionRow, rowIndex: number) => (
          <tr key={rowIndex}>
            <td>{row.created_at}</td>
            <td>{row.entity_name}</td>
            <td>{row.requestor_name}</td>
            <td>{row.extension_type}</td>
            <td>{row.outcome}</td>
            <td>{row.status}</td>
            <td>{row.approved_expiration_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
