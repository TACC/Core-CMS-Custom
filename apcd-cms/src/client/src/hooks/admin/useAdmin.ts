import { useQuery, UseQueryResult } from 'react-query';
import { fetchUtil } from 'utils/fetchUtil';
import { RegistrationResult, UserResult } from '.';

const getRegistrations = async (params: any) => {
  const url = `administration/list-registration-requests/api/`;
  const response = await fetchUtil({
    url,
    params,
  });
  return response.response;
};

export const useRegistrations = (
  params: any
): UseQueryResult<RegistrationResult> => {
  const query = useQuery(['registrations', params], () =>
    getRegistrations(params)
  ) as UseQueryResult<RegistrationResult>;

  return { ...query };
};

export const getUsers = async (params: any) => {
  const url = `administration/view_users/api/`;
  const response = await fetchUtil({
    url,
    params,
  });
  return response.response;
};

export const useUsers = (
  params: any
): UseQueryResult<UserResult> => {
  const query = useQuery(['view_users', params], () =>
    getUsers(params)
  ) as UseQueryResult<UserResult>;

  return { ...query };
};