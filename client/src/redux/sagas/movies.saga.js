import { takeEvery, put, call } from 'redux-saga/effects';
import { START_INIT_MOVIES } from '../types';
import { initMovies } from '../actions/movies.action';
import { endLoading } from '../actions/loading.action';
import { apiUrl } from '../../utils/apiUrls';

async function getMoviesFromServer() {
  const moviesFromApi = await fetch(`${apiUrl}/games/movies`, {
    method: 'GET',
    credentials: 'include'
  });
  const movies = await moviesFromApi.json();

  return movies;
}

function* getMoviesWorker() {
  const movies = yield call(getMoviesFromServer);
  yield put(initMovies(movies));
  yield put(endLoading());
}

function* moviesWatcher() {
  yield takeEvery(START_INIT_MOVIES, getMoviesWorker);
}

export default moviesWatcher;
