import { useState } from 'react';

const defaultOptions = {
  initialValue: 0,
  step: 1,
};

export const useCounter = ({ initialValue, step } = defaultOptions) => {
  const [count, setCount] = useState(initialValue);

  return {
    count,
    add: () => setCount((count) => count + step),
    sub: () => setCount((count) => count - step),
  };
};
