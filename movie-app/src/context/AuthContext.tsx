// AuthContext.tsx
import { use, createContext, type PropsWithChildren, useState } from 'react';
import { useStorageState } from '../hooks/useStorageState';
import { authService } from '../services/auth.service';

type User = {
  id: number;
  name: string;
  email: string;
};

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;

  session?: string | null;
  user?: User | null;

  isLoading: boolean;
} | null>(null);

// Use this hook to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [user, setUser] = useState<User | null>(null);
  
  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          const { data } = await authService.login(email, password);
          setSession(data.token);
          setUser(data.user)
        },
        signUp: async (name: string, email: string, password: string) => {
          const { data } = await authService.register(name, email, password);
          setSession(data.token);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
        user
      }}>
      {children}
    </AuthContext.Provider>
  );
}