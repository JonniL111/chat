import React from 'react';
import styled from 'styled-components';

import Avatar from './elements/Avatar';
import MessageFooter from './MessageFooter';
import { pLight, sLight } from '../utils/variadles';

const MessageBox = styled.div`
  display: block;
  padding: 10px;
  background-color: ${(props) => (props.userMessage ? pLight : '#fff')};
  font-size: 14px;
  border: 1px solid ${pLight};
  border-radius: 10px;
  margin: 0 20px 20px 20px;
  margin-left: ${(props) => (props.userMessage ? 'auto' : '20px')};
  box-shadow: 0px 0px 3px 0px rgba(10, 10, 10, 0.5);
  height: max-content;
  ${({ isImage }) =>
    isImage ? 'min-width: 30%; text-align: center; max-width: 80%;' : 'width: 80%;'}
`;
const MessageHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 24px;
  align-items: center;
  margin-bottom: 5px;
`;
const AvatarName = styled.span`
  color: ${sLight};
  font-size: 12px;
  padding-left: 10px;
  font-weight: bold;
`;
const MessageContent = styled.div`
  ${({ isDeleted }) => (isDeleted ? 'color:#777; font-style: italic;' : null)}
  font-size: 12px;
  margin-bottom: 5px;
  letter-spacing: 0.05em;
  overflow: hidden;
  img {
    max-width: 100%;
    cursor: pointer;
    border-radius: 3px;
    max-height: 300px;
  }
`;

const MessageItem = React.memo(
  ({
    activeUser,
    deleteMessage,
    onLikeIt,
    data: { messageId, userName, text, image, like, isDeleted, color },
  }) => {
    const userMessage = activeUser === userName ? true : false;
    const messageData = { deleteMessage, onLikeIt, like, messageId, userMessage };
    image = image ? <img src={image} alt={userName} data-close="close" /> : null;
    return (
      <MessageBox isImage={image} userMessage={userMessage}>
        {!userMessage && (
          <MessageHeader>
            <Avatar name={userName} color={color} />
            <AvatarName>{userName}</AvatarName>
          </MessageHeader>
        )}
        <MessageContent isDeleted={isDeleted}>
          {text}
          {image}
        </MessageContent>
        {!isDeleted && <MessageFooter {...messageData} />}
      </MessageBox>
    );
  },
);

export default MessageItem;
