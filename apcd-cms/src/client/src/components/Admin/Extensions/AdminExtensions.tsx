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
            <td>{row.created}</td>
            <td>{row.org_name}</td>
            <td>{row.requestor}</td>
            <td>{row.type}</td>
            <td>{row.ext_outcome}</td>
            <td>{row.ext_status}</td>
            <td>{row.approved_expiration_date}</td>
            <td className="modal-cell">
                <select id={`actionsDropdown_${row.ext_id}`} onChange={`openAction('${row.ext_id}')`}>
                      <option value="">Select Action</option>
                      <option value="viewAdminExtensions">View Record</option>
                      <option value="editExtension">Edit Record</option>
                </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
