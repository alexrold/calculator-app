import {useFonts} from 'expo-font';
import {Slot, SplashScreen} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {useEffect} from 'react';
import {View} from 'react-native';

import {globalStyles} from '@/styles/global-styles';

// Previene que la pantalla de carga (splash screen) se oculte sola
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Carga las fuentes
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Espera a que se carguen las fuentes
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={globalStyles.background}>
      <Slot />
      {/* <Stack>
        <Stack.Screen name="index" options={{headerShown: false}} />
      </Stack> */}
      <StatusBar style="light" />
    </View>
  );
}
