import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, 'products');
      const querySnapshot = await getDocs(productsRef);
      const productsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsList);
    };

    const checkAdminStatus = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Assuming role info is in Firestore under 'users' collection
          const userRef = doc(db, 'users', user.uid);
          getDocs(userRef).then(snapshot => {
            if (snapshot.exists && snapshot.data().role === 'admin') {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          });
        }
      });
    };

    fetchProducts();
    checkAdminStatus();
  }, [db, auth]);

  const handleApproval = async (productId) => {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, { status: 'approved' });
  };

  const handleRejection = async (productId) => {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, { status: 'rejected' });
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {isAdmin ? (
        <div>
          <h3>Pending Products</h3>
          <ul>
            {products.filter(product => product.status === 'pending_review').map(product => (
              <li key={product.id}>
                <p>{product.name}</p>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <button onClick={() => handleApproval(product.id)}>Approve</button>
                <button onClick={() => handleRejection(product.id)}>Reject</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>You do not have admin access.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
