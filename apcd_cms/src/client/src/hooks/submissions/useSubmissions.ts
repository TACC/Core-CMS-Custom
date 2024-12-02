import { useQuery, UseQueryResult } from 'react-query';
import { fetchUtil } from 'utils/fetchUtil';
import { FileSubmissionResult } from '.';
import { FilterOptions } from 'hooks/admin'; //May want to refactor where this hook lives

const getSubmissionFilters = async () => {
  const url = 'submissions/list-submissions/api/options';
  const response = await fetchUtil({ url });
  return response;
};

export const useSubmissionFilters = (): UseQueryResult<FilterOptions> => {
  const query = useQuery(['submissionFilters'], () => getSubmissionFilters(), {
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  }) as UseQueryResult<FilterOptions>;

  return { ...query };
};

const getListSubmissions = async (params: any) => {
  const url = `submissions/list-submissions/api/`;
  const response = await fetchUtil({
    url,
    params,
  });
  return response.response;
};

export const useListSubmissions = (
  status?: string,
  sort?: string,
  submitterId?: string,
  payorCode?: string,
  page?: number
): UseQueryResult<FileSubmissionResult> => {
  const params: {
    status?: string;
    sort?: string;
    submitterId?: string;
    payorCode?: string;
    page?: number;
  } = {
    status,
    sort,
    submitterId,
    payorCode,
    page,
  };
  const query = useQuery(['list_submissions', params], () =>
    getListSubmissions(params)
  ) as UseQueryResult<FileSubmissionResult>;

  return { ...query };
};
