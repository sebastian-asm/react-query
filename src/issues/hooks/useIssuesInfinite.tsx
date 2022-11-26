import { useInfiniteQuery } from '@tanstack/react-query';

import { githubApi } from '../../api/githubApi';
import { Issue, State } from '../interfaces';

interface Props {
  state?: State;
  labels: string[];
}

interface QueryProps {
  pageParam?: number;
  // puede recibir string o Props como array
  queryKey: (string | Props)[];
}

const getIssues = async ({
  pageParam = 1,
  queryKey,
}: QueryProps): Promise<Issue[]> => {
  // obteniendo el 3er argumento de la queryKey (que es un objeto)
  const [, , args] = queryKey;
  const { state, labels } = args as Props;
  const params = new URLSearchParams();

  if (state) params.append('state', state);
  if (labels.length > 0) params.append('labels', labels.join(','));

  // paginacion
  params.append('page', pageParam.toString());
  params.append('per_page', '5');

  const { data } = await githubApi.get<Issue[]>('/issues', { params });
  return data;
};

export const useIssuesInfinite = ({ state, labels }: Props) => {
  const issuesQuery = useInfiniteQuery(
    // configuracion de la cache (queryKey)
    ['issues', 'infinite', { state, labels }],
    (data) => getIssues(data),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) return;
        return pages.length + 1;
      },
    }
  );

  return { issuesQuery };
};
