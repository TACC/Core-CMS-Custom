import { useQuery, UseQueryResult } from 'react-query';
import { fetchUtil } from 'utils/fetchUtil';
import { SubmitterEntityData } from '.';

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
