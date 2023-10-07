import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useStack } from '../lib/useStack';

describe('useStack', () => {
  it('should add new item at the end of the stack', () => {
    const { result } = renderHook(() => useStack<number>());

    expect(result.current.stack).toStrictEqual([]);

    act(() => {
      result.current.add(1);
    });
    expect(result.current.stack).toStrictEqual([1]);

    act(() => {
      result.current.add(2);
    });
    expect(result.current.stack).toStrictEqual([1, 2]);
  });

  it('should remove item from the tail of the stack', async () => {
    const { result } = renderHook(() => useStack<number>([1, 2, 3, 4]));

    expect(result.current.stack).toStrictEqual([1, 2, 3, 4]);

    let tail = await act(() => {
      return result.current.remove();
    });
    expect(result.current.stack).toStrictEqual([1, 2, 3]);
    expect(tail).toBe(4);

    tail = await act(() => {
      return result.current.remove();
    });
    expect(result.current.stack).toStrictEqual([1, 2]);
    expect(tail).toBe(3);
  });

  it('should clear the stack', () => {
    const { result } = renderHook(() => useStack<number>([1, 2, 3, 4]));

    expect(result.current.stack).toStrictEqual([1, 2, 3, 4]);

    act(() => {
      result.current.clear();
    });
    expect(result.current.stack).toStrictEqual([]);
  });

  it('should peek the tail of the stack', async () => {
    const { result } = renderHook(() => useStack<number>([1, 2, 3, 4]));

    expect(result.current.stack).toStrictEqual([1, 2, 3, 4]);

    const tail = await act(() => result.current.peek());
    expect(tail).toBe(4);
    expect(result.current.stack).toStrictEqual([1, 2, 3, 4]);
  });

  it('should update the size of the stack', () => {
    const { result } = renderHook(() => useStack<number>([]));

    expect(result.current.size).toBe(0);

    act(() => {
      result.current.add(1);
    });
    expect(result.current.size).toBe(1);

    act(() => {
      result.current.add(2);
    });
    expect(result.current.size).toBe(2);

    act(() => {
      result.current.remove();
    });
    expect(result.current.size).toBe(1);

    act(() => {
      result.current.remove();
    });
    expect(result.current.size).toBe(0);

    act(() => {
      result.current.remove();
    });
    expect(result.current.size).toBe(0);
  });

  it('should update the isEmpty boolean', () => {
    const { result } = renderHook(() => useStack<number>());

    expect(result.current.isEmpty).toBe(true);

    act(() => {
      result.current.add(1);
    });
    expect(result.current.isEmpty).toBe(false);

    act(() => {
      result.current.clear();
    });
    expect(result.current.isEmpty).toBe(true);
  });
});
