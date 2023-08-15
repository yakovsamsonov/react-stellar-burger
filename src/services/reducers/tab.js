import { BURGER } from '../../components/constants/constants';
import { TAB_SWITCH } from '../actions/tab';

const initialState = { name: BURGER };

export const tabReducer = (state = initialState, action) => {
  switch (action.type) {
    case TAB_SWITCH: {
      return {
        name: action.value,
      };
    }
    default: {
      return state;
    }
  }
};
