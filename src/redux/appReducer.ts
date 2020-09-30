import { createStore, combineReducers, applyMiddleware } from "redux";

import createSagaMiddleware from "redux-saga";

import rootSaga from "./sagas/rootSaga";

import * as sportwebservice from "./actions/questionwebservice";

import { Question } from "../types/Question";

export interface QuizState {
  questions: Question[];
  selectedIndex: Number;
}
const initialQuizState: QuizState = {
  questions: [],
  selectedIndex: -1,
};

function questionReduxReducer(state = initialQuizState, action) {
  switch (action.type) {
    case sportwebservice.Types.GET_QUESTIONS_SUCCESS:
      let newQuestions: Question[] = [...action.payload.results, ...state.questions];

      newQuestions.map((question, index) => {
        let temp: string[] = [];
        temp.push(question.correct_answer);

        question.correct_answers = temp;
        return question;
      });

      return {
        questions: newQuestions,
      };
    case sportwebservice.Types.DELETE_QUESTION_REQUEST:
      return {
        questions: [
          ...state.questions.slice(0, action.payload.index),
          ...state.questions.slice(action.payload.index + 1),
        ],
      };

    case sportwebservice.Types.EDIT_QUESTION_REQUEST:
      return {
        selectedIndex: action.payload.index,
        questions: [...state.questions],
      };

    case sportwebservice.Types.UPDATE_QUESTION_REQUEST:
      return {
        selectedIndex: action.payload.index,
        questions: [
          ...state.questions.slice(0, action.payload.index),
          action.payload.data,
          ...state.questions.slice(action.payload.index + 1),
        ],
      };

    default:
      return state;
  }
}

const overallReducer = combineReducers({
  quiz: questionReduxReducer,
});

// Sage Middleware is used for fetching external resources.
const sagaMiddleware = createSagaMiddleware();

const store = createStore(overallReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export { store };
