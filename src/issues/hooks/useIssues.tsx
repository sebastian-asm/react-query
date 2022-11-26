import { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { githubApi } from '../../api/githubApi';
import { Issue, State } from '../interfaces';

interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

const getIssues = async ({
  labels,
  state,
  page = 1,
}: Props): Promise<Issue[]> => {
  const params = new URLSearchParams();

  if (state) params.append('state', state);
  if (labels.length > 0) params.append('labels', labels.join(','));

  // paginacion
  params.append('page', page.toString());
  params.append('per_page', '5');

  const { data } = await githubApi.get<Issue[]>('/issues', { params });
  return data;
};

export const useIssues = ({ state, labels }: Props) => {
  const [page, setPage] = useState(1);

  // efecto para volver siempre a la pagina 1 al seleccionar nueva label
  useEffect(() => setPage(1), [state, labels]);

  // al crear un objecto dentro del query no importa el orden, para no perjudicar la cache
  const issuesQuery = useQuery(['issues', { state, labels, page }], () =>
    getIssues({ labels, state, page })
  );

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;
    setPage(page + 1);
  };

  const prevPage = () => page > 1 && setPage(page - 1);

  return {
    issuesQuery,
    nextPage,
    prevPage,
    page: issuesQuery.isFetching ? 'Loading' : page,
  };
};
