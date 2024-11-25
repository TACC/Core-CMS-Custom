import React from 'react';
import { RegistrationList } from 'apcd-components/Registrations/RegistrationList';
import { useSubmitterRegistrations } from 'hooks/registrations';

export const SubmitterRegistrationList: React.FC = () => {
  return <RegistrationList useDataHook={useSubmitterRegistrations} />;
};
