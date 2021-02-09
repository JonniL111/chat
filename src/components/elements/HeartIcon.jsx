import React from 'react';
import styled, { css } from 'styled-components';
import { Heart, HeartFill } from 'react-bootstrap-icons';

import { sDark, lBlue } from '../../utils/variadles';

const LikeCount = styled.div`
  display: flex;
  align-items: center;
  span {
    color: ${lBlue};
    font-size: 12px;
    margin-right: 2px;
  }
`;
const cssSvg = css`
  &:hover {
    cursor: pointer;
    color: ${sDark};
  }
`;
const MessageHeart = styled(Heart)`
  ${cssSvg}
`;
const MessageHeartFill = styled(HeartFill)`
  ${cssSvg}
`;

function HeartIcon({ count, messageId, onLikeIt }) {
  const heart =
    count > 0 ? (
      <LikeCount>
        <span>{count}</span>
        <MessageHeartFill onClick={() => onLikeIt(messageId)} />
      </LikeCount>
    ) : (
      <MessageHeart onClick={() => onLikeIt(messageId)} />
    );
  return <> {heart} </>;
}

export default HeartIcon;
