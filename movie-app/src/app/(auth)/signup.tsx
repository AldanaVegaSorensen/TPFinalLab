// app/(auth)/register.tsx
import { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { useSession } from '@/src/context/AuthContext';
import PrimaryButton from '@/src/components/PrimaryButton';
import { commonStyles } from '@/src/styles/general';
import { authStyles } from '@/src/styles/auth.styles';

export default function Register() {
  const { signUp } = useSession();
  const [form, setForm] = useState({
    name:'',
    email:'',
    password:'',
  })
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setError(null)

    if (!form.name.trim()) {
      setError('Ingresá un nombre.');
      return;
    }
    
    if (!form.email.trim()) {
      setError('Ingresá un email.');
      return;
    }

    if (!form.password) {
      setError('Ingresá una contraseña.');
      return;
    }


    try {
      await signUp(form.name, form.email, form.password);
      router.replace('/');
    } catch (err: any) {
      const status = err.response?.status;

      if (status === 422) {
        setError("Datos inválidos");
      } else if (status === 409) {
        setError("Email ya registrado.");
      } else if (status === 500) {
        setError("Error del servidor. Intentá nuevamente más tarde.");
      } else {
        setError("Ocurrió un error al iniciar sesión.");
      }
    }
  };

  return (
    <View style={commonStyles.darkContainer}>
          <View style={authStyles.container}>
            <View style={authStyles.header}>
                <Image
                  source={require("@/src/assets/images/logo1.png")}
                  style={authStyles.headerImage}
                />
                <Text style={commonStyles.centeredTitle}> Bienvenido </Text>
            </View>
    
            <View style={authStyles.form}>
              <View style={authStyles.input}>
                <Text style={commonStyles.inputLabel}>Nombre</Text>
                <TextInput placeholder="Jane" placeholderTextColor="#6b7280" value={form.name} onChangeText={name => setForm({...form, name})} style={commonStyles.inputText} />
              </View>

              <View style={authStyles.input}>
                <Text style={commonStyles.inputLabel}>Email</Text>
                <TextInput placeholder="jane@example.com" placeholderTextColor="#6b7280" value={form.email} onChangeText={email => setForm({...form, email})} style={commonStyles.inputText} />
              </View>
    
              <View style={authStyles.input}>
                <Text style={commonStyles.inputLabel}>Contraseña</Text>
                <TextInput autoCorrect={false} autoCapitalize='none' placeholder="***********" placeholderTextColor="#6b7280" value={form.password} onChangeText={password => setForm({...form, password})} secureTextEntry style={commonStyles.inputText}/>
                {error && <Text style={commonStyles.errorText}>{error}</Text>}  
              </View>
    
              <View style={authStyles.formAction}>
                <PrimaryButton
                  title="Crear cuenta"
                  onPress={handleRegister}
                />
              </View>
              
              <TouchableOpacity style={{marginTop:'auto'}}>
                  <Text style={authStyles.formfooter} onPress={() => router.push('/(auth)/login')}>¿Ya tenés cuenta? Iniciar sesión</Text>
              </TouchableOpacity>
    
            </View>
          </View>
        </View>
  );
}