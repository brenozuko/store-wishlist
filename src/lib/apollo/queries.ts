import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
      price
      description
      category {
        id
        name
      }
      images {
        url
      }
      creationAt
      updatedAt
    }
  }
`;
