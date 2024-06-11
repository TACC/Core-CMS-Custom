import { useQuery, UseQueryResult } from 'react-query';
import { fetchUtil } from 'utils/fetchUtil';
import { RegistrationResult, UserResult } from '.';

const getRegistrations = async (params: any) => {
  const url = `/administration/list-registration-requests/api/`;
  const response = await fetchUtil({ url, params });
  return response.response;
};

export const useRegistrations = (
  params: any
): UseQueryResult<RegistrationResult> => {
  return useQuery(['registrations', params], () => getRegistrations(params));
};

const getUsers = async (params: any) => {
  const url = `/administration/view-users/api/`;
  const response = await fetchUtil({ url, params });
  return response.response;
};

export const useUsers = (
  params: any
): UseQueryResult<UserResult> => {
  return useQuery(['view_users', params], () => getUsers(params));
};