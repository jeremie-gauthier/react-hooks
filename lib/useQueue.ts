import { useReducer } from 'react';

/**
 * The type of the queue
 * @template Item Type of the `queue` elements.
 */
type Queue<Item> = Array<Item>;
type QueueAction<Item> =
  | { type: 'ENQUEUE'; item: Item }
  | { type: 'DEQUEUE' }
  | { type: 'CLEAR' };

const queueReducer = <Item>(queue: Queue<Item>, action: QueueAction<Item>) => {
  switch (action.type) {
    case 'ENQUEUE':
      return [...queue, action.item];
    case 'DEQUEUE':
      return queue.slice(1);
    case 'CLEAR':
      return [];
  }
};

/**
 * A custom hook for managing a queue of items.
 * @param initialValues Initial values for the queue.
 * @template Item Type of the `queue` elements.
 */
export const useQueue = <Item>(initialValues: Queue<Item> = []) => {
  const [queue, dispatch] = useReducer(queueReducer<Item>, initialValues);

  const enqueue = (item: Item) => dispatch({ type: 'ENQUEUE', item });
  const dequeue = () => {
    const first = peek();
    dispatch({ type: 'DEQUEUE' });
    return first;
  };
  const clear = () => dispatch({ type: 'CLEAR' });
  const peek = () => queue[0];

  return {
    /**
     * A reference to the queue structure.
     */
    queue,
    /**
     * Add an item to the end of the queue.
     * @param item The item to enqueue.
     */
    add: enqueue,
    /**
     * Remove an item from the head of the queue.
     * @returns The item removed.
     */
    remove: dequeue,
    /**
     * Empty the whole queue.
     */
    clear: clear,
    /**
     * Peek at the first item in the queue without removing it.
     * @returns The first item in the queue, or undefined if the queue is empty.
     */
    peek: peek,
    /**
     * The current size of the queue.
     */
    size: queue.length,
    /**
     * A boolean to state if the queue is empty or not.
     */
    isEmpty: queue.length === 0,
  };
};
