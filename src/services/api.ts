import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

export interface Product {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export const api = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  },

  // Get a single product by ID
  getProduct: async (id: number): Promise<Product> => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  },

  // Create a new product
  createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
  }
}; 