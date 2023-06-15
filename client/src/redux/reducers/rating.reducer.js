import {
  INIT_OVERAL_RATING,
} from "../types";

function ratingReducer(state = [], action) {
  switch(action.type) {
    case INIT_OVERAL_RATING: {
      return [...action.payload];
    }
    default: {
      return state;
    }
  }
}

export default ratingReducer;
