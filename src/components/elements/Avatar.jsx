import React from 'react';
import styled from 'styled-components';

import { lightText } from '../../utils/variadles';

const Ava = styled.div`
  text-transform: uppercase;
  color: ${lightText};
  text-align: center;
`;
const AvatarWrapper = styled.div`
  display: flex;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: 0;
  overflow: hidden;
  justify-content: center;
  background: rgb(${(props) => props.color});
  align-items: center;
`;

function Avatar({ name, color = '0,0,0' }) {
  const letter = { ...name };
  return (
    <AvatarWrapper color={color}>
      <Ava color={color}>{letter[0]}</Ava>
    </AvatarWrapper>
  );
}

export default Avatar;
