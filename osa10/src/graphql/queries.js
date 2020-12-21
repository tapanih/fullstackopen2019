import { gql } from 'apollo-boost';
import { PAGE_INFO, REPOSITORY_INFO } from './fragments';

export const GET_REPOSITORIES = gql`
  query Repositories($first: Int, $after: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(first: $first, after: $after, orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          ...RepositoryInfo
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
  ${REPOSITORY_INFO}
  ${PAGE_INFO}
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
  query Repository($id: ID!, $first: Int, $after: String) { 
    repository(id: $id) {
      ...RepositoryInfo
      url
      reviews(first: $first, after: $after) {
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
        pageInfo {
          ...PageInfoFragment
        }
      }
    }
  }
  ${REPOSITORY_INFO}
  ${PAGE_INFO}
`;