import type {ButtonDef} from '@/constants/CalculatorLayout';
import {useEffect, useRef, useState} from 'react';

/**
 * Enum for supported arithmetic operations.
 */
enum Operation {
  ADD = '+',
  SUBTRACT = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
}

/**
 * Hook personalizado para la lógica de la calculadora.
 */
export const useCalculator = () => {
  // --- ESTADOS ---
  const [formula, setFormula] = useState('0'); // Fórmula para el display secundario.
  const [number, setNumber] = useState('0'); // Número principal o resultado.
  const [prevNumber, setPrevNumber] = useState('0'); // Número previo en una operación.
  const [isError, setIsError] = useState(false); // Flag para el estado de error.
  const [lastOperation, setLastOperation] = useState<Operation | undefined>(); // Última operación seleccionada.

  // --- REFERENCIAS ---
  // Ref para evitar que useEffect sobreescriba la fórmula justo después de un cálculo.
  const justCalculated = useRef(false);

  // --- FUNCIONES INTERNAS ---

  /**
   * Realiza el cálculo aritmético.
   * @param num1 Primer operando.
   * @param num2 Segundo operando.
   * @param op Operación a realizar.
   * @returns El resultado del cálculo.
   */
  const performCalculation = (
    num1: number,
    num2: number,
    op: Operation,
  ): number => {
    switch (op) {
      case Operation.ADD:
        return num1 + num2;
      case Operation.SUBTRACT:
        return num1 - num2;
      case Operation.MULTIPLY:
        return num1 * num2;
      case Operation.DIVIDE:
        return num1 / num2;
      default:
        return 0;
    }
  };

  /**
   * Efecto para actualizar la fórmula en el display secundario.
   */
  useEffect(() => {
    if (isError) return;
    if (justCalculated.current) {
      justCalculated.current = false;
      return;
    }
    if (lastOperation) {
      setFormula(`${prevNumber} ${lastOperation} ${number}`);
    } else {
      setFormula(number);
    }
  }, [number, prevNumber, lastOperation, isError]);

  /**
   * Reinicia la calculadora a su estado inicial.
   */
  const clean = () => {
    setNumber('0');
    setPrevNumber('0');
    setLastOperation(undefined);
    setFormula('0');
    setIsError(false);
  };

  /**
   * Borra el último dígito del número actual.
   */
  const deleteLast = () => {
    if (isError) return;
    if (number.length > 1) {
      setNumber(number.slice(0, -1));
    } else {
      setNumber('0');
    }
  };

  /**
   * Alterna el signo del número actual.
   */
  const toggleSign = () => {
    if (isError) return;
    if (number.includes('-')) {
      setNumber(number.replace('-', ''));
    } else {
      setNumber('-' + number);
    }
  };

  /**
   * Construye el número actual basado en la entrada del usuario.
   * @param inputString El dígito o punto presionado.
   */
  const buildNumber = (inputString: string) => {
    if (isError) return;
    if (number.length >= 16 && inputString !== '.') return;
    if (number.includes('.') && inputString === '.') return;

    if (number === '0' || number === '-0') {
      if (inputString === '.') {
        setNumber(number + inputString);
      } else if (number.startsWith('-')) {
        setNumber('-' + inputString);
      } else {
        setNumber(inputString);
      }
    }
    else {
      setNumber(number + inputString);
    }
  };

  /**
   * Establece la operación aritmética actual.
   * Si hay una operación pendiente, la resuelve primero.
   * @param operation La operación a establecer.
   */
  const setOperation = (operation: Operation) => {
    if (isError) return;
    if (number.endsWith('.')) {
      setNumber(number.slice(0, -1));
    }

    if (prevNumber !== '0' && lastOperation) {
      const num1 = Number(prevNumber);
      const num2 = Number(number);
      const result = performCalculation(num1, num2, lastOperation);
      setPrevNumber(`${result}`);
    } else {
      setPrevNumber(number);
    }

    setNumber('0');
    setLastOperation(operation);
  };

  /**
   * Realiza el cálculo final al presionar '='.
   * Maneja el error de división por cero.
   */
  const calculate = () => {
    if (!lastOperation) return;

    const num1 = Number(prevNumber);
    const num2 = Number(number);

    if (lastOperation === Operation.DIVIDE && num2 === 0) {
      setIsError(true);
      setNumber('Error');
      setFormula('No se puede dividir por cero');
      return;
    }

    const result = performCalculation(num1, num2, lastOperation);

    setFormula(`${prevNumber} ${lastOperation} ${number} =`);
    setNumber(`${result}`);
    setPrevNumber('0');
    setLastOperation(undefined);
    justCalculated.current = true;
  };

  /**
   * Manejador principal para todas las pulsaciones de botones.
   * @param button El objeto del botón presionado.
   */
  const handlePress = (button: ButtonDef) => {
    if (button.value !== 'C' && isError) {
      return;
    }

    switch (button.value) {
      case 'C':
        clean();
        break;
      case '+/-':
        toggleSign();
        break;
      case 'del':
        deleteLast();
        break;
      case '+':
        setOperation(Operation.ADD);
        break;
      case '-':
        setOperation(Operation.SUBTRACT);
        break;
      case '*':
        setOperation(Operation.MULTIPLY);
        break;
      case '/':
        setOperation(Operation.DIVIDE);
        break;
      case '=':
        calculate();
        break;
      default:
        buildNumber(button.value);
        break;
    }
  };

  // --- VALORES DE RETORNO ---
  return {
    // Propiedades
    formula,
    number,
    prevNumber,
    // Métodos
    handlePress,
  };
};
