import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocalStorage } from 'usehooks-ts'

const AuthContext = createContext<AuthContextType>({
  data: {},
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export type AuthContextType = {
  data: any;
  isAuthenticated: boolean;
  login: (data: any) => void;
  logout: () => void;
};

export const AuthProvider: React.FC = () => {
  const [authData, setAuthData] = useLocalStorage<{token?: string}>("auth", {});
  const navigate = useNavigate();

  // call this function when you want to authenticate the admitCard
  const login = async (token) => {
    setAuthData({
      token,
    });
  };

  // call this function to sign out logged in admitCard
  const logout = () => {
    setAuthData({});
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      data: (!!authData?.token ? {
        ...authData, 
        token_data : authData && jwtDecode(authData?.token), 
      } : {}) ,
      isAuthenticated: !!authData?.token,
      login,
      logout,
    }),
    [authData]
  );
  return (
    <AuthContext.Provider
        value={value}
    >
      <Outlet />
    </AuthContext.Provider>
  )
};

export const useAuth = () => useContext<AuthContextType>(AuthContext);
