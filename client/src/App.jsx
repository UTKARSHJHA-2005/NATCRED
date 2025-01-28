import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProductPage from './components/ProductPage';
import Loader from './Loader';
import Product from './pages/Product';
import Contact from './pages/Contact'
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Posts from './pages/Posts';
import NewPosts from './components/NewPosts';
import NewProject from './components/NewProject';
import ProjectDetail from './components/ProjectDetail';
import MyProject from './components/MyProject';

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
        <Router>
          <div className='overflow-x-hidden'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path='/newposts' element={<NewPosts />} />
              <Route path='/newproject' element={<NewProject />} />
              <Route path="/product" element={<Product />} />
              <Route path='/product/:title' element={<ProductPage />} />
              <Route path='/your-project' element={<MyProject />} />
              <Route path='/projects/:title' element={<ProjectDetail/>}/>
              <Route path='/your-project/:title' element={<ProjectDetail/>}/>
            </Routes>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;