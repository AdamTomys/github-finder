import {SEARCH_USERS, SET_LOADING, INIT_DATA, GET_USER, GET_REPOS, SET_CLEAR_BUTTON} from '../types';

const GithubReducer =  (state, action) => {
  switch (action.type) {
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false
      }
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      }
    case INIT_DATA:
      return {
        ...state,
        users: action.payload,
        loading: false,
        showClearButton: false
      }
    case SET_CLEAR_BUTTON:
      return {
        ...state,
        showClearButton: true
      }
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}

export default GithubReducer;