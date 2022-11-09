import { githubApi } from '../../api/githubApi';
import { Issue } from '../interfaces';
import { useQuery } from '@tanstack/react-query';

const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
  const { data } = await githubApi<Issue>(`/issues/${issueNumber}`);
  return data;
};

const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
  const { data } = await githubApi<Issue[]>(`/issues/${issueNumber}/comments`);
  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery(['issue', issueNumber], () =>
    getIssueInfo(issueNumber)
  );

  const commentsQuery = useQuery(
    ['issue', issueNumber, 'comments'],
    () => getIssueComments(issueQuery.data!.number),
    {
      // si se cumple la primera peticion, se lanza esta
      enabled: issueQuery.data !== undefined,
    }
  );

  return { issueQuery, commentsQuery };
};
