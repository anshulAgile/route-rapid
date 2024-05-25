import useFetch from '..';
import { settingsAPI } from '../../../services/api/settings';
import { settingsKeys } from '../queryKeys';

export const usePersonalInfo = (id: any) => {
  return useFetch({
    queryKey: settingsKeys.personalInfo(id),
    apiFunction: () => settingsAPI.getPersonalInfo(id),
    queryOptions: { staleTime: 5 * 60 * 1000 }
  });
};
