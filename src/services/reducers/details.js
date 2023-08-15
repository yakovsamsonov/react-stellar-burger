import { OPEN_DETAILS, CLOSE_DETAILS } from '../actions/details';

const initialState = {
  detailsOpen: false,
  card: {},
};

export const detailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DETAILS: {
      return {
        detailsOpen: true,
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
