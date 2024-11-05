import React from 'react';
import { RegistrationList } from 'apcd-components/Registrations/RegistrationList';
import { useAdminRegistrations } from 'hooks/registrations';

export const AdminRegistrations: React.FC = () => {
  return (
    <RegistrationList isAdmin={true} useDataHook={useAdminRegistrations} />
  );
};
