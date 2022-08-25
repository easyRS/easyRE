export const call = async (
  apiObj: CallApiObject,
  onSuccess?: () => void,
  onError?: () => void
) => {
  try {
    await fetch(apiObj.endpoint, {
      method: apiObj.method,
      body: JSON.stringify(apiObj.data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (onSuccess) onSuccess();
  } catch (error) {
    if (onError) onError();
  }
};
