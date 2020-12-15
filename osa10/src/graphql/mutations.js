import { gql } from 'apollo-boost';

export const SIGN_IN = gql`
  mutation Authorize($credentials: AuthorizeInput!) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;