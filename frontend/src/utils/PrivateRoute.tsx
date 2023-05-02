import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

///////////////////////////////
// Private routes (for pages that require pre-authentication)
// - Accessible only after login, if not redirects userProfile to login page
////////////////////////////////

type ChildrenProps = {
  children: JSX.Element
}

const PrivateRoute = ({ children }: ChildrenProps) => {
  const {isLoggedIn} = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace/>
  }

  return children;
};

export default PrivateRoute;
