import { createContext, useContext, useState, useEffect } from "react";
import { getOwnerUserInfo } from "../services/userApi";
import { useLoading } from "./loadingContext";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("access_token");
  const { setIsLoading } = useLoading();
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!token) {
        return;
      }
      try {
        setIsLoading(true);
        const userInfo = await getOwnerUserInfo();
        if (userInfo.EC === 0) {
          setIsLoading(false);
        } else {
          setIsLoading(false);
          return userInfo.EM;
        }
        setUser(userInfo.result);
      } catch (error) {
        setIsLoading(false);
        return error.response?.data;
      }
    };
    fetchUserInfo();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
