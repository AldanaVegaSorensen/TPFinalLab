// app/(auth)/register.tsx
import { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { router } from 'expo-router';
import { useSession } from '@/src/context/AuthContext';
import PrimaryButton from '@/src/components/PrimaryButton';

export default function Register() {
  const { signUp } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    try {
      await signUp(name, email, password);
      router.replace('/');
    } catch {
      setError('No se pudo crear la cuenta');
      console.log('Error de registro');
    }
  };

  return (
    <View>
      <TextInput placeholder="Nombre" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
      {error && <Text>{error}</Text>}
      <PrimaryButton title="Crear cuenta" onPress={handleRegister} />
      <Text onPress={() => router.push('/(auth)/login')}>¿Ya tenés cuenta? Iniciar sesión</Text>
    </View>
  );
}