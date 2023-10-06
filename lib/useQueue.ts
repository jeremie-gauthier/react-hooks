import { useReducer } from 'react';

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
    queue,
    add: enqueue,
    remove: dequeue,
    clear,
    peek,
    size: queue.length,
    isEmpty: queue.length === 0,
  };
};
