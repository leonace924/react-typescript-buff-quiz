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

      // Convert question api format to project Question type format, for multiple correct answers
      newQuestions.map((question, index) => {
        let temp: string[] = [];
        temp.push(question.correct_answer);
        question.correct_answers = temp;

        question.type = atob(question.type);
        question.question = atob(question.question);
        question.category = atob(question.category);
        question.difficulty = atob(question.difficulty);
        question.correct_answers = question?.correct_answers?.map((x) => atob(x));
        question.incorrect_answers = question?.incorrect_answers?.map((x) => atob(x));
        
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
