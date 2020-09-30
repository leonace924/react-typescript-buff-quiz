

export const Types = {
  GET_QUESTIONS_REQUEST: 'GET_QUESTIONS_REQUEST',
  GET_QUESTIONS_SUCCESS: 'GET_QUESTIONS_SUCCESS',
  GET_QUESTIONS_FAILURE: 'GET_QUESTIONS_FAILURE',
  DELETE_QUESTION_REQUEST: 'DELETE_QUESTION_REQUEST',
  EDIT_QUESTION_REQUEST: 'EDIT_QUESTION_REQUEST',
  UPDATE_QUESTION_REQUEST: 'UPDATE_QUESTION_REQUEST',
};

export const getQuestionsRequest = () => ({
  type: Types.GET_QUESTIONS_REQUEST,
  payload: {}
});

export const getQuestionsSuccess = (data) => ({
  type: Types.GET_QUESTIONS_SUCCESS,
  payload: data
});

export const getQuestionsFailure = (data) => ({
  type: Types.GET_QUESTIONS_FAILURE,
  payload: data
});

export const editQuestionRequest = (index) => ({
  type: Types.EDIT_QUESTION_REQUEST,
  payload: {
    index: index
  }
});

export const updateQuestionRequest = (index, data) => ({
  type: Types.UPDATE_QUESTION_REQUEST,
  payload: {
    index: index,
    data: data
  }
});

export const deleteQuestionRequest = (index) => ({
  type: Types.DELETE_QUESTION_REQUEST,
  payload: { index: index }
});

