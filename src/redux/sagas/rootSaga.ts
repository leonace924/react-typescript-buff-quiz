import { all } from 'redux-saga/effects';
import { watchGetQuestionsRequest } from './questions';

export default function* rootSaga() {
  yield all([
    watchGetQuestionsRequest()
  ]);
}
