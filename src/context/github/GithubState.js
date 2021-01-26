import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {SEARCH_USERS, SET_LOADING, INIT_DATA, GET_USER, GET_REPOS, SET_CLEAR_BUTTON} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    showClearButton: false,
    alert: null,
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //Search Users
  const searchUsers = async text => {
    setLoading();
    const res = await axios
      .get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`);

    dispatch({type: SEARCH_USERS, payload: res.data.items});
    setClearButton();
  }

  //Get User
  const getUser = async (login) => {
    setLoading();

    const res = await axios
      .get(`https://api.github.com/users/${login}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);

    dispatch({type: GET_USER, payload: res.data});
  }

  //Get Repos
  const getUserRepos = async (login) => {
    setLoading();

    const res = await axios
      .get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`);

    dispatch({type: GET_REPOS, payload: res.data});
  }

  //Clear Search, Init Data
  const initData = async () => {
    setLoading();
    let res = await axios
      .get(`https://api.github.com/users?client_id=${githubClientId}&client_secret=${githubClientSecret}`);

    dispatch({type: INIT_DATA, payload: res.data});
  }

  //Set Clear Button
  const setClearButton = () => dispatch({type: SET_CLEAR_BUTTON});

  //Set Loading
  const setLoading = () => dispatch({type: SET_LOADING});

  //Set Alert


  return <GithubContext.Provider value={{
    users: state.users,
    user: state.user,
    repos: state.repos,
    loading: state.loading,
    showClearButton: state.showClearButton,
    searchUsers,
    initData,
    getUser,
    getUserRepos
  }
  }>
    {props.children}
  </GithubContext.Provider>
}

export default GithubState;
