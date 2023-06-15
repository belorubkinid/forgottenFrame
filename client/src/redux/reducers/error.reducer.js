import {
  INIT_ERROR_MESSAGE,
  RESET_ERROR
} from "../types";

function errorReducer(state = {}, action) {
  switch(action.type) {
    case INIT_ERROR_MESSAGE: {
      return { message: action.payload }
    }
    case RESET_ERROR: {
      return {};
    }
    default: {
      return state;
    }
  }
}

export default errorReducer;
