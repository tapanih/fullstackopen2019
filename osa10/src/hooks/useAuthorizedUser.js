import { useQuery } from "@apollo/react-hooks";
import { GET_AUTHORIZED_USER } from "../graphql/queries";

const useAuthorizedUser = (variables) => {
  const includeReviews = variables && variables.includeReviews;
  const { data } = useQuery(GET_AUTHORIZED_USER,
    { variables: { includeReviews }});

  return data ? data.authorizedUser : undefined;
};

export default useAuthorizedUser;