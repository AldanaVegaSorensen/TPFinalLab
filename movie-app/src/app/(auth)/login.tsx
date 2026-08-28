// app/(auth)/login.tsx
import { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSession } from '@/src/context/AuthContext';
import PrimaryButton from '@/src/components/PrimaryButton';

export default function Login() {
  const { signIn } = useSession();
  const [form, setForm] = useState({
    email:'',
    password:'',
  })
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null)
    
    if (!form.email.trim()) {
      setError('Ingresá un email.');
      return;
    }

    if (!form.password) {
      setError('Ingresá una contraseña.');
      return;
    }

    try {
      await signIn(form.email, form.password);
      router.replace('/');
    } catch (err: any) {
      const status = err.response?.status;

      if (status === 400) {
        setError("Email o contraseña incorrectos.");
      } else if (status === 500) {
        setError("Error del servidor. Intentá nuevamente más tarde.");
      } else {
        setError("Ocurrió un error al iniciar sesión.");
      }
    }
  };

  return (
    <View style={{flex:1, backgroundColor:"#e8ecf4"}}>
      <View style={styles.container}>
        <View style={styles.header}>
            <Image
              source={require("@/src/assets/images/logo1.png")}
              style={styles.headerImage}
            />
            <Text style={styles.title}> Bienvenido </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput placeholder="jane@example.com" placeholderTextColor="#6b7280" value={form.email} onChangeText={email => setForm({...form, email})} style={styles.inputText} />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Contraseña</Text>
            <TextInput autoCorrect={false} autoCapitalize='none' placeholder="***********" placeholderTextColor="#6b7280" value={form.password} onChangeText={password => setForm({...form, password})} secureTextEntry style={styles.inputText}/>
            {error && <Text>{error}</Text>}  
          </View>

          <View style={styles.formAction}>
            <PrimaryButton
              title="Iniciar sesión"
              onPress={handleLogin}
            />
          </View>
          
          <TouchableOpacity style={{marginTop:'auto'}}>
              <Text style={styles.formfooter} onPress={() => router.push('/(auth)/signup')}>¿No tenés cuenta? Registrate</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  header:{
    marginVertical: 36,
  },
  headerImage:{
    width: 80,
    height: 80,
    alignSelf:'center'
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color:'#1e1e1e',
    marginBottom: 6,
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
    flex: 1,
  }, 
  input:{
    marginBottom:16,
  },
  inputLabel:{
    fontSize: 17,
    fontWeight: '600',
    color:"#222",
    marginBottom: 8,
  },
  inputText:{
    backgroundColor:"#fff", 
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color:"#222",
  },
  formAction:{
    marginVertical: 24
  },
  formfooter:{
    fontSize: 17,
    fontWeight: '600',
    color:"#222",
    textAlign: 'center',
    letterSpacing: 0.15
  },
  });