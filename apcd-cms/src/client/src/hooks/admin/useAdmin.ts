import { useQuery, UseQueryResult } from 'react-query';
import { fetchUtil } from 'utils/fetchUtil';
import { RegistrationResult, ExtensionResult } from '.';

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

const getExtensions = async (params: any) => {
  const url = `administration/list-extensions/api/`;
  const response = await fetchUtil({
    url,
    params,
  });
  return response.response;
};

export const useExtensions = (
  params: any
): UseQueryResult<ExtensionResult> => {
  const query = useQuery(['extensions', params], () =>
    getExtensions(params)
  ) as UseQueryResult<ExtensionResult>;

  return { ...query };
};
