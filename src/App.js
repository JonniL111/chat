import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import WithGlobal from './components/hoc/withGlobal';
import './App.scss';
import ChatPage from './pages/ChatPage';
import AutorizationPage from './pages/AutorizationPage';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.isAuth);

  return (
    <div className="App">
      <div className="container">
        <WithGlobal>
          {!isAuth && <AutorizationPage dispatch={dispatch} />}
          {isAuth && <ChatPage dispatch={dispatch} />}
        </WithGlobal>
      </div>
    </div>
  );
}

export default App;
