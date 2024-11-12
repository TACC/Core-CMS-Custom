import { useQuery, UseQueryResult } from 'react-query';
import { fetchUtil } from 'utils/fetchUtil';
import {
  ExtensionResult,
  UserResult,
  SubmissionResult,
  ExceptionResult,
  FilterOptions,
} from '.';

const getUsers = async (params: any) => {
  const url = `/administration/view-users/api/`;
  const response = await fetchUtil({ url, params });
  return response.response;
};

export const useUsers = (
  status?: string,
  org?: string,
  page?: number
): UseQueryResult<UserResult> => {
  const params: { status?: string; org?: string; page?: number } = {
    status,
    org,
    page,
  };
  const query = useQuery(['users', params], () =>
    getUsers(params)
  ) as UseQueryResult<UserResult>;

  return { ...query };
};

const getUsersFilters = async () => {
  const url = `/administration/view-users/api/options`;
  const response = await fetchUtil({ url });
  return response;
};

export const useUserFilters = (): UseQueryResult<FilterOptions> => {
  const query = useQuery(['userfilters'], () => getUsersFilters(), {
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  }) as UseQueryResult<FilterOptions>;

  return { ...query };
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
  const params: { status?: string; sort?: string; page?: number } = {
    status,
    sort,
    page,
  };
  const query = useQuery(['submissions', params], () =>
    getSubmissions(params)
  ) as UseQueryResult<SubmissionResult>;

  return { ...query };
};

const getExtensions = async (params: any) => {
  const url = `administration/list-extensions/api/`;
  const response = await fetchUtil({
    url,
    params,
  });
  return response.response;
};

export const useExtensions = (
  status?: string,
  org?: string,
  page?: number
): UseQueryResult<ExtensionResult> => {
  const params: { status?: string; org?: string; page?: number } = {
    status,
    org,
    page,
  };
  const query = useQuery(['extensions', params], () =>
    getExtensions(params)
  ) as UseQueryResult<ExtensionResult>;

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
