/**
 * Define la estructura y el layout de los botones de la calculadora.
 * Este archivo centraliza la configuración de cómo se ven y se organizan los botones.
 */

import type {ButtonVariant} from '@/types/ui';

export const ROWS_COUNT = 5;
export const MIN_RESERVED_RESULT_HEIGHT = 120;
export const PERCENT_RESERVED = 0.28;

export type ButtonDef = {
  label: string;
  variant: ButtonVariant;
  value: string;
  double?: boolean;
};

export const LAYOUT_ROWS: ButtonDef[][] = [
  [
    {label: 'C', variant: 'function', value: 'C'},
    {label: '+/-', variant: 'function', value: '+/-'},
    {label: 'del', variant: 'function', value: 'del'},
    {label: '÷', variant: 'operator', value: '/'},
  ],
  [
    {label: '7', variant: 'number', value: '7'},
    {label: '8', variant: 'number', value: '8'},
    {label: '9', variant: 'number', value: '9'},
    {label: '×', variant: 'operator', value: '*'},
  ],
  [
    {label: '4', variant: 'number', value: '4'},
    {label: '5', variant: 'number', value: '5'},
    {label: '6', variant: 'number', value: '6'},
    {label: '-', variant: 'operator', value: '-'},
  ],
  [
    {label: '1', variant: 'number', value: '1'},
    {label: '2', variant: 'number', value: '2'},
    {label: '3', variant: 'number', value: '3'},
    {label: '+', variant: 'operator', value: '+'},
  ],
  [
    {label: '0', variant: 'number', value: '0', double: true},
    {label: '.', variant: 'number', value: '.'},
    {label: '=', variant: 'operator', value: '='},
  ],
];
