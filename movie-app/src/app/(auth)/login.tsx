// app/(auth)/login.tsx
import { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { router } from 'expo-router';
import { useSession } from '@/src/context/AuthContext';
import PrimaryButton from '@/src/components/PrimaryButton';

export default function Login() {
  const { signIn } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null)
    
    if (!email.trim()) {
      setError('Ingresá un email.');
      return;
    }

    if (!password) {
      setError('Ingresá una contraseña.');
      return;
    }

    try {
      await signIn(email, password);
      router.replace('/');
    } catch (err: any) {
      
      console.log(err.response.status)
      const message = err.response?.data?.error || "Ocurrió un error al iniciar sesión";
      setError(message);
      
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
      {error && <Text>{error}</Text>}
      <PrimaryButton title="Ingresar" onPress={handleLogin} />
      <Text onPress={() => router.push('/(auth)/signup')}>¿No tenés cuenta? Registrate</Text>
    </View>
  );
}