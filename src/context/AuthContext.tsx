import { createContext, useCallback, useEffect, useState } from "react";
import { api_users } from "../services/apiService";

interface AuthContextModel {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
  logout: () => void;
  getToken: () => string;
}

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextModel);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token: string = getToken();

    if (token) {
      setIsAuthenticated(true);
    }
    Logout();
  }, []);

  const getToken = useCallback(() => {
    const token = localStorage.getItem("user");
    return token ? JSON.parse(token) : "";
  }, []);

  const Login = useCallback(async (email: string, password: string) => {
    const respAuth = await api_users.post("/auth", { email, password });

    if (respAuth instanceof Error) {
      return respAuth.message;
    }

    localStorage.setItem("user", JSON.stringify(respAuth.data));
    setIsAuthenticated(true);
    return;
  }, []);

  const Logout = useCallback(() => {
    localStorage.removeItem("user");

    setIsAuthenticated(false);

    return;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        login: Login,
        logout: Logout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
