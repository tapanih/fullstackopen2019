import { useMutation } from '@apollo/react-hooks';
import {DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
  const [mutate] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id) => {
    await mutate({ variables: { id }});
  };

  return deleteReview;
};

export default useDeleteReview;