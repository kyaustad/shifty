"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/db/schema";
import { authClient } from "@/lib/auth-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const AuthContext = createContext<{
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  refresh: () => void;
}>({
  user: null,
  isLoading: true,
  error: null,
  signOut: async () => {},
  signIn: async (email: string, password: string) => {},
  refresh: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const getUser = async (): Promise<User | null> => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await authClient.getSession();
    if (error) {
      setError(
        error?.message
          ? new Error(error.message)
          : new Error("An unknown error occurred")
      );
      setIsLoading(false);
      return null;
    }
    if (!data) {
      setIsLoading(false);
      return null;
    }
    if (!data.user) {
      setIsLoading(false);
      return null;
    }

    setIsLoading(false);
    setError(null);
    return data.user as User;
  };

  const signOut = async () => {
    await authClient.signOut();
    setUser(null);
    setIsLoading(false);
    setError(null);
  };

  const signIn = async (email: string, password: string) => {
    await authClient.signIn.email({ email, password });
    setUser(null);
    setIsLoading(false);
    setError(null);
  };

  useEffect(() => {
    getUser().then((data: User | null) => {
      setUser(data);
      setIsLoading(false);
      setError(null);
    });
  }, []);

  const refresh = () => {
    getUser().then((data: User | null) => {
      setUser(data);
      setIsLoading(false);
      setError(null);
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, error, signOut, signIn, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
