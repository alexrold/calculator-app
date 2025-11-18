import {globalStyles} from '@/styles/global-styles';
import React from 'react';
import {Text, type TextProps} from 'react-native';

interface Props extends TextProps {
  variant: 'main' | 'sub';
}

/**
 * Componente de texto personalizado para los displays de la calculadora.
 * Aplica estilos diferentes para el display principal ('main') y el secundario ('sub').
 * @param {Props} props - Las propiedades del componente.
 */
const ThemeText = ({children, variant, ...restProps}: Props) => {
  return (
    <Text
      style={[
        {fontFamily: 'SpaceMono'},
        variant === 'main' && globalStyles.mainResult,
        variant === 'sub' && globalStyles.subResult,
      ]}
      numberOfLines={1}
      adjustsFontSizeToFit
      {...restProps}
    >
      {children}
    </Text>
  );
};

export default ThemeText;
