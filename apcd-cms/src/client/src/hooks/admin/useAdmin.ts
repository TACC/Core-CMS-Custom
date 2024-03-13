import { useQuery, UseQueryResult } from 'react-query';
import { fetchUtil } from 'utils/fetchUtil';
import { RegistrationResult } from '.';

const getRegistrations = async (params: any) => {
  const url = `administration/list-registration-requests/api/`;
  const response = await fetchUtil({
    url,
    params,
  });
  return response.response;
};

export const useRegistrations = (
  status?: string, 
  org?: string,
  page?:number,
): UseQueryResult<RegistrationResult> => {
  const params: { status?: string; org?: string, page?:number } = {status, org, page};
  const query = useQuery(['registrations', params], () =>
    getRegistrations(params)
  ) as UseQueryResult<RegistrationResult>;

  return { ...query };
};
