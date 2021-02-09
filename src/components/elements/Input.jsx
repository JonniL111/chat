import React from 'react';
import styled from 'styled-components';

const InputField = styled.input`
  font-size: 22px;
  border: 0px solid #000;
  border-radius: 5px;
  margin: 20px 0;
  background-color: #fff;
  padding: 5px 10px;
  width: 100%;
  &::placeholder {
    color: #ccc;
  }
`;

function Input(props) {
  return <InputField {...props} />;
}

export default Input;
