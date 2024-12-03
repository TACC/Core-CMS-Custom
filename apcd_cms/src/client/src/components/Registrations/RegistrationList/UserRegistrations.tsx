import React from 'react';
import { RegistrationList } from './RegistrationList';
import { useSubmitterRegistrations } from 'hooks/registrations';

const mockData = {
  header: [
    'User',
    'Year',
    'Type',
    'Location',
    'Registration Status',
    'Actions',
  ],
  page: [
    {
      user: 'Username1',
      year: 2021,
      type: 'Type A',
      location: 'Location A',
      reg_status: 'Active',
      reg_id: 1,
    },
    {
      user: 'Username3',
      year: 2020,
      type: 'Type B',
      location: 'Location B',
      reg_status: 'Inactive',
      reg_id: 2,
    },
    {
      user: 'Username3',
      year: null,
      type: 'Type C',
      location: 'Location C',
      reg_status: null,
      reg_id: 3,
    },
  ],
};

export const UserRegistrations = () => {
  const data = mockData;
  const isAdmin = false;

  const openAction = (
    e: React.ChangeEvent<HTMLSelectElement>,
    regId: number
  ) => {
    console.log(`Action: ${e.target.value}, Registration ID: ${regId}`);
  };

  return (
    <RegistrationList
      isAdmin={false}
      byUser={true}
      useDataHook={useSubmitterRegistrations}
    >
      {' '}
    </RegistrationList>
    // <table>
    //   <thead>
    //     <tr>
    //       {data?.header.map((columnName: string, index: number) => (
    //         <th key={index}>{columnName}</th>
    //       ))}
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {data?.page && data.page.length > 0 ? (
    //       data.page.map((row, rowIndex) => (
    //         <tr key={rowIndex}>
    //           <td>{row.user}</td>
    //           <td>{row.year ? row.year : 'None'}</td>
    //           <td>{row.type}</td>
    //           <td>{row.location}</td>
    //           <td>{row.reg_status ? row.reg_status : 'None'}</td>
    //           <td>
    //             <select
    //               id={`actionsDropdown_${row.reg_id}`}
    //               defaultValue=""
    //               className="status-filter"
    //               onChange={(e) => openAction(e, row.reg_id)}
    //             >
    //               <option value="">Select Action</option>
    //               <option value="viewRegistration">View Record</option>
    //               {isAdmin ? (
    //                 <option value="editRegistration">Edit Record</option>
    //               ) : (
    //                 <option value="renewRegistration">
    //                   Renew Registration
    //                 </option>
    //               )}
    //             </select>
    //           </td>
    //         </tr>
    //       ))
    //     ) : (
    //       <tr>
    //         <td colSpan={6} style={{ textAlign: 'center' }}>
    //           No Data available
    //         </td>
    //       </tr>
    //     )}
    //   </tbody>
    // </table>
  );
};

export default UserRegistrations;
