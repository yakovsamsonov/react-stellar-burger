import {
  ADD_BUN,
  REMOVE_BUN,
  ADD_REGULAR,
  REMOVE_REGULAR,
  CHANGE_ORDER,
  CLEAR_BURGER,
} from '../actions';
const initialState = {
  bun: null,
  items: [],
};

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REGULAR: {
      const new_items = [...state.items];
      new_items.push({
        uuid: action.uuid,
        data: action.item,
      });
      return {
        ...state,
        items: new_items,
      };
    }
    case REMOVE_REGULAR: {
      const new_items = [...state.items].filter(
        (el) => el.uuid !== action.uuid
      );
      return {
        ...state,
        items: new_items,
      };
    }
    case ADD_BUN: {
      return {
        ...state,
        bun: action.item,
      };
    }
    case REMOVE_BUN: {
      return {
        ...state,
        bun: initialState.bun,
      };
    }
    case CHANGE_ORDER: {
      const ingredient = [...state.items].find((el) => el.uuid === action.uuid);
      const new_items = [...state.items].filter(
        (el) => el.uuid !== action.uuid
      );
      new_items.splice(action.newIndex, 0, ingredient);

      return {
        ...state,
        items: new_items,
      };
    }
    case CLEAR_BURGER: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
