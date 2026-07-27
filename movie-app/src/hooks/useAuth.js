// hooks/useAuth.js — distinto del context, este maneja el formulario
import { useState } from 'react';
import { authService } from '../services/auth.service';
import { useAuth as useAuthContext } from '../context/AuthContext';

export function useLogin() {
  const { setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await authService.login(email, password);
      setUser(data.user);
    } catch (err) {
      setError('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}