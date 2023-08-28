import {
  ADD_BUN,
  REMOVE_BUN,
  ADD_REGULAR,
  REMOVE_REGULAR,
  CHANGE_ORDER,
  CLEAR_BURGER,
} from '../actions/burger';
import {
  BOTTOM_ING_TYPE,
  REGULAR_ING_TYPE,
  TOP_ING_TYPE,
} from '../../utils/constants';

const initialState = {
  items: [],
  total: 0,
};

const recalcTotal = (items) => {
  return items.reduce((acc, el) => {
    return acc + el.data.price;
  }, 0);
};

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REGULAR: {
      const new_items = [...state.items];
      new_items.push({
        uuid: action.uuid,
        order: new_items.length + 1,
        type: REGULAR_ING_TYPE,
        data: action.item,
      });
      return {
        items: new_items,
        total: recalcTotal(new_items),
      };
    }
    case REMOVE_REGULAR: {
      const new_items = [...state.items].filter(
        (el) => el.uuid !== action.uuid
      );
      return {
        items: new_items,
        total: recalcTotal(new_items),
      };
    }
    case ADD_BUN: {
      const new_items = [...state.items].concat([
        {
          uuid: action.uuid,
          type: TOP_ING_TYPE,
          data: action.item,
        },
        { uuid: action.uuid, type: BOTTOM_ING_TYPE, data: action.item },
      ]);
      return {
        items: new_items,
        total: recalcTotal(new_items),
      };
    }
    case REMOVE_BUN: {
      const new_items = [...state.items].filter(
        (el) => ![BOTTOM_ING_TYPE, TOP_ING_TYPE].includes(el.type)
      );
      return {
        items: new_items,
        total: recalcTotal(new_items),
      };
    }
    case CHANGE_ORDER: {
      const ingredient = [...state.items].find((el) => el.uuid === action.uuid);
      const new_items = [...state.items].filter(
        (el) => el.uuid !== action.uuid
      );
      new_items.splice(action.newIndex, 0, ingredient);
      return {
        items: new_items,
        total: recalcTotal(new_items),
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
