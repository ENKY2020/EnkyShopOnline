import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { MessageCircle, Check, X } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  seller: {
    name: string;
    phone: string;
  };
  createdAt: string;
};

export default function AdminPanel() {
  const [pendingProducts, setPendingProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const fetchPendingProducts = async () => {
    try {
      setIsLoading(true);
      const q = query(
        collection(db, 'products'), 
        where('status', '==', 'pending'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setPendingProducts(products);
    } catch (error) {
      console.error('Error fetching pending products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (productId: string) => {
    try {
      await updateDoc(doc(db, 'products', productId), {
        status: 'approved'
      });
      await fetchPendingProducts();
    } catch (error) {
      console.error('Error approving product:', error);
      alert('Error approving product. Please try again.');
    }
  };

  const handleReject = async (productId: string) => {
    if (!window.confirm('Are you sure you want to reject this product?')) return;
    
    try {
      await deleteDoc(doc(db, 'products', productId));
      await fetchPendingProducts();
    } catch (error) {
      console.error('Error rejecting product:', error);
      alert('Error rejecting product. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading pending products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold mb-6">Admin Panel - Pending Products</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pendingProducts.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">No pending products</h3>
            <p className="mt-2 text-gray-500">All products have been reviewed</p>
          </div>
        ) : (
          pendingProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="mt-2 text-gray-500">{product.description}</p>
                <p className="mt-2 text-xl font-semibold text-gray-900">KSh {product.price.toLocaleString()}</p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleApprove(product.id)}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-300"
                  >
                    <Check className="h-5 w-5 mr-2" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(product.id)}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-300"
                  >
                    <X className="h-5 w-5 mr-2" />
                    Reject
                  </button>
                </div>
                <a
                  href={`https://wa.me/${product.seller.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact Seller
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}