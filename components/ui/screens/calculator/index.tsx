import {globalStyles} from '@/styles/global-styles';
import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useCalculator} from '@/components/hooks/useCalculator';
import useCalculatorLayout from '@/components/hooks/useCalculatorLayout';
import CalculatorButton from '@/components/ui/CalculatorButton';
import ThemeText from '@components/ui/ThemeText';

/**
 * Componente principal de la pantalla de la calculadora.
 * Une la lógica de `useCalculator` y el layout de `useCalculatorLayout`
 * para renderizar la interfaz de la calculadora.
 */
export default function CalculatorScreen() {
  // screen dimensions and layout logic handled in useCalculatorLayout
  // Use hook to compute layout and sizes. Keeps this screen focused on rendering.
  const {buttonSize, rowWrapperStyle, layoutRows} = useCalculatorLayout();

  const {number, formula, handlePress} = useCalculator();

  return (
    <SafeAreaView style={globalStyles.calculatorContainer}>
      {/* Screen Result  */}
      <ThemeText variant={'main'}>{number} </ThemeText>
      <ThemeText variant={'sub'}>{formula}</ThemeText>

      {/* Buttons grid (renderizado por data para evitar repetición) */}
      {layoutRows.map((row, rIdx) => (
        <View key={rIdx} style={[globalStyles.row, rowWrapperStyle]}>
          {row.map((btn, i) => (
            <CalculatorButton
              key={btn.label + i}
              label={btn.label}
              variant={btn.variant}
              double={!!btn.double}
              isLast={i === row.length - 1}
              onPress={() => handlePress(btn)}
              size={buttonSize}
            />
          ))}
        </View>
      ))}
    </SafeAreaView>
  );
}
