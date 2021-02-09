/* 
закрытие окна
 const [popup, setPopup] = React.useState(false);
  const togglePopup = () => {
    setPopup((popup) => !popup);
  };
вызов
<Modal togglePopup={togglePopup}>
  children element
</Modal>
*/

import React, { useEffect } from 'react';

import styled from 'styled-components';
import { primary } from '../variadles';

import ReactDOM from 'react-dom';

const ModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  top: 0;
  left: 0;
`;
const ModalInner = styled.div`
  width: 600px;
  border-radius: 3px;
  box-shadow: 0 5px 3px rgba(#000, 0.7);
  background: ${primary};
  position: relative;
  overflow: hidden;
  padding: 24px;
  text-align: center;
  img {
    max-width: 100%;
    border-radius: 3px;
  }
`;

const Close = styled.span`
  position: absolute;
  padding: 5px;
  right: 3px;
  top: 0;
  color: #000;
  cursor: pointer;
  font-size: 20px;
  line-height: 20px;
  font-weight: bold;
`;

function Modal({ children, togglePopup }) {
  let el = document.createElement('div');

  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  const modal = (
    <ModalWrapper data-close="close">
      <ModalInner>
        <Close onClick={togglePopup}>&times;</Close>
        {children}
      </ModalInner>
    </ModalWrapper>
  );
  return ReactDOM.createPortal(modal, el);
}

export default Modal;
