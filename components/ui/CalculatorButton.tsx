import {Colors} from '@/constants/Colors';
import {globalStyles} from '@/styles/global-styles';
import React from 'react';

import {Pressable, Text, TextStyle, ViewStyle} from 'react-native';

/**
 * Define las variantes de estilo visual para el botón.
 */
export type ButtonVariant = 'operator' | 'function' | 'number';

/**
 * Define las props que espera el componente CalculatorButton.
 */
interface Props {
  label: string;
  variant?: ButtonVariant;
  onPress: () => void;
  size: number;
  double?: boolean;
}

/**
 * Botón de la calculadora que se auto-ajusta
 * al tamaño (size) calculado en la pantalla.
 */
const CalculatorButton = ({
  label,
  variant = 'number',
  onPress,
  size,
  double = false,
}: Props) => {
  let backgroundColor: string;
  let textColor: string;
  let buttonMarginRight: number;
  const GAP_SIZE = 14;

  switch (variant) {
    case 'operator':
      backgroundColor = Colors.orange;
      textColor = Colors.textPrimary;
      buttonMarginRight = 0;
      break;
    case 'function':
      backgroundColor = Colors.lightGray;
      textColor = Colors.darkGray;
      buttonMarginRight = GAP_SIZE;
      break;
    case 'number':
    default:
      backgroundColor = Colors.darkGray;
      textColor = Colors.textPrimary;
      buttonMarginRight = GAP_SIZE;
      break;
  }

  // -- Estilos Dinámicos --

  // Estilo para el Pressable (el círculo)
  const buttonDynamicStyle: ViewStyle = {
    width: double ? size * 2 + GAP_SIZE : size,
    height: size,
    marginRight: buttonMarginRight,
  };

  // Estilo para el Texto
  const textDynamicStyle: TextStyle = {
    color: textColor,
    // Fuente responsive (proporcional al botón)
    fontSize: size * 0.3, // (Ajusta si quieres cambiar el tamaño)
  };

  return (
    <Pressable
      // Combinamos los estilos globales, los dinámicos y los de 'pressed'
      style={({pressed}) => [
        globalStyles.button, // Estilos base (borderRadius, margin)
        buttonDynamicStyle, // 'width' y 'height' dinámicos
        {
          backgroundColor: backgroundColor,
          opacity: pressed ? 0.8 : 1, // Tu efecto de opacidad
        },
      ]}
      onPress={onPress}
    >
      {/* Combinamos los estilos de texto globales y los dinámicos */}
      <Text style={[globalStyles.buttonText, textDynamicStyle]}>{label}</Text>
    </Pressable>
  );
};

export default CalculatorButton;
