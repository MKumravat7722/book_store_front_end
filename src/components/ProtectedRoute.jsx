import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
