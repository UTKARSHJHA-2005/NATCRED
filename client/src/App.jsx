import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Routing
import { useState, useEffect } from "react"; // React
import "react-toastify/dist/ReactToastify.css"; // Pop-Ups
// Components and Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Test from "./components/Test";
import Login from "./pages/Login";
import ProductPage from "./components/ProductPage";
import Loader from "./Loader";
import Product from "./pages/Product";
import Dialog from "./components/Dialog";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Posts from "./pages/Posts";
import NewPosts from "./components/NewPosts";
import NewProject from "./components/NewProject";
import ProjectDetail from "./components/ProjectDetail";
import ProtectedRoute from "./Protected";
import NewProduct from "./components/NewProduct";
import Contact from "./components/Contact";
import { AuthProvider } from "./AuthContext";

function App() {
  const [isLoading, setIsLoading] = useState(true); // Loader
  // Loader in 5 sec
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
            <div className="overflow-x-hidden">
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <ProtectedRoute>
                      <Projects />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/posts"
                  element={
                    <ProtectedRoute>
                      <Posts />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route path="/dialog" element={<Dialog />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/test" element={<Test />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/newposts"
                  element={
                    <ProtectedRoute>
                      <NewPosts />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/newproject"
                  element={
                    <ProtectedRoute>
                      <NewProject />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/product"
                  element={
                    <ProtectedRoute>
                      <Product />
                    </ProtectedRoute>
                  }
                />
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="/product/:id"
                  element={
                    <ProtectedRoute>
                      <ProductPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/new-product"
                  element={
                    <ProtectedRoute>
                      <NewProduct />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/projects/:id"
                  element={
                    <ProtectedRoute>
                      <ProjectDetail />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      )}
    </div>
  );
}

export default App;
