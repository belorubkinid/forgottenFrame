import {
  INIT_ERROR_MESSAGE,
  RESET_ERROR,
} from "../types";

export function createError(errorMessage) {
  return ({
    type: INIT_ERROR_MESSAGE,
    payload: errorMessage,
  });
}

export function resetError() {
  return ({
    type: RESET_ERROR,
  })
}
