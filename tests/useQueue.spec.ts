import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useQueue } from '../lib/useQueue';

describe('useQueue', () => {
  it('should add new item at the end of the queue', () => {
    const { result } = renderHook(() => useQueue<number>());

    expect(result.current.queue).toStrictEqual([]);

    act(() => {
      result.current.add(1);
    });
    expect(result.current.queue).toStrictEqual([1]);

    act(() => {
      result.current.add(2);
    });
    expect(result.current.queue).toStrictEqual([1, 2]);
  });

  it('should remove item from the head of the queue', () => {
    const { result } = renderHook(() => useQueue<number>([1, 2, 3, 4]));

    expect(result.current.queue).toStrictEqual([1, 2, 3, 4]);

    act(() => {
      result.current.remove();
    });
    expect(result.current.queue).toStrictEqual([2, 3, 4]);

    act(() => {
      result.current.remove();
    });
    expect(result.current.queue).toStrictEqual([3, 4]);
  });

  it('should clear the queue', () => {
    const { result } = renderHook(() => useQueue<number>([1, 2, 3, 4]));

    expect(result.current.queue).toStrictEqual([1, 2, 3, 4]);

    act(() => {
      result.current.clear();
    });
    expect(result.current.queue).toStrictEqual([]);
  });

  it('should peek the head of the queue', async () => {
    const { result } = renderHook(() => useQueue<number>([1, 2, 3, 4]));

    expect(result.current.queue).toStrictEqual([1, 2, 3, 4]);

    const head = await act(() => result.current.peek());
    expect(head).toBe(1);
    expect(result.current.queue).toStrictEqual([1, 2, 3, 4]);
  });

  it('should update the size of the queue', () => {
    const { result } = renderHook(() => useQueue<number>([]));

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
    const { result } = renderHook(() => useQueue<number>());

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
