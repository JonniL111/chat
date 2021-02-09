export const ON_LOGIN = 'ON_LOGIN';
export const SET_USERS = 'SET_USERS';
export const SET_LIKE_IT = 'SET_LIKE_IT';
export const SET_MESSAGES = 'SET_MESSAGES';
export const SET_ACTIVEUSER = 'SET_ACTIVEUSER';
export const SET_DEFAULT_DATA = 'SET_DEFAULT_DATA';
export const SET_DELETE_MESSAGE = 'SET_DELETE_MESSAGE';

export const addMessage = (data) => ({
  type: SET_MESSAGES,
  payload: data,
});

export const onLogining = () => ({
  type: ON_LOGIN,
  payload: true,
});

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

export const setActiveUser = (userRoom) => ({
  type: SET_ACTIVEUSER,
  payload: userRoom,
});

export const setDefaultData = (data) => ({
  type: SET_DEFAULT_DATA,
  payload: data,
});

export const setDeleteMessage = (message) => ({
  type: SET_DELETE_MESSAGE,
  payload: message,
});

export const setLikeIt = (message) => ({
  type: SET_LIKE_IT,
  payload: message,
});
