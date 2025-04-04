import { createContext, useContext, useState, useEffect } from "react";
import { supabase, getCurrentUser } from "../lib/supabaseClient";

type AuthContextType = {
  user: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (
    email: string,
    password: string,
    userData: any,
  ) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
};

// Default context value to prevent errors when component is rendered outside provider
const defaultContextValue: AuthContextType = {
  user: null,
  loading: true,
  signIn: async () => ({ error: new Error("Not implemented") }),
  signUp: async () => ({ error: new Error("Not implemented") }),
  signOut: async () => ({ error: new Error("Not implemented") }),
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

// Use a named function component instead of an arrow function for better Fast Refresh support
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for active session on mount
    const checkUser = async () => {
      try {
        const { data } = await getCurrentUser();
        setUser(data?.user || null);
      } catch (error) {
        console.error("Error checking user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    signIn: async (email: string, password: string) => {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        return { error };
      } catch (error) {
        return { error };
      }
    },
    signUp: async (email: string, password: string, userData: any) => {
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: userData },
        });
        return { error };
      } catch (error) {
        return { error };
      }
    },
    signOut: async () => {
      try {
        const { error } = await supabase.auth.signOut();
        return { error };
      } catch (error) {
        return { error };
      }
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
