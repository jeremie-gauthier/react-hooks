/**
 * A custom hook to copy and paste data using the clipboard.
 */
export const useClipboard = () => {
  const SUPPORTED_BLOB_TYPE = 'text/plain';

  const copy = async (data: string) => {
    const blob = new Blob([data], {
      type: SUPPORTED_BLOB_TYPE,
    });

    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
  };

  const paste = async () => {
    const clipboardItems = await navigator.clipboard.read();
    const clipboardItem = clipboardItems[0];
    if (!clipboardItem) return;

    const blob = await clipboardItem.getType(SUPPORTED_BLOB_TYPE);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!blob) return;

    const text = await blob.text();
    return text;
  };

  return {
    /**
     * Add an item to the clipboard.
     * @param data The data to copy.
     */
    copy: copy,
    /**
     * Retrieve an item from the clipboard.
     */
    paste: paste,
  };
};
