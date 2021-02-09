import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { useInput } from '../components/hoc/useInput';
import Input from '../components/elements/Input';
import socket from '../utils/socket';
import { onLogining, setDefaultData, setActiveUser } from '../redux/action/index';

import { DBlue, secondary, sLight, lightText } from '../utils/variadles';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 420px;
  background-color: ${secondary};
  margin: auto;
  padding: 40px;
  height: 280px;
  border-radius: 3px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.4);
`;

const Button = styled.button`
  font-size: 22px;
  border: 0px solid #000;
  border-radius: 5px;
  margin: 20px 0;
  background-color: ${DBlue};
  padding: 7px 14px;
  cursor: pointer;
  width: 100%;
  transition: 0.3s all;
  color: ${lightText};
  box-shadow: 0 0 7px 3px rgba(28, 32, 42, 0.3);
  &:hover {
    box-shadow: 0 0 7px 6px rgba(28, 32, 42, 0.5);
    color: #fff;
  }
`;

const InputField = styled(Input)`
  padding: 10px 20px;
  background: ${sLight};
  color: #fff;
  box-shadow: inset 0 0 5px 3px rgba(28, 32, 42, 0.7);
`;

function AutorizationPage({ dispatch }) {
  const { value: roomId, bind: roomIdInput } = useInput('');
  const { value: userName, bind: userNameInput } = useInput('');

  const onAutorization = async () => {
    if (!roomId || !userName) {
      alert('Не верные данные');
      return;
    }

    const randColorFunc = () => {
      const rgb = () => Math.floor(Math.random() * 155);
      return `${rgb()},${rgb()},${rgb()}`;
    };
    const randColor = randColorFunc();

    const obj = { roomId, userName, randColor };
    await axios.post('/rooms', obj).then(dispatch(onLogining()));

    socket.emit('ROOM:JOIN', obj); // отправляет сокет для одного пользователя/ ROOM:JOIN - экшен с сервера

    axios
      .get(`/rooms/${obj.roomId}`)
      .then(({ data }) => dispatch(setDefaultData(data)))
      .then(dispatch(setActiveUser({ userName, roomId })));
  };

  return (
    <Wrapper>
      <InputField name="roomId" {...roomIdInput} placeholder="Room Id" />
      <InputField name="userName" {...userNameInput} placeholder="Ваше имя" />
      <Button onClick={onAutorization}>Войти</Button>
    </Wrapper>
  );
}

export default AutorizationPage;
