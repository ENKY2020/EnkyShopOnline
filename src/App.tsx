import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import SignUp from './components/SignUp';

function App() {
  return (
    <Router basename="/EnkyShopOnline">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        {/* Add other routes */}
      </Routes>
    </Router>
  );
}

export default App;

