import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts(
    $title: String
    $categoryId: Float
    $price_min: Int
    $price_max: Int
  ) {
    products(
      title: $title
      categoryId: $categoryId
      price_min: $price_min
      price_max: $price_max
    ) {
      id
      title
      price
      category {
        id
        name
      }
      images
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

