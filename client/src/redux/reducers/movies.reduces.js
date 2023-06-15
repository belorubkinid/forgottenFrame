import { INIT_MOVIES } from "../types";

function moviesReducer(state = [], action) {
  switch(action.type) {
    case INIT_MOVIES: {
      return [...action.payload];
    }
    default: {
      return state;
    }
  }
}
export default moviesReducer;
