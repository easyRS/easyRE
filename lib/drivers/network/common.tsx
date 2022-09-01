import { DELETE_METHOD, POST_METHOD, PUT_METHOD } from './constants';

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

export const makePost = async (
  data: Record<string, unknown>,
  endpoint: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  await call(
    {
      endpoint,
      method: POST_METHOD,
      data
    },
    onSuccess,
    onError
  );
};

export const makePut = async (
  data: Record<string, unknown>,
  endpoint: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  await call(
    {
      endpoint,
      method: PUT_METHOD,
      data
    },
    onSuccess,
    onError
  );
};

export const makeDelete = async (
  data: Record<string, unknown>,
  endpoint: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  await call(
    {
      endpoint,
      method: DELETE_METHOD,
      data
    },
    onSuccess,
    onError
  );
};
