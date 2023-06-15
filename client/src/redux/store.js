import { legacy_createStore as createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer from "./reducers/root.reducer";
import initialState from "./state";
import rootSaga from "./sagas/root.saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
