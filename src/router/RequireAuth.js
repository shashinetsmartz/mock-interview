import { useLocation, Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
//   const { sessionToken } = currentUser();
  const sessionToken  = "";
  const location = useLocation();

  if (!sessionToken) {
    return <Navigate to="/app/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
};
