import { combineReducers } from 'redux';

const user = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {...state, data: action.value};
    default:
      return state;
  }
};

const audioFiles = (state = [], action) => {
  switch (action.type) {
    case 'GET_FILES':
      return action.value;
    case 'DELETE_FILE':
      return state.filter(file => file.id !== action.value);
    default:
      return state;
  }
};

export default combineReducers({ user, audioFiles });