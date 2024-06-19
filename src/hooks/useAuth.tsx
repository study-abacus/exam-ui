import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from 'usehooks-ts'

const AuthContext = createContext<AuthContextType>({
  admitCard: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

type Props = {
  children?: React.ReactNode;
};

export type AuthContextType = {
  admitCard: any;
  isAuthenticated: boolean;
  login: (data: any) => void;
  logout: () => void;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [admitCard, setAdmitCard] = useLocalStorage("admitCard", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the admitCard
  const login = async (data) => {
    setAdmitCard(data);
    navigate("/admit_card");
  };

  // call this function to sign out logged in admitCard
  const logout = () => {
    setAdmitCard(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      admitCard,
      isAuthenticated: !!admitCard,
      login,
      logout,
    }),
    [admitCard]
  );
  return (
    <AuthContext.Provider
        value={value}
    >
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => useContext<AuthContextType>(AuthContext);
