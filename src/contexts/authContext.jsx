import { createContext, useContext, useState, useEffect } from "react";
import { getOwnerUserInfo } from "../services/userApi";
import { useLoading } from "./loadingContext";
import toast from "react-hot-toast";
import { registerUserSocket } from "../services/socketService";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("access_token");
  const { setIsLoading } = useLoading();
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      } else {
        setIsLoading(true);
        const userInfo = await getOwnerUserInfo();
        if (userInfo.EC === 0) {
          setUser(userInfo.result);
          registerUserSocket(userInfo.result._id);
        } else {
          toast.error(userInfo.EM);
        }
        setIsLoading(false);
      }
    };
    fetchUserInfo();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
