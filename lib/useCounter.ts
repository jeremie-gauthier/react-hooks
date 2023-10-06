import { useState } from 'react';

const DEFAULT_OPTIONS = {
  initialCount: 0,
  step: 1,
};

/**
 * A custom hook to manage a counter.
 * @param options An object to define custom behaviour of the counter.
 * @param options.initialCount The initial value of the counter.
 * @param options.step The increment to add or sub for every operation.
 * @returns An object containing the current value of the counter and some functions to update it.
 * @example
 * // Initialize a counter with a step size of 2
 * const { count, increment, decrement } = useCounter({ initialCount: 0, step: 2 });
 * // Increment the counter
 * increment(); // count becomes 2
 * // Decrement the counter
 * decrement(); // count becomes 0
 */
export const useCounter = ({ initialCount, step } = DEFAULT_OPTIONS) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount((currentCount) => currentCount + step);
  const decrement = () => setCount((currentCount) => currentCount - step);

  return {
    /**
     * The current value of the counter.
     */
    count,
    /**
     * Increment the counter using the `step` argument.
     */
    increment: increment,
    /**
     * Decrement the counter using the `step` argument.
     */
    decrement: decrement,
  };
};
