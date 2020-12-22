import { useQuery } from "@apollo/react-hooks";
import { GET_AUTHORIZED_USER } from "../graphql/queries";

const useAuthorizedUser = (variables) => {
  const includeReviews = variables && variables.includeReviews;
  const { data, refetch } = useQuery(GET_AUTHORIZED_USER,
    { variables: { includeReviews },
      fetchPolicy: "cache-and-network",
    });

  return { 
    authorizedUser: data ? data.authorizedUser : undefined,
    refetch,
   };
};

export default useAuthorizedUser;