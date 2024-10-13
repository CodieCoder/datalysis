import { GENERAL_ERRORS } from './constants';

export const generateError = (error?: string) => {
  if (!error) {
    return GENERAL_ERRORS.INFERENCE.GET_CODE;
  } else {
    error;
  }
};
