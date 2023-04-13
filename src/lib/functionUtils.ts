// credit: https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};
