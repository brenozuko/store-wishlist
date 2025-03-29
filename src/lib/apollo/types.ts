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
  images: string[];
  creationAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  products: Product[];
}
export interface ProductsFilterInput {
  title?: string;
  categoryId?: number;
  price_min?: number;
  price_max?: number;
}
