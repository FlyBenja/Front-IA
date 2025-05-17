import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api, Product } from '../services/api';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const data = await api.getProduct(parseInt(id));
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6"
      >
        ← Back to Products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold mr-4">${product.price}</span>
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span>{product.rating?.rate ?? 0}</span>
              <span className="text-gray-500 ml-2">({product.rating?.count ?? 0} reviews)</span>
            </div>
          </div>
          
          <div className="bg-gray-100 px-4 py-2 rounded mb-6">
            <span className="text-sm font-medium">{product.category}</span>
          </div>
          
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 