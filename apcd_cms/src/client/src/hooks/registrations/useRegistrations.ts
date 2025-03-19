import { useQuery, UseQueryResult } from 'react-query';
import { fetchUtil } from 'utils/fetchUtil';
import { RegistrationResult, RegistrationContent } from '.';

const getAdminRegistrations = async (params: any) => {
  const url = `/administration/list-registration-requests/api/`;
  const response = await fetchUtil({ url, params });
  return response.response;
};

export const useAdminRegistrations = (
  status?: string,
  org?: string,
  page?: number
): UseQueryResult<RegistrationResult> => {
  const params: { status?: string; org?: string; page?: number } = {
    status,
    org,
    page,
  };
  const query = useQuery(['admin-registrations', params], () =>
    getAdminRegistrations(params)
  ) as UseQueryResult<RegistrationResult>;

  return { ...query };
};

const getSubmitterRegistrations = async (params: any) => {
  const url = `/register/list-registration-requests/api/`;
  const response = await fetchUtil({ url, params });
  return response.response;
};

export const useSubmitterRegistrations = (
  status?: string,
  org?: string,
  page?: number
): UseQueryResult<RegistrationResult> => {
  const params: { status?: string; org?: string; page?: number } = {
    status,
    org,
    page,
  };
  const query = useQuery(['submitter-registrations', params], () =>
    getSubmitterRegistrations(params)
  ) as UseQueryResult<RegistrationResult>;

  return { ...query };
};

export const useSubmitterRegistration = (
  reg_id: number
): UseQueryResult<RegistrationResult> => {
  const params: { reg_id: number } = {
    reg_id,
  };
  const query = useQuery(['submitter-registration', params], () =>
    getSubmitterRegistrations(params)
  ) as UseQueryResult<RegistrationResult>;
  return { ...query };
};

export const useAdminRegistration = (
  reg_id: number
): UseQueryResult<RegistrationContent> => {
  const params: { reg_id: number } = {
    reg_id,
  };
  const query = useQuery(['admin-registration', params], () =>
    getAdminRegistrations(params)
  ) as UseQueryResult<RegistrationContent>;
  return { ...query };
};
