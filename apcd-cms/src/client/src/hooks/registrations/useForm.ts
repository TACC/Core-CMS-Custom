import { useQuery, UseQueryResult } from 'react-query';
import { fetchUtil } from 'utils/fetchUtil';
import { RegFormData } from '.';

const getRegFormData = async (params: any) => {
    const url = 'register/request-to-submit/api';
    const response = await fetchUtil({
        url,
        params,
    });
    return response.response;
};

export const useFormData = (
    params: any
): UseQueryResult<RegFormData> => {
    const query = useQuery(['reg_form', params], () =>
    getRegFormData(params)
  ) as UseQueryResult<RegFormData>;

  return { ...query };
}