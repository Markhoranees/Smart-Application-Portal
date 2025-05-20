import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
const AdminRoute = ({ children }) => {
  const { user, isLoaded } = useAuth();

  console.log('AdminRoute - user:', user, 'isLoaded:', isLoaded);

  if (!isLoaded) return <div>Loading...</div>;

  if (user && user.publicMetadata?.role === 'admin') {
     return <Navigate to="/signin" />;

  }
    return children;
 
};
export default AdminRoute;