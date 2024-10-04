import { useQuery, UseQueryResult } from 'react-query';
import { fetchUtil } from 'utils/fetchUtil';
import {

  FileSubmissionResult,
  
} from '.';

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
    page?: number
  ): UseQueryResult<FileSubmissionResult> => {
    const params: { status?: string; sort?: string; page?: number } = {
      status,
      sort,
      page,
    };
    const query = useQuery(['list_submissions', params], () =>
      getListSubmissions(params)
    ) as UseQueryResult<FileSubmissionResult>;
  
    return { ...query };
  };
