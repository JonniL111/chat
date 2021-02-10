import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { PlusCircleFill } from 'react-bootstrap-icons';

import socket from '../utils/socket';
import FormSend from '../components/FormSend';
import { addMessage, setUsers, setDeleteMessage, setLikeIt } from '../redux/action/index';
import VueMessages from '../components/VueMessages';
import UsersList from '../components/UsersList';
import { secondary, primary, lightText, lBlue } from '../utils/variadles';

const ContainerFormMessage = styled.div`
  display: flex;
  background-color: ${primary};
  height: 140px;
  width: 100%;
  border-top: 2px solid #fff;
`;
const StyledUsersList = styled.div`
  width: 240px;
  background-color: ${secondary};
  color: ${lightText};
  height: 100%;  
  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    z-index: 50;
    transition: all 0.3s;
    ${({ status }) => (!status ? `left: -242px;` : `left:0`)}
`;
const Main = styled.div`
  width: 100%;
  height: 100%;
  background: ${primary};
`;
const PlusCircle = styled(PlusCircleFill)`
  color: ${lBlue};
  font-size: 30px;
  position: absolute;
  left: 250px;
  top: 10px;
  cursor: pointer;
  background: #fff;
  border: 2px solid #fff;
  border-radius: 50%;
  z-index: 60;
  transition: all 0.3s;
  transform: rotate(0deg);
  ${({ status }) => (!status ? `left: 252px;` : `left:196px; transform: rotate(45deg);`)}
  @media (min-width: 768px) {
    display: none;
  }
`;

function ChatPage({ dispatch }) {
  const [toggle, setToggle] = useState(false);
  const state = useSelector((state) => state);
  const { messages, activeUser, activeRoom: roomId, activeUser: userId } = state;

  const messagesRef = useRef(null);

  const onAddMessage = (e, text, cleanValue) => {
    const image = '';
    let date = new Date();
    const obj = {
      roomId,
      messageId: date.getTime(),
      userName: activeUser,
      image,
      text,
      like: [],
      isDeleted: false,
    };
    socket.emit('ROOM:NEW_MESSAGE', obj);
    addNewMessage(obj);
    e.preventDefault();
    cleanValue();
  };

  const onAddImages = (images) => {
    const text = '';
    images.forEach((item) => {
      const image = '';
      let date = new Date();
      const obj = {
        roomId,
        messageId: date.getTime(),
        userName: activeUser,
        image: item.src,
        text,
        like: [],
        isDeleted: false,
      };
      socket.emit('ROOM:NEW_MESSAGE', obj);
      addNewMessage(obj);
    });
  };

  const addNewMessage = (obj) => {
    dispatch(addMessage(obj));
  };

  useEffect(() => {
    socket.on('ROOM:SET_USERS', (usersData) => {
      dispatch(setUsers(usersData));
    });
    socket.on('ROOM:SET_MESSAGE', (obj) => addNewMessage(obj));
    socket.on('ROOM:DELETE_MESSAGE', (message) => dispatch(setDeleteMessage(message)));
    socket.on('ROOM:LIKE_IT', (data) => dispatch(setLikeIt(data)));
  }, []);

  useEffect(() => {
    messagesRef.current.scroll(0, messagesRef.current.scrollHeight);
  }, [messages]);

  const onDeleteMessage = (messageId) => {
    const obj = { roomId, messageId };
    socket.emit('ROOM:DELETE_MESSAGE', obj);
  };

  const onLikeIt = (messageId) => {
    const obj = { roomId, messageId, userId };
    socket.emit('ROOM:LIKE_IT', obj);
  };

  const toogleMenu = () => {
    setToggle((toggle) => !toggle);
  };
  return (
    <>
      <StyledUsersList status={toggle ? 1 : 0}>
        <PlusCircle status={toggle ? 1 : 0} onClick={toogleMenu} />
        <UsersList {...state} />
      </StyledUsersList>
      <Main>
        <VueMessages
          messagesRef={messagesRef}
          messages={messages}
          activeUser={activeUser}
          deleteMessage={onDeleteMessage}
          onLikeIt={onLikeIt}
        />
        <ContainerFormMessage>
          <FormSend onAddImages={onAddImages} onAddMessage={onAddMessage} />
        </ContainerFormMessage>
      </Main>
    </>
  );
}

export default ChatPage;
