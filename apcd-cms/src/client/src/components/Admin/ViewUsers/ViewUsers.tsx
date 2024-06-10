import React from 'react';
import { useUsers, UserRow } from 'hooks/admin';

export const ViewUsers: React.FC = () => {
  const { data, isLoading, isError } = useUsers({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <table id="viewUserTable" className="view-user-table">
      <thead>
        <tr>
          {data?.header.map((columnName: string, index: number) => (
            <th key={index}>{columnName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.page.map((row: UserRow, rowIndex: number) => (
          <tr key={rowIndex}>
            <td>{row.user_id}</td>
            <td>{row.user_name}</td>
            <td>{row.entity_name}</td>
            <td>{row.role_name}</td>
            <td>{row.status}</td>
            <td>{row.user_number}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
