import { Navigate } from "react-router-dom";

export const WithoutAuth = ({ children }) => {
//   const { sessionToken } = currentUser();
  const sessionToken = "";

  if (sessionToken) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};
