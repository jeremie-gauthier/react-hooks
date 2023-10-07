import { useReducer } from 'react';

/**
 * The type of the stack
 * @template Item Type of the `stack` elements.
 */
type Stack<Item> = Item[];
type StackAction<Item> =
  | { type: 'PUSH'; item: Item }
  | { type: 'POP' }
  | { type: 'CLEAR' };

const stackReducer = <Item>(stack: Stack<Item>, action: StackAction<Item>) => {
  switch (action.type) {
    case 'CLEAR':
      return [];
    case 'POP':
      return stack.slice(0, -1);
    case 'PUSH':
      return [...stack, action.item];
  }
};

/**
 * A custom hook for managing a stack of items.
 * @param initialValues Initial values for the stack.
 * @template Item Type of the `stack` elements.
 */
export const useStack = <Item>(initialValues: Stack<Item> = []) => {
  const [stack, dispatch] = useReducer(stackReducer, initialValues);

  const push = (item: Item) => {
    dispatch({ type: 'PUSH', item });
  };
  const pop = () => {
    const tail = peek();
    dispatch({ type: 'POP' });
    return tail;
  };
  const clear = () => {
    dispatch({ type: 'CLEAR' });
  };
  const peek = () => stack.at(-1);

  return {
    /**
     * A reference to the stack structure.
     */
    stack,
    /**
     * Add an item to the end of the stack.
     * @param item The item to push.
     */
    add: push,
    /**
     * Remove an item from the tail of the stack.
     * @returns The item removed.
     */
    remove: pop,
    /**
     * Empty the whole stack.
     */
    clear: clear,
    /**
     * Peek at the last item in the stack without removing it.
     * @returns The last item in the stack, or undefined if the stack is empty.
     */
    peek: peek,
    /**
     * The current size of the stack.
     */
    size: stack.length,
    /**
     * A boolean to state if the stack is empty or not.
     */
    isEmpty: stack.length === 0,
  };
};
