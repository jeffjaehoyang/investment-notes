import { KEY_EVENT_TYPE, KEY_NAME_ESC } from '@/lib/constants';
import React from 'react';

// credit: https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

// credit: https://keyholesoftware.com/2022/07/13/cancel-a-react-modal-with-escape-key-or-external-click/
// custom hook to close create record modal when user presses esc key
export function useEscapeKey(handleClose: () => void) {
  const handleEscKey = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === KEY_NAME_ESC) {
        handleClose();
      }
    },
    [handleClose]
  );

  React.useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    };
  }, [handleEscKey]);
}
