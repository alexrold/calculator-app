import {globalStyles} from '@/styles/global-styles';
import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import useCalculatorLayout from '@/components/hooks/useCalculatorLayout';
import CalculatorButton from '@/components/ui/CalculatorButton';
import ThemeText from '@components/ui/ThemeText';

export default function CalculatorScreen() {
  // screen dimensions and layout logic handled in useCalculatorLayout
  // Use hook to compute layout and sizes. Keeps this screen focused on rendering.
  const {buttonSize, rowWrapperStyle, layoutRows} = useCalculatorLayout();

  return (
    <SafeAreaView style={globalStyles.calculatorContainer}>
      {/* Screen Result  */}
      <ThemeText variant={'main'}>5x2</ThemeText>
      <ThemeText variant={'sub'}>25</ThemeText>

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
              onPress={() => console.log({label: btn.label, value: btn.value})}
              size={buttonSize}
            />
          ))}
        </View>
      ))}
    </SafeAreaView>
  );
}
