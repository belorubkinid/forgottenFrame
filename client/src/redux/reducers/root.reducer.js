import { combineReducers } from "redux";
import playerReducer from "./player.reducer";
import moviesReducer from "./movies.reduces";
import ratingReducer from "./rating.reducer";
import loadingReducer from "./loading.reducer";
import errorReducer from "./error.reducer";

const rootReducer = combineReducers({
  player: playerReducer,
  movies: moviesReducer,
  rating: ratingReducer,
  loading: loadingReducer,
  error: errorReducer,
});

export default rootReducer;
