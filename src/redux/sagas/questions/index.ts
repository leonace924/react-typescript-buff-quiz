import {
  takeEvery, call, put
} from 'redux-saga/effects';
import * as actions from '../../actions/questionwebservice';
import * as sportsapi from '../../../api/sportsapi';

function* getQuestions() {
  try {
    const result = yield call(sportsapi.getQuestions);

    if (result && result.response_code === 0) {
      yield put(actions.getQuestionsSuccess(result));
    } else {
      yield put(actions.getQuestionsFailure(result));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetQuestionsRequest() {
  yield takeEvery(actions.Types.GET_QUESTIONS_REQUEST, getQuestions);
}
