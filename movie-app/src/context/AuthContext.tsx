// AuthContext.tsx
import { use, createContext, type PropsWithChildren } from 'react';

import { useStorageState } from '../hooks/useStorageState';
import { authService } from '../services/auth.service';

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
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

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          const { data } = await authService.login(email, password);
          setSession(data.token);
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
      }}>
      {children}
    </AuthContext.Provider>
  );
}