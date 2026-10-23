import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "../../../components/LoadingScreen.jsx";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return <LoadingScreen message="Checking your sign-in..." />;
  }
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default Protected;
