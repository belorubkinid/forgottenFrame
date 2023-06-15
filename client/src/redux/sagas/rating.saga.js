import { takeEvery, put, call } from 'redux-saga/effects';
import { START_INIT_OVERAL_RATING } from '../types';
import { initOveralRating } from '../actions/rating.action';
import { endLoading } from '../actions/loading.action';
import { apiUrl } from '../../utils/apiUrls';

async function getRatingFromServer() {
  const response = await fetch(`${apiUrl}/players/rating`, {
    method: 'GET',
    credentials: 'include'
  });
  const unpackedResponse = await response.json();
  return unpackedResponse;
}

function* ratingWorker() {
  const rating = yield call(getRatingFromServer);
  yield put(initOveralRating(rating));
  yield put(endLoading());
}

function* ratingWatcher() {
  yield takeEvery(START_INIT_OVERAL_RATING, ratingWorker);
}

export default ratingWatcher;
