import { renderHook, act } from '@testing-library/react-hooks';
import { useCalculator } from './useCalculator';

describe('useCalculator', () => {
  it('should return initial values', () => {
    const { result } = renderHook(() => useCalculator());
    expect(result.current.number).toBe('0');
    expect(result.current.prevNumber).toBe('0');
    expect(result.current.formula).toBe('0');
  });

  it('should build number correctly', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handlePress({ label: '1', value: '1', variant: 'number' });
    });
    expect(result.current.number).toBe('1');

    act(() => {
      result.current.handlePress({ label: '2', value: '2', variant: 'number' });
    });
    expect(result.current.number).toBe('12');
  });

  it('should handle decimal point', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handlePress({ label: '1', value: '1', variant: 'number' });
    });
    act(() => {
      result.current.handlePress({ label: '.', value: '.', variant: 'number' });
    });
    expect(result.current.number).toBe('1.');

    act(() => {
      result.current.handlePress({ label: '2', value: '2', variant: 'number' });
    });
    expect(result.current.number).toBe('1.2');

    // Should not add multiple decimal points
    act(() => {
      result.current.handlePress({ label: '.', value: '.', variant: 'number' });
    });
    expect(result.current.number).toBe('1.2');
  });

  it('should handle initial zero correctly', () => {
    const { result } = renderHook(() => useCalculator());

    // 0 -> 5
    act(() => {
      result.current.handlePress({ label: '5', value: '5', variant: 'number' });
    });
    expect(result.current.number).toBe('5');
    act(() => {
      result.current.handlePress({ label: 'C', value: 'C', variant: 'function' });
    });

    // 0 -> 0.
    act(() => {
      result.current.handlePress({ label: '.', value: '.', variant: 'number' });
    });
    expect(result.current.number).toBe('0.');
    act(() => {
      result.current.handlePress({ label: 'C', value: 'C', variant: 'function' });
    });

    // -0 -> -5
    act(() => {
      result.current.handlePress({ label: '-', value: '-', variant: 'operator' }); // This will set prevNumber to 0 and number to 0
    });
    act(() => {
      result.current.handlePress({ label: '5', value: '5', variant: 'number' });
    });
    expect(result.current.number).toBe('5'); // This is actually 0 - 5, so number should be 5, prevNumber 0, lastOperation -
    // The test case for -0 -> -5 is tricky because the '-' button is an operator, not a sign toggle.
    // Let's re-evaluate this specific test case after implementing the operator logic fully.
    // For now, let's test the +/- button for negative numbers.
  });

  it('should toggle sign', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handlePress({ label: '7', value: '7', variant: 'number' });
    });
    act(() => {
      result.current.handlePress({ label: '+/-', value: '+/-', variant: 'function' });
    });
    expect(result.current.number).toBe('-7');

    act(() => {
      result.current.handlePress({ label: '+/-', value: '+/-', variant: 'function' });
    });
    expect(result.current.number).toBe('7');
  });

  it('should clear the calculator', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handlePress({ label: '9', value: '9', variant: 'number' });
    });
    act(() => {
      result.current.handlePress({ label: '*', value: '*', variant: 'operator' });
    });
    act(() => {
      result.current.handlePress({ label: '2', value: '2', variant: 'number' });
    });
    expect(result.current.number).toBe('2');
    expect(result.current.formula).toBe('9 * 2');

    act(() => {
      result.current.handlePress({ label: 'C', value: 'C', variant: 'function' });
    });
    expect(result.current.number).toBe('0');
    expect(result.current.prevNumber).toBe('0');
    expect(result.current.formula).toBe('0');
  });

  it('should delete last digit', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handlePress({ label: '1', value: '1', variant: 'number' });
    });
    act(() => {
      result.current.handlePress({ label: '2', value: '2', variant: 'number' });
    });
    act(() => {
      result.current.handlePress({ label: '3', value: '3', variant: 'number' });
    });
    expect(result.current.number).toBe('123');

    act(() => {
      result.current.handlePress({ label: 'del', value: 'del', variant: 'function' });
    });
    expect(result.current.number).toBe('12');

    act(() => {
      result.current.handlePress({ label: 'del', value: 'del', variant: 'function' });
    });
    expect(result.current.number).toBe('1');

    act(() => {
      result.current.handlePress({ label: 'del', value: 'del', variant: 'function' });
    });
    expect(result.current.number).toBe('0');
  });

  // Basic Operations
  it('should perform addition', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => { result.current.handlePress({ label: '5', value: '5', variant: 'number' }); });
    act(() => { result.current.handlePress({ label: '+', value: '+', variant: 'operator' }); });
    act(() => { result.current.handlePress({ label: '2', value: '2', variant: 'number' }); });
    act(() => { result.current.handlePress({ label: '=', value: '=', variant: 'operator' }); });
    expect(result.current.number).toBe('7');
    expect(result.current.formula).toBe('5 + 2 =');
  });

  it('should perform subtraction', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => { result.current.handlePress({ label: '8', value: '8', variant: 'number' }); });
    act(() => { result.current.handlePress({ label: '-', value: '-', variant: 'operator' }); });
    act(() => { result.current.handlePress({ label: '3', value: '3', variant: 'number' }); });
    act(() => { result.current.handlePress({ label: '=', value: '=', variant: 'operator' }); });
    expect(result.current.number).toBe('5');
    expect(result.current.formula).toBe('8 - 3 =');
  });

  it('should perform multiplication', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => { result.current.handlePress({ label: '4', value: '4', variant: 'number' }); });
    act(() => { result.current.handlePress({ label: '*', value: '*', variant: 'operator' }); });
    act(() => { result.current.handlePress({ label: '6', value: '6', variant: 'number' }); });
    act(() => { result.current.handlePress({ label: '=', value: '=', variant: 'operator' }); });
    expect(result.current.number).toBe('24');
    expect(result.current.formula).toBe('4 * 6 =');
  });

  it('should perform division', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => { result.current.handlePress({ label: '1', value: '1', variant: 'number' }); });
    act(() => { result.current.handlePress({ label: '0', value: '0', variant: 'number' }); });
    act(() => { result.current.handlePress({ label: '/', value: '/', variant: 'operator' }); });
    act(() => { result.current.handlePress({ label: '2', value: '2', variant: 'number' }); });
    act(() => { result.current.handlePress({ label: '=', value: '=', variant: 'operator' }); });
    expect(result.current.number).toBe('5');
    expect(result.current.formula).toBe('10 / 2 =');
  });

  // Chaining Operations
  it('should handle chained operations (left-to-right)', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => { result.current.handlePress({ label: '1', value: '1', variant: 'number' }); });
    act(() => { result.current.handlePress({ label: '0', value: '0', variant: 'number' }); }); // number = 10
    act(() => { result.current.handlePress({ label: '+', value: '+', variant: 'operator' }); }); // prevNumber = 10, number = 0, lastOp = +
    act(() => { result.current.handlePress({ label: '5', value: '5', variant: 'number' }); }); // number = 5
    act(() => { result.current.handlePress({ label: '-', value: '-', variant: 'operator' }); }); // prevNumber = 15 (10+5), number = 0, lastOp = -
    expect(result.current.prevNumber).toBe('15');
    expect(result.current.number).toBe('0');
    expect(result.current.formula).toBe('15 - 0'); // Formula updates based on new prevNumber and current number
    act(() => { result.current.handlePress({ label: '3', value: '3', variant: 'number' }); }); // number = 3
    act(() => { result.current.handlePress({ label: '=', value: '=', variant: 'operator' }); }); // 15 - 3
    expect(result.current.number).toBe('12');
    expect(result.current.formula).toBe('15 - 3 =');
  });

  // Division by Zero
  it('should handle division by zero', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => { result.current.handlePress({ label: '5', value: '5', variant: 'number' }); });
    act(() => { result.current.handlePress({ label: '/', value: '/', variant: 'operator' }); });
    act(() => { result.current.handlePress({ label: '0', value: '0', variant: 'number' }); });
    act(() => { result.current.handlePress({ label: '=', value: '=', variant: 'operator' }); });
    expect(result.current.number).toBe('Error');
    expect(result.current.formula).toBe('No se puede dividir por cero');

    // Should be locked after error
    act(() => { result.current.handlePress({ label: '8', value: '8', variant: 'number' }); });
    expect(result.current.number).toBe('Error'); // Still error
    act(() => { result.current.handlePress({ label: '+', value: '+', variant: 'operator' }); });
    expect(result.current.number).toBe('Error'); // Still error

    // Should clear on 'C'
    act(() => { result.current.handlePress({ label: 'C', value: 'C', variant: 'function' }); });
    expect(result.current.number).toBe('0');
    expect(result.current.formula).toBe('0');
  });
});
