import produce from 'immer';
import {
  SET_MESSAGES,
  ON_LOGIN,
  SET_USERS,
  SET_ACTIVEUSER,
  SET_DEFAULT_DATA,
  SET_DELETE_MESSAGE,
  SET_LIKE_IT,
} from '../action/index';

const initialState = {
  isAuth: false,
  activeUser: '',
  activeRoom: '',
  usersInfo: [],
  users: [],
  messages: [],
};

const messanges = produce((draft, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      draft.messages.push(action.payload);
      break;

    case ON_LOGIN:
      draft.isAuth = action.payload;
      break;

    case SET_USERS: //обновит массив зашедших пользователе, если кто то зайдет
      draft.users = action.payload.users;
      draft.usersInfo = action.payload.usersData;
      break;

    case SET_DEFAULT_DATA: //в начале загружаем уже присутствующих и сообщения
      draft.users = action.payload.users;
      draft.messages = action.payload.messages;
      draft.usersInfo = action.payload.usersData;
      break;

    case SET_ACTIVEUSER:
      draft.activeUser = action.payload.userName;
      draft.activeRoom = action.payload.roomId;
      break;

    case SET_DELETE_MESSAGE:
      const { index, newText, isDeleted } = action.payload;
      draft.messages[index].text = newText;
      draft.messages[index].image = '';
      draft.messages[index].isDeleted = isDeleted;
      break;

    case SET_LIKE_IT:
      const { index: mId, like } = action.payload;
      draft.messages[mId].like = like;
      break;

    default:
      break;
  }
}, initialState);

export default messanges;
