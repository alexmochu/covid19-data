import types from './types';

const increment = () => ({
  type: types.INCREMENT,
});

const decrement = () => ({
  type: types.DECREMENT
});

export default {
  increment,
  decrement
};