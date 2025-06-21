import { createContext, useContext, useState, useEffect } from "react";
import { getOwnerUserInfo } from "../services/userApi";
import { useLoading } from "./loadingContext";
import toast from "react-hot-toast";
import { registerUserSocket } from "../services/socketService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); 
  const { setIsLoading } = useLoading();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        setUser(null);
        setToken(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const userInfo = await getOwnerUserInfo();
      if (userInfo.EC === 0) {
        setUser(userInfo.result);
        setToken(accessToken);
        registerUserSocket(userInfo.result._id);
      } else {
        toast.error(userInfo.EM);
        setUser(null);
        setToken(null);
      }
      setIsLoading(false);
    };

    fetchUserInfo();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,       
        setToken,     
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
