import { combineReducers } from 'redux';

const user = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {...state, data: action.value};
    default:
      return state;
  }
};

export default combineReducers({ user });