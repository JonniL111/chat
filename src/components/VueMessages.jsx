import React from 'react';
import styled from 'styled-components';
import MessageItem from './MessageItem';
import { primary } from '../utils/variadles';
import Modal from '../utils/modal/Modal';

const ContainerMessage = styled.div`
  position: relative;
  bottom: 0;
  height: calc(100% - 142px);
  overflow: hidden;
  background-color: ${primary};
`;
const ContainerMessageInner = styled.div`
  display: flex;
  flex-wrap: unset;
  position: absolute;
  bottom: 0;
  overflow-y: scroll;
  height: 100%;
  flex-direction: column-reverse;
  width: 100%;
`;

function VueMessages({ messages, messagesRef, activeUser, deleteMessage, onLikeIt }) {
  const [popup, setPopup] = React.useState(false);
  const [image, setImage] = React.useState('');

  const mapListMessage = messages.map((message, idx) => (
    <MessageItem
      key={idx}
      data={message}
      activeUser={activeUser}
      deleteMessage={deleteMessage}
      onLikeIt={onLikeIt}
    />
  ));

  const togglePopup = () => {
    setPopup((popup) => !popup);
  };

  const onPopupImg = (e) => {
    if (e.target.dataset.close !== 'close') return;
    setImage(e.target.src);
    setPopup((popup) => !popup);
  };
  return (
    <ContainerMessage onClick={onPopupImg} ref={messagesRef}>
      {popup && (
        <Modal togglePopup={togglePopup}>
          <img src={image} data-close="close" />
        </Modal>
      )}
      <ContainerMessageInner>{mapListMessage.reverse()}</ContainerMessageInner>
    </ContainerMessage>
  );
}

export default VueMessages;
