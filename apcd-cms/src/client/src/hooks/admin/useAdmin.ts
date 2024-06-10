import { useQuery, UseQueryResult } from 'react-query';
import { fetchUtil } from 'utils/fetchUtil';
import { RegistrationResult, SubmissionResult } from '.';

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

const getSubmissions = async (params: any) => {
  const url = `administration/list-submissions/api/`;
  const response = await fetchUtil({
    url,
    params,
  });
  return response.response;
};

export const useSubmissions = (
  params: any
): UseQueryResult<SubmissionResult> => {
  const query = useQuery(['submissions', params], () =>
    getSubmissions(params)
  ) as UseQueryResult<SubmissionResult>;

  return { ...query };
};
