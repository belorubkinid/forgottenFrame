import {
  INIT_SESSION,
  LOGOUT,
  START_INIT_SESSION,
  START_REGISTRATION,
  START_LOGOUT,
  START_LOGIN,
  INIT_PLAYED_GAMES_COUNT,
  START_INIT_PLAYED_GAMES_COUNT,
  UPDATE_PLAYED_GAMES,
  RESET_RATING,
  INIT_PLAYER_RATING,
  START_UPDATE_PLAYER_RAITING
} from "../types";

export function startInitSession() {
  return ({
    type: START_INIT_SESSION,
  });
}

export function initSession(nickname) {
  return ({
    type: INIT_SESSION,
    payload: nickname
  });
}

export function startRegistration(data) {
  return ({
    type: START_REGISTRATION,
    payload: {data}, 
  });
}

export function startLogin(data) {
  return ({
    type: START_LOGIN,
    payload: {data}, 
  });
}

export function startLogout() {
  return ({
    type: START_LOGOUT,
  })
}

export function logout() {
  return ({
    type: LOGOUT,
  })
}


export function initPlayedGames(playedGamesCount) {
  return ({
    type: INIT_PLAYED_GAMES_COUNT,
    payload: playedGamesCount
  })
}

export function startInitPlayedGames() {
  return ({
    type: START_INIT_PLAYED_GAMES_COUNT
  })
}

export function updatePlayedGames(playedGamesCount) {
  return ({
    type: UPDATE_PLAYED_GAMES,
    payload: playedGamesCount,
  })
}

export function resetPlayerRating() {
  return ({
    type: RESET_RATING
  })
}

export function initPlayerRating(rightAnswersCount) {
  return ({
    type: INIT_PLAYER_RATING,
    payload: rightAnswersCount,
  })
}

export function startUpdatePlayerRating(rating) {
  return ({
    type: START_UPDATE_PLAYER_RAITING,
    payload: rating
  })
}
