import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import io from 'socket.io-client';

import Messages from './Messages';
import MessageInput from './MessageInput';
import { logout } from '../_helpers/auth';
import './Chatroom.css';

export default function Chatroom() {
  const history = useHistory();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:4000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  function handleLogout() {
    logout();
    history.push('/');
  }

  return (
    <div>
      <div className="chatroom">
        <header className="chatroom-header">
          <button type="button" onClick={handleLogout}>Logout</button>
          Chatroom page
        </header>
        { socket ? (
          <div className="chat-container">
            <Messages socket={socket} />
            <MessageInput socket={socket} />
          </div>
        ) : (
          <div>Not Connected</div>
        )}
      </div>
    </div>
  );
}
