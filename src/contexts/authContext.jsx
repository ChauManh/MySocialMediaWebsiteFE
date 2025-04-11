import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("access_token") || null
  );
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (storedToken && user) {
      setToken(storedToken);
      setUser(user)
    } else {
      setToken(null);
      setUser(null);
    }
    setLoading(false);
  }, []);


  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        setToken,
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
