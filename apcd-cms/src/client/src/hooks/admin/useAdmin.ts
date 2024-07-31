import { useQuery, UseQueryResult } from 'react-query';
import { fetchUtil } from 'utils/fetchUtil';
import { RegistrationResult, UserResult, SubmissionResult, ExceptionResult } from '.';

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

const getSubmissions = async (params: any) => {
  const url = `administration/list-submissions/api/`;
  const response = await fetchUtil({
    url,
    params,
  });
  return response.response;
};

export const useSubmissions = (
  status?: string,
  sort?: string,
  page?: number
): UseQueryResult<SubmissionResult> => {
  const params: { status?: string; sort?: string, page?:number } = {status, sort, page};
  const query = useQuery(['submissions', params], () =>
    getSubmissions(params)
  ) as UseQueryResult<SubmissionResult>;

  return { ...query };
};

const getExceptions = async (params: any) => {
  const url = `administration/list-exceptions/api/`;
  const response = await fetchUtil({
    url,
    params,
  });
  return response.response;
};

export const useExceptions = (
  status?: string,
  org?: string,
  page?: number
): UseQueryResult<ExceptionResult> => {
  const params: { status?: string; org?: string; page?: number } = {
    status,
    org,
    page,
  };
  const query = useQuery(['exceptions', params], () =>
    getExceptions(params)
  ) as UseQueryResult<ExceptionResult>;

  return { ...query };
};
