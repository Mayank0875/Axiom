import { createContext, useContext, useMemo, useState } from "react";
import { AuthResponse, AuthUser, loginUser, registerUser } from "@/lib/api";

const AUTH_STORAGE_KEY = "axiom_auth";

type AuthState = {
  token: string;
  user: AuthUser;
  roles: string[];
};

type AuthContextValue = {
  auth: AuthState | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (input: {
    universityId: number;
    fullName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const readAuthFromStorage = (): AuthState | null => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthState;
  } catch {
    return null;
  }
};

const saveAuthToStorage = (data: AuthResponse) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthState | null>(() => readAuthFromStorage());

  const login = async (email: string, password: string) => {
    const data = await loginUser({ email, password });
    saveAuthToStorage(data);
    setAuth(data);
  };

  const signup = async (input: {
    universityId: number;
    fullName: string;
    email: string;
    password: string;
  }) => {
    const data = await registerUser(input);
    saveAuthToStorage(data);
    setAuth(data);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setAuth(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      auth,
      isAuthenticated: !!auth?.token,
      login,
      signup,
      logout,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

