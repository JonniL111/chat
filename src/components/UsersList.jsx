import React from 'react';
import styled from 'styled-components';

import Avatar from './elements/Avatar';
import { primary } from '../utils/variadles';

const List = styled.ul`
  margin: 0;
  list-style: none;
  padding: 10px;
  font-size: 14px;
  height: 100%;
  > li {
    padding: 10px 0;
    border-radius: 3px;
    overflow: hidden;
    display: flex;
    align-items: center;
    overflow: hidden;
    > div {
      border: 2px solid ${primary};
      padding: 2px;
      margin-right: 8px;
    }
  }
`;
const Title = styled.div`
  font-size: 16px;
  color: inherit;
  margin: 10px 0 0 10px;
  font-weight: bold;
`;
function UsersList({ users, usersInfo, activeRoom }) {
  const usersListRef = React.useRef(null);
  React.useEffect(() => {
    usersListRef.current.scroll(0, usersListRef.current.scrollHeight);
  }, [users]);

  const mapUsersInfo = (user) => {
    if (usersInfo.length > 0) {
      const map = new Map(usersInfo);
      if (map.get(user)) return map.get(user).randColor;
    } else {
      return '0,0,0';
    }
    return '0,0,0';
  };

  const list = users.map((user, idx) => (
    <li key={user + idx}>
      <Avatar name={user} color={mapUsersInfo(user)} />
      {user}
    </li>
  ));
  return (
    <>
      <Title>Чат: {activeRoom}</Title>
      <Title>Онлайн: {users.length}</Title>
      <List ref={usersListRef}>{list}</List>
    </>
  );
}

export default UsersList;
