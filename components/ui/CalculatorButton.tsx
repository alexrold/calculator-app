import {Colors} from '@/constants/Colors';
import {GAP_SIZE} from '@/constants/Spacing';
import {globalStyles} from '@/styles/global-styles';
import React from 'react';

import {Pressable, Text, TextStyle, ViewStyle} from 'react-native';

import type {ButtonVariant} from '@/types/ui';

import * as Haptics from 'expo-haptics';

/**
 * Props para el componente CalculatorButton.
 */
interface Props {
  label: string;
  variant?: ButtonVariant;
  onPress: () => void;
  size: number;
  double?: boolean;
  isLast?: boolean;
}

/**
 * Botón personalizable para la calculadora.
 * Se ajusta dinámicamente en tamaño y estilo según las props.
 * @param {Props} props - Las propiedades del componente.
 */
const CalculatorButton = ({
  label,
  variant = 'number',
  onPress,
  size,
  double = false,
  isLast = false,
}: Props) => {
  let backgroundColor: string;
  let textColor: string;
  let buttonMarginRight: number;

  switch (variant) {
    case 'operator':
      backgroundColor = Colors.orange;
      textColor = Colors.textPrimary;
      buttonMarginRight = 0;
      break;
    case 'function':
      backgroundColor = Colors.lightGray;
      textColor = Colors.darkGray;
      buttonMarginRight = isLast ? 0 : GAP_SIZE;
      break;
    case 'number':
    default:
      backgroundColor = Colors.darkGray;
      textColor = Colors.textPrimary;
      buttonMarginRight = isLast ? 0 : GAP_SIZE;
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
    fontSize: size * 0.3, // (Ajustar para cambiar el tamaño)
  };

  return (
    <Pressable
      style={({pressed}) => [
        globalStyles.button, // Estilos base (borderRadius, margin)
        buttonDynamicStyle, // 'width' y 'height' dinámicos
        {
          backgroundColor: backgroundColor,
          opacity: pressed ? 0.8 : 1, // Tu efecto de opacidad
        },
      ]}
      onPress={() => {
        Haptics.selectionAsync(); // Feedback háptico
        onPress(); // Lógica del botón
      }}
    >
      <Text style={[globalStyles.buttonText, textDynamicStyle]}>{label}</Text>
    </Pressable>
  );
};

export default CalculatorButton;
