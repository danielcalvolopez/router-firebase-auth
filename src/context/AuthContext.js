import { createContext, useEffect, useState } from "react";
import { onAuthStateChange } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { allRoutes, privateRoutesPaths } from "../utils/routes";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        onAuthStateChange(async (user) => {
          if (user?.hasOwnProperty("email")) {
            setCurrentUser({ email: user.email });
            if (pathname === allRoutes.login.path) {
              navigate(allRoutes.profile.path);
            }
          } else {
            const isPrivateRoute = privateRoutesPaths.some(
              (route) => route === pathname
            );
            if (isPrivateRoute) {
              navigate(allRoutes.login.path);
            }
          }
        });
      } catch (error) {}
      setIsLoading(false);
    };
    getCurrentUser();
  }, [navigate, pathname]);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {isLoading ? "loading..." : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
