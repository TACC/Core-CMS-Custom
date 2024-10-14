import { useQuery, UseQueryResult } from 'react-query';
import { fetchUtil } from 'utils/fetchUtil';
import { cdlObject } from '.';

const getCDLS = async (file_type: string | undefined) => {
  const url = `common_api/cdls/${file_type}`;
  const response = await fetchUtil({
    url,
  });
  return response;
};

export const useCDLs = (
  file_type: string | undefined
): UseQueryResult<cdlObject> => {
  const query = useQuery(['cdls', file_type], () => getCDLS(file_type), {
    enabled: !!file_type,
  }) as UseQueryResult<cdlObject>;

  return { ...query };
};
