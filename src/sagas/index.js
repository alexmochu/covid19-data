import { all, fork } from 'redux-saga/effects';
import { watchIncrementAsync, helloDc } from '../app/Homepage/operations/auth.data';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    fork(watchIncrementAsync),
    fork(helloDc),
  ]);
}