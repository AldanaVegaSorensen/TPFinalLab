// app/(auth)/register.tsx
import { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { useSession } from '@/src/context/AuthContext';
import PrimaryButton from '@/src/components/PrimaryButton';

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

  function setName(text: string): void {
    throw new Error('Function not implemented.');
  }

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
                <Text style={styles.inputLabel}>Nombre</Text>
                <TextInput placeholder="Jane" placeholderTextColor="#6b7280" value={form.name} onChangeText={name => setForm({...form, name})} style={styles.inputText} />
              </View>

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
                  title="Crear cuenta"
                  onPress={handleRegister}
                />
              </View>
              
              <TouchableOpacity style={{marginTop:'auto'}}>
                  <Text style={styles.formfooter} onPress={() => router.push('/(auth)/login')}>¿Ya tenés cuenta? Iniciar sesión</Text>
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
  btn:{
    backgroundColor:"#4CD5CA", 
    borderRadius:8,
    borderWidth: 1,
    borderColor: "#36C1B5",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical:10,
    paddingHorizontal: 10
  },
  textbtn:{
    fontSize: 18,
    fontWeight: '600',
    color: "#fff"
  },

  });