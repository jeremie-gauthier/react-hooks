import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useCounter } from '../lib/useCounter';

describe('useCounter', () => {
  it('should works with default options', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
    expect(result.current.increment).toBeDefined();
    expect(result.current.decrement).toBeDefined();

    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);

    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(0);
  });

  it('should works with custom options', () => {
    const INITIAL_VALUE = 42;
    const STEP = 4;
    const { result } = renderHook(() =>
      useCounter({
        initialCount: INITIAL_VALUE,
        step: STEP,
      }),
    );

    expect(result.current.count).toBe(INITIAL_VALUE);
    expect(result.current.increment).toBeDefined();
    expect(result.current.decrement).toBeDefined();

    const expectedAdd = INITIAL_VALUE + STEP;
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(expectedAdd);

    const expectedSub = INITIAL_VALUE;
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(expectedSub);
  });
});
