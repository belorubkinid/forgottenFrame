import {
  INIT_SESSION,
  REGISTRATION,
  LOGOUT,
  INIT_PLAYED_GAMES_COUNT,
  INIT_PLAYER_RATING,
  RESET_RATING,
  } from "../types";

function playerReducer(state = {}, action) {
  switch(action.type) {
    case REGISTRATION: {
      return { session: true };
    }
    case INIT_SESSION: {
      return { session: true, nickname: action.payload.nickname, playedGamesCount: action.payload.playedGamesCount };
    }
    case LOGOUT: {
      return { session: false };
    }
    case INIT_PLAYER_RATING: {
      return {...state, rating: action.payload};
    }
    case RESET_RATING: {
      return {...state, rating: 0};
    }
    case INIT_PLAYED_GAMES_COUNT: {
      return {...state, playedGamesCount: action.payload}
    }
    default: {
      return state;
    }
  }
}

export default playerReducer;
