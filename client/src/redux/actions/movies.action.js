import {
  START_INIT_MOVIES,
  INIT_MOVIES
} from "../types";

export function startInitMovies() {
  return ({
    type: START_INIT_MOVIES,
  });
}

export function initMovies(movies) {
  return ({
    type: INIT_MOVIES,
    payload: movies,
  });
}
