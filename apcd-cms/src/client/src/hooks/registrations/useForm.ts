import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { fetchUtil } from 'utils/fetchUtil';
import { RegFormData, RegistrationFormValues, RegistrationContent } from '.';

const getRegFormData = async (reg_id: string | null) => {
  const url = `register/request-to-submit/api/?reg_id=${reg_id}/`;
  const response = await fetchUtil({
    url,
  });
  return response.response;
};

export const useRegFormData = (
  reg_id: string | null
): UseQueryResult<RegistrationContent> => {
  const query = useQuery(['reg_form', reg_id], () => getRegFormData(reg_id), {
    enabled: !!reg_id,
  }) as UseQueryResult<RegistrationContent>;

  return { ...query };
};

const postRegistration = async (url: string, body: RegistrationFormValues) => {
  const response = await fetchUtil({
    url,
    method: `POST`,
    body: body,
  });
  return response;
};

export function usePostRegistration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      url,
      body,
    }: {
      url: string;
      body: RegistrationFormValues;
    }) => {
      return postRegistration(url, body);
    },
    onError: (err: Error) => {
      console.log(err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['submitter-registrations', 'admin-registrations'],
      });
    },
  });
}