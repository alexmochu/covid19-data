import types from './types';
import initialState from '../../../reducers/initialState';

const homepage = (state = initialState.homepage, action) => {
  switch (action.type) {
    case types.INCREMENT:
        return {
          ...state,
          value: state.value + 1
        }
      case types.DECREMENT:
        return {
          ...state,
          value: state.value - 1
        }
  default:
    return state;
  }
};

export default homepage;