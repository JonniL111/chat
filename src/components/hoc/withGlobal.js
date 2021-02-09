import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';

const InputContext = React.createContext();

export const useGlobal = () => useContext(InputContext);

const WithGlobal = ({ children }) => {
  const { activeRoom: roomId, activeUser: userId } = useSelector((state) => state);

  return <InputContext.Provider value={{ roomId }}>{children}</InputContext.Provider>;
};
export default WithGlobal;
