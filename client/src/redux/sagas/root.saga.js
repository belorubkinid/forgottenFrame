import { all, call } from 'redux-saga/effects';
import playerWatcher from './player.saga';
import moviesWatcher from './movies.saga';
import ratingWatcher from './rating.saga';


function* rootSaga() {
  yield all([
    call(playerWatcher),
    call(moviesWatcher),
    call(ratingWatcher)
  ]);
}

export default rootSaga;
