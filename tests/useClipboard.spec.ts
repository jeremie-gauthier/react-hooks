import { renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useClipboard } from '../lib/useClipboard';

class ClipboardItemMock {
  getType() {
    return {
      text: () => Promise.resolve('Hello, world!'),
    };
  }
}

describe('useClipboard', () => {
  beforeEach(() => {
    userEvent.setup();
    vi.stubGlobal('ClipboardItem', ClipboardItemMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should copy data to clipboard', async () => {
    const { result } = renderHook(() => useClipboard());

    const itemsInClipboardAtBeginning = await navigator.clipboard.read();
    expect(itemsInClipboardAtBeginning).toHaveLength(0);

    const dataToCopy = 'Hello, world!';
    await result.current.copy(dataToCopy);

    const itemsInClipboardAfterCopy = await navigator.clipboard.read();
    expect(itemsInClipboardAfterCopy).toHaveLength(1);
  });

  it('should paste data from clipboard', async () => {
    const { result } = renderHook(() => useClipboard());

    const dataToCopy = 'Hello, world!';
    await navigator.clipboard.write([
      new ClipboardItemMock(),
    ] as unknown as ClipboardItems);

    const pastedData = await result.current.paste();
    expect(pastedData).toEqual(dataToCopy);

    const itemsInClipboardAfterCopyAndPaste = await navigator.clipboard.read();
    expect(itemsInClipboardAfterCopyAndPaste).toHaveLength(1);
  });

  it('should return undefined if clipboard is empty', async () => {
    const { result } = renderHook(() => useClipboard());

    const itemsInClipboardAfterCopyAndPaste = await navigator.clipboard.read();
    expect(itemsInClipboardAfterCopyAndPaste).toHaveLength(0);

    const pastedData = await result.current.paste();
    expect(pastedData).toBeUndefined();
  });
});
