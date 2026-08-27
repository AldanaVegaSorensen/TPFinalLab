import { Stack } from 'expo-router';
import { SessionProvider, useSession } from '@/src/context/AuthContext';
import { SplashScreenController } from '@/src/splash';
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Root() {
  // Set up the auth context and render your layout inside of it.
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SessionProvider>
        <SplashScreenController />
        <RootNavigator />
      </SessionProvider>
    </GestureHandlerRootView>
  );
}

// Create a new component that can access the SessionProvider context later.
function RootNavigator() {
  const { session } = useSession();

  useEffect(() => {
    NavigationBar.setButtonStyleAsync("light");
  }, []);

  return (
    <Stack screenOptions={{headerShown: false,}}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Screen
        name="movie/[id]"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="lists" options={{ headerShown: false }} />

    </Stack>

    
  );
}

