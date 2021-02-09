import React from 'react';
import styled from 'styled-components';

import { useInput } from './hoc/useInput';
import { lBlue } from '../utils/variadles';
import { CardImage } from 'react-bootstrap-icons';
import Modal from '../utils/modal/Modal';
import Uppload from '../utils/upload/Upload';

const FormBox = styled.form`
  display: flex;
  width: 100%;
  height: auto;
  margin: 20px;
  flex-direction: column;
`;
const TextArea = styled.textarea`
  display: block;
  padding: 10px;
  background-color: #fff;
  font-size: 14px;
  width: auto;
  border: 0;
  height: 80px;
  line-height: 20px;
  border-radius: 3px;
  border: 1px solid #fff;
  transition: all 0.2s ease;
  outline: none;
  &:focus-visible {
    border: 1px solid ${lBlue};
  }
`;
const FormControls = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Button = styled.button`
  display: block;
  padding: 0;
  background: transparent;
  font-size: 18px;
  border: 0;
  transition: all 0.3s ease;
  color: ${lBlue};
  text-transform: uppercase;
  font-weight: bold;
  padding: 3px 20px;
  &:hover {
    cursor: pointer;
    transform: scale(110%);
  }
`;

function FormSend({ onAddMessage, onAddImages }) {
  const { value: text, setValue: setText, cleanValue } = useInput('');
  const [popup, setPopup] = React.useState(false);

  const togglePopup = () => {
    setPopup((popup) => !popup);
  };

  return (
    <>
      <FormBox onSubmit={(e) => onAddMessage(e, text, cleanValue)}>
        <TextArea
          placeholder="Напишите сообщение..."
          onChange={(e) => setText(e)}
          value={text}
          name=""
          id=""></TextArea>
        <FormControls>
          <Button onClick={togglePopup} type="button">
            <CardImage />
          </Button>
          <Button type="submit">Send</Button>
        </FormControls>
      </FormBox>
      {popup && (
        <Modal togglePopup={togglePopup}>
          <Uppload handlerSend={onAddImages} />
        </Modal>
      )}
    </>
  );
}

export default FormSend;
