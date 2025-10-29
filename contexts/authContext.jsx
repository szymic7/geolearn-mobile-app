import * as SecureStore from "expo-secure-store";
import { createContext, useCallback, useContext, useReducer } from "react";
import { Alert } from "react-native";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };

    case "auth/login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        authError: "",
      };

    case "auth/logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        authError: "",
      };

    case "rejected":
      return { ...state, authError: action.payload, loading: false };

    case "clearError": {
      return { ...state, authError: "" };
    }

    default:
      throw new Error("Unknown action type");
  }
}

const initialState = {
  user: undefined,
  isAuthenticated: false,
  loading: "",
  authError: "",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, loading, authError }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function login(email, password) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Invalid email or password");
      }
      const token = data.access_token;
      await SecureStore.setItemAsync("token", token);

      const user = await fetch(`${API_BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = await user.json();
      dispatch({ type: "auth/login", payload: userData });
      return true;
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
      return false;
    }
  }

  const loginWithToken = useCallback(async (token) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.detail);
        throw new Error(data.detail || "Invalid token");
      }
      dispatch({ type: "auth/login", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }, []);

  async function logout() {
    await SecureStore.deleteItemAsync("token");
    Alert.alert("Success", "Token has been deleted from secure store");
    dispatch({ type: "auth/logout" });
  }

  async function register(user) {
    const { name, email, password } = user;
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ username: name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "User already exists");
      }
      dispatch({ type: "auth/logout" });
      return true;
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
      return false;
    }
  }

  const clearError = useCallback(function () {
    dispatch({ type: "clearError" });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        authError,
        loading,
        register,
        clearError,
        loginWithToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside  AuthProvider");

  return context;
}

export { AuthProvider, useAuth };
