import {globalStyles} from '@/styles/global-styles';
import React from 'react';
import {Text, type TextProps} from 'react-native';

interface Props extends TextProps {
  variant: 'main' | 'sub';
}

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
