import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER } from '../graphql/mutations';

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const createUser = async (username, password) => {
    await mutate({ variables: { user: { username, password }}});
  };

  return [createUser, result];
};

export default useCreateUser;