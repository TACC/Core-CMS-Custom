import React, { useEffect, useMemo } from 'react';
import { useRegistrations, RegistrationRow } from 'hooks/admin';

export const AdminRegistrations: React.FC = () => {
  const { data, isLoading, isError } = useRegistrations({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <table id="registrationTable" className="registration-table">
      <thead>
        <tr>
          {data?.header.map((columnName: string, index: number) => (
            <th key={index}>{columnName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.page.map((row: RegistrationRow, rowIndex: number) => (
          <tr key={rowIndex}>
            <td>{row.biz_name}</td>
            <td>{row.year}</td>
            <td>{row.type}</td>
            <td>{row.location}</td>
            <td>{row.reg_status}</td>
            <td>{row.reg_id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
