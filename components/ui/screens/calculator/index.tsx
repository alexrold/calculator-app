import {globalStyles} from '@/styles/global-styles';
import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CalculatorButton from '../../CalculatorButton';
import ThemeText from '../../ThemeText';

export default function CalculatorScreen() {
  // Ancho de la pantalla
  const {width: screenWidth} = useWindowDimensions();
  // TODO: Revisar Calcular el tamaño de los botones según la pantalla
  // Calculo para el tamaño de los botones
  // const buttonSize = (screenWidth - screenWidth * 0.2) / 4;
  const buttonSize = screenWidth - screenWidth + 115;
  return (
    <SafeAreaView style={globalStyles.calculatorContainer}>
      {/* Screen Result  */}
      <ThemeText variant={'main'}>5x2</ThemeText>
      <ThemeText variant={'sub'}>25</ThemeText>

      {/* Buttons F1 */}
      <View style={globalStyles.row}>
        <CalculatorButton
          label="C"
          variant="function"
          onPress={() => console.log('C')}
          size={buttonSize}
        />
        <CalculatorButton
          label="+/-"
          variant="function"
          onPress={() => console.log('+/-')}
          size={buttonSize}
        />
        <CalculatorButton
          label="del"
          variant="function"
          onPress={() => console.log('del')}
          size={buttonSize}
        />
        <CalculatorButton
          label="/"
          variant="operator"
          onPress={() => console.log('/')}
          size={buttonSize}
        />
      </View>

      {/* Buttons F2 */}
      <View style={globalStyles.row}>
        <CalculatorButton
          label="7"
          variant="number"
          onPress={() => console.log('7')}
          size={buttonSize}
        />
        <CalculatorButton
          label="8"
          variant="number"
          onPress={() => console.log('8')}
          size={buttonSize}
        />
        <CalculatorButton
          label="9"
          variant="number"
          onPress={() => console.log('9')}
          size={buttonSize}
        />
        <CalculatorButton
          label="x"
          variant="operator"
          onPress={() => console.log('x')}
          size={buttonSize}
        />
      </View>
      {/* Buttons F3 */}
      <View style={globalStyles.row}>
        <CalculatorButton
          label="4"
          variant="number"
          onPress={() => console.log('4')}
          size={buttonSize}
        />
        <CalculatorButton
          label="5"
          variant="number"
          onPress={() => console.log('5')}
          size={buttonSize}
        />
        <CalculatorButton
          label="6"
          variant="number"
          onPress={() => console.log('6')}
          size={buttonSize}
        />
        <CalculatorButton
          label="-"
          variant="operator"
          onPress={() => console.log('-')}
          size={buttonSize}
        />
      </View>
      {/* Buttons F4 */}
      <View style={globalStyles.row}>
        <CalculatorButton
          label="1"
          variant="number"
          onPress={() => console.log('1')}
          size={buttonSize}
        />
        <CalculatorButton
          label="2"
          variant="number"
          onPress={() => console.log('2')}
          size={buttonSize}
        />
        <CalculatorButton
          label="3"
          variant="number"
          onPress={() => console.log('3')}
          size={buttonSize}
        />
        <CalculatorButton
          label="+"
          variant="operator"
          onPress={() => console.log('+')}
          size={buttonSize}
        />
      </View>
      {/* Buttons F5 */}
      <View style={globalStyles.row}>
        <CalculatorButton
          label="0"
          variant="number"
          double={true}
          onPress={() => console.log('0')}
          size={buttonSize}
        />
        <CalculatorButton
          label="."
          variant="number"
          onPress={() => console.log('.')}
          size={buttonSize}
        />
        <CalculatorButton
          label="="
          variant="operator"
          onPress={() => console.log('=')}
          size={buttonSize}
        />
      </View>
    </SafeAreaView>
  );
}
