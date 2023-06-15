import { takeEvery, put, call } from 'redux-saga/effects';
import { initPlayedGames, initSession, logout } from '../actions/player.actions';
import { createError } from '../actions/error.action';
import {
  START_INIT_SESSION,
  START_REGISTRATION,
  START_LOGOUT,
  START_LOGIN,
  START_INIT_PLAYED_GAMES_COUNT,
  START_UPDATE_PLAYER_RAITING
} from '../types';
import { apiUrl } from '../../utils/apiUrls';

async function isSessionFetch() {
    try {
      const response = await fetch(apiUrl, { credentials: 'include'});
      const res = await response.json();
      if (res.message === 'session') {
        return res;
      };
      return false;
    } catch (error) {
      console.log(error);
    }
}


async function registrationFetch({ payload: { data } }) {
  try {
    const response = await fetch(`${apiUrl}/authentication/registration`, {
      method: 'POST',
      credentials : 'include',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    const unpackedresponse = await response.json();
    return unpackedresponse; 
  } catch (error) {
    console.error(error);
  }
}

async function loginFetch({ payload: { data } }) {
  try {
    const response = await fetch(`${apiUrl}/authentication/login`, {
      method: 'POST',
      credentials : 'include',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    const unpackedresponse = await response.json();
    return unpackedresponse; 
  } catch (error) {
    console.error(error);
  }
}

async function logoutFetch() {
  try {
    const response = await fetch(`${apiUrl}/authentication/logout`, {
      credentials: 'include'
    });
    const unpackedResponse = await response.json();
    if (unpackedResponse.message) return true;
  } catch (error) {
    console.error(error);
  }
}

async function recordRatingOnServer({ payload }) {
  try {
    const response = await fetch(`${apiUrl}/players/rating`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ rating: payload }),
    });
    const unpackedresponse = await response.json();
    return unpackedresponse;
  } catch (error) {
    console.error(error);
  }
}

async function getPlayedGamesCountFromServer() {
  try {
    const response = await fetch(`${apiUrl}/players/played_games_count`, {
      credentials: 'include'
    });
    const unpackedresponse = await response.json();
    return unpackedresponse;
  } catch (error) {
    return console.error(error);
  }
}

function* isSessionWorker() {
  try {
    const response = yield call(isSessionFetch);
    if (response.message) {
     yield put(initSession(response));
     return;
    }
  } catch (error) {
    console.error(error);
  }
}

function* registrationWorker(action) {
  try {
    const response = yield call(registrationFetch, action);
    if (response.message) {
      yield put(initSession(response));
      return;
    }
    yield put(createError(response.error));
  } catch (error) {
    console.error(error);
  }
}

function* loginWorker(action) {
  try {
    const response = yield call(loginFetch, action);
    if (response.message) {
      yield put(initSession(response));
      return;
    }
    yield put(createError(response.error));
  } catch (error) {
    console.error(error);
  }
}

function* logoutWorker() {
  try {
    const response = yield call(logoutFetch);
    if (response) {
      yield put(logout());
      return;
    }
    yield call(console.error, response.message);
  } catch (error) {
    console.error(error);
  }
}

function* ratingRecorderWorker(action) {
  try {
    const response = yield call(recordRatingOnServer, action);
    if (response.message) return;
    yield put(createError(response.error));
  } catch (error) {
    console.error(error);
  }
}

function* getPlayedGamesCountWorker() {
  try {
    const response = yield call(getPlayedGamesCountFromServer);
    if (response) return yield put(initPlayedGames(response.playedGamesCount));
    yield put(createError(response.error));
  } catch (error) {
    console.error(error);
  }
}

export function* playerWatcher() {
  yield takeEvery(START_INIT_SESSION, isSessionWorker);
  yield takeEvery(START_REGISTRATION, registrationWorker);
  yield takeEvery(START_LOGOUT, logoutWorker);
  yield takeEvery(START_LOGIN, loginWorker);
  yield takeEvery(START_UPDATE_PLAYER_RAITING, ratingRecorderWorker);
  yield takeEvery(START_INIT_PLAYED_GAMES_COUNT, getPlayedGamesCountWorker);
}

export default playerWatcher;
