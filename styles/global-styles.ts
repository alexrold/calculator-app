import {Colors} from '@/constants/Colors';
import {CONTAINER_PADDING} from '@/constants/Spacing';
import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  calculatorContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: CONTAINER_PADDING,
  },
  mainResult: {
    color: Colors.textPrimary,
    fontSize: 50,
    textAlign: 'right',
    fontWeight: '400',
  },
  subResult: {
    color: Colors.textSecondary,
    fontSize: 30,
    textAlign: 'right',
    fontWeight: '100',
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
  },
  button: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
  },
});
