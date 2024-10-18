import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Experts from './pages/Experts';
import MarketPlace from './pages/MarketPlace';
import Projects from './pages/Product';
import Posts from './pages/Posts';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experts" element={<Experts />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/products" element={<Posts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
