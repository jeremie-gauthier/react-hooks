import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useCounter } from '../lib/useCounter';

describe('useCounter', () => {
  it('should works with default options', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
    expect(result.current.add).toBeDefined();
    expect(result.current.sub).toBeDefined();

    act(() => result.current.add());
    expect(result.current.count).toBe(1);

    act(() => result.current.sub());
    expect(result.current.count).toBe(0);
  });

  it('should works with custom options', () => {
    const INITIAL_VALUE = 42;
    const STEP = 4;
    const { result } = renderHook(() =>
      useCounter({
        initialValue: INITIAL_VALUE,
        step: STEP,
      }),
    );

    expect(result.current.count).toBe(INITIAL_VALUE);
    expect(result.current.add).toBeDefined();
    expect(result.current.sub).toBeDefined();

    const expectedAdd = INITIAL_VALUE + STEP;
    act(() => result.current.add());
    expect(result.current.count).toBe(expectedAdd);

    const expectedSub = INITIAL_VALUE;
    act(() => result.current.sub());
    expect(result.current.count).toBe(expectedSub);
  });
});
