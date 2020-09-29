let data = {
  category: null,
  level: null,
  questions: [],
  submittedAnswers: [],
  total: 0,
};

const rootReducer = (state = data, action) => {
  switch (action.type) {
    case 'CATEGORY':
      return {
        ...state,
        category: action.payload,
      };
    case 'LEVEL':
      return {
        ...state,
        level: action.payload,
      };
    case 'QUESTION':
      return {
        ...state,
        questions: action.payload,
      };
    case 'ANSWER':
      return {
        ...state,
        submittedAnswers: action.payload,
      };
    case 'RESULT':
      return {
        ...state,
        total: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
