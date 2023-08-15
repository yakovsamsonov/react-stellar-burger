import { OPEN_DETAILS, CLOSE_DETAILS } from '../actions/details';

const initialState = {
  isOpen: false,
  card: {},
};

export const detailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DETAILS: {
      return {
        isOpen: true,
        card: action.card,
      };
    }
    case CLOSE_DETAILS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
