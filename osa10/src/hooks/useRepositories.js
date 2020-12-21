import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return { 
    repositories: data ? data.repositories : undefined, 
    error, 
    loading 
  };
};

export default useRepositories;