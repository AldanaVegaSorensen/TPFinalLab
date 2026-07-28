//import { SplashScreen } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { useSession } from '@/src/context/AuthContext';


SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { isLoading } = useSession();

  if (!isLoading) {
    SplashScreen.hide();
  }

  return null;
}
