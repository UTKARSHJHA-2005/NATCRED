import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Loader from "./Loader";

export default function ProtectedRoute({ children }) {
  const { user, hydrated } = useAuth();

  if (!hydrated) return <Loader/>; 
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
