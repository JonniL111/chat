import React from 'react';
import styled, { css } from 'styled-components';
import { Reply, Trash } from 'react-bootstrap-icons';

import { sLight, sDark } from '../utils/variadles';
import HeartIcon from './elements/HeartIcon';

const MessageFooterInner = styled.div`
  display: flex;
  justify-content: space-evenly;
  color: ${sLight};
  font-size: 14px;
  transition: all 0.3s ease;
  ${(props) => ({ ...props })}:hover & {
    cursor: pointer;
    color: ${sDark};
  }
`;
const cssSvg = css`
  &:hover {
    cursor: pointer;
    color: ${sDark};
  }
`;
const MessageReply = styled(Reply)`
  ${cssSvg}
`;
const MessageTrash = styled(Trash)`
  ${cssSvg}
`;

function MessageFooter({ deleteMessage, onLikeIt, like, messageId, userMessage }) {
  return (
    <MessageFooterInner>
      <MessageReply />
      <HeartIcon onLikeIt={onLikeIt} count={like.length} messageId={messageId} />
      {userMessage && <MessageTrash onClick={() => deleteMessage(messageId)} />}
    </MessageFooterInner>
  );
}

export default MessageFooter;
