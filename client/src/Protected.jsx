// If not loggedin then go first login yourself 
import { Navigate } from "react-router-dom";// Routing
import { useAuth } from "./AuthContext";// Authentication
import Loader from "./Loader";// Loader Componenet

export default function ProtectedRoute({ children }) {
  const { user, hydrated } = useAuth();

  if (!hydrated) return <Loader/>; 
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
