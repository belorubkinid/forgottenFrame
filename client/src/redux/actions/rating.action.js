import {
  START_INIT_OVERAL_RATING,
  INIT_OVERAL_RATING,
} from "../types";

export function startInitOveralRating() {
  return ({
    type: START_INIT_OVERAL_RATING
  })
}

export function initOveralRating(rating) {
  return ({
    type: INIT_OVERAL_RATING,
    payload: rating
  })
}
