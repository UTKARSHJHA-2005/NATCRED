import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Signup from './pages/Signup'
import Test from './components/test';
import Login from './pages/Login'
import ProductPage from './components/ProductPage';
import Loader from './Loader';
import Product from './pages/Product';
import Dialog from './components/Dialog';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Posts from './pages/Posts';
import NewPosts from './components/NewPosts';
import NewProject from './components/NewProject';
import GoogleCallback from './GoogleCallback';
import ProjectDetail from './components/ProjectDetail';
import ProtectedRoute from './Protected';
import NewProduct from './components/NewProduct';
import Contact from './components/Contact';
import { AuthProvider } from './AuthContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <AuthProvider>
          <Router>
            <div className='overflow-x-hidden'>
              <Routes>
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/auth/google/callback" element={<GoogleCallback />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dialog/:id" element={<Dialog />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/test" element={<Test />} />
                <Route path="/login" element={<Login />} />
                <Route path='/newposts' element={<NewPosts />} />
                <Route path='/newproject' element={<NewProject />} />
                <Route path="/product" element={<Product />} />
                <Route path="/contact" element={<Contact />} />
                <Route path='/product/:id' element={<ProductPage />} />
                <Route path='/new-product' element={<NewProduct />} />
                <Route path='/projects/:id' element={<ProjectDetail />} />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      )}
    </div>
  );
}

export default App;