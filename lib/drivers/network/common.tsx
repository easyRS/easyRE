import { DELETE_METHOD, POST_METHOD, PUT_METHOD } from './constants';

type AllowedType = IEntity | StepMapper | Record<string, unknown>;

export const call = async (
  apiObj: CallApiObject,
  onSuccess?: (sucessObj: Response) => void,
  onError?: () => void
) => {
  try {
    const result = await fetch(window.location.origin + apiObj.endpoint, {
      method: apiObj.method,
      body: JSON.stringify(apiObj.data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (onSuccess) onSuccess(result);
  } catch (error) {
    /* eslint-disable-line*/ console.log(error);
    if (onError) onError();
  }
};

export const makePost = async (
  data: AllowedType,
  endpoint: string,
  onSuccess?: (sucessObj: Response) => void,
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
  data: AllowedType,
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
  data: AllowedType,
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
