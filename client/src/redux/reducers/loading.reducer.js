import { END_LOADING, START_LOADING } from "../types";

function loadingReducer(state = { status: true }, action) {
  switch(action.type) {
    case START_LOADING: {
      return { status: true };
    }
    case END_LOADING: {
      return { status: false };
    }
    default: {
      return state;
    }
  }
}

export default loadingReducer;
