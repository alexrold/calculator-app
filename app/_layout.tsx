import {globalStyles} from '@/styles/global-styles';
import {useFonts} from 'expo-font';
import {Slot, SplashScreen} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {useEffect} from 'react';
import {Platform, View} from 'react-native';

import * as NavigationBar from 'expo-navigation-bar';

// Previene que la pantalla de carga (splash screen) se oculte sola
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Carga las fuentes
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('@assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Espera a que se carguen las fuentes
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Configuración de la barra de navegación
  useEffect(() => {
    const isAndroid = Platform.OS === 'android';
    if (isAndroid) {
      NavigationBar.setButtonStyleAsync('light');
    }
  }, []);

  // Si las fuentes no están listas, no renderiza nada (la splash screen sigue visible)
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={globalStyles.background}>
      <Slot />
      <StatusBar style="light" />
    </View>
  );
}
