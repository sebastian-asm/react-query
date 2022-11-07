import { githubApi } from '../../api/githubApi';
import { Label } from '../interfaces/label';
import { useQuery } from '@tanstack/react-query';

const getLabels = async (): Promise<Label[]> => {
  const { data } = await githubApi.get<Label[]>('/labels');
  return data;
};

export default function useLabels() {
  const labelsQuery = useQuery(['labels'], getLabels, {
    // indicar que no haga fetch cuando se vuelve hacer focus en la ventana
    // refetchOnWindowFocus: false,
    // especificar cuanto tiempo la data esta "fresca" (1 hora)
    // staleTime: 1000 * 60 * 60,
    // mostrar informacion incluso sin haber obtenido la data (sin necesidad de un loading)
    placeholderData: [
      {
        id: 791921801,
        node_id: 'MDU6TGFiZWw3OTE5MjE4MDE=',
        url:
          'https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F',
        name: '❤️',
        color: 'ffffff',
        default: false,
      },
      {
        id: 180616330,
        node_id: 'MDU6TGFiZWwxODA2MTYzMzA=',
        url:
          'https://api.github.com/repos/facebook/react/labels/Component:%20Optimizing%20Compiler',
        name: 'Component: Optimizing Compiler',
        color: 'bfdadc',
        default: false,
      },
    ],
  });

  return labelsQuery;
}
