export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: { url: string }[];
  creationAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  products: Product[];
}
