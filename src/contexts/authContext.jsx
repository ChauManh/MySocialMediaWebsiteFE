import { createContext, useContext, useState, useEffect } from "react";
import { getOwnerUserInfo } from "../services/userApi";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getOwnerUserInfo();
        setUser(userInfo.result);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        return error.response?.data;
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
    setLoading(false);
  }, []);


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
