import { useQuery, UseQueryResult } from 'react-query';
import { fetchUtil } from 'utils/fetchUtil';
import { SubmitterEntityData, SubmitterDataPeriods } from '.';

const getEntities = async () => {
  const url = `common_api/entities/`;
  const response = await fetchUtil({
    url,
  });
  return response.response;
};

export const useEntities = (): UseQueryResult<SubmitterEntityData> => {
  const query = useQuery(['entities'], () =>
    getEntities()
  ) as UseQueryResult<SubmitterEntityData>;

  return { ...query };
};

const getSubmitterDataPeriods = async (params: any) => {
  const url = `common_api/data_periods/`;
  const response = await fetchUtil({ url, params });
  return response.response;
};

export const useSubmitterDataPeriods = (
  submitter_id: string | undefined
): UseQueryResult<SubmitterDataPeriods> => {
  const params: { submitter_id?: string } = { submitter_id };
  const query = useQuery(
    ['submitterDataPeriods'],
    () => getSubmitterDataPeriods(params),
    {
      enabled: submitter_id !== undefined && submitter_id !== null, // Allow `0` as valid
    }
  ) as UseQueryResult<SubmitterDataPeriods>;

  return { ...query };
};
