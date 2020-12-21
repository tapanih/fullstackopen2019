import { gql } from 'apollo-boost';
import { REPOSITORY_INFO } from './fragments';

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          ...RepositoryInfo
        }
      }
    }
  }
  ${REPOSITORY_INFO}
`;

export const GET_AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($id: ID!) { 
    repository(id: $id) {
      ...RepositoryInfo
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_INFO}
`;