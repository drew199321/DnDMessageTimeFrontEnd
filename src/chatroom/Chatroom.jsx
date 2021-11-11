import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import io from 'socket.io-client';

import serverEndpoint from '../_helpers/serverEndpoint';
import Messages from './Messages';
import MessageInput from './MessageInput';
import './Chatroom.css';

export default function Chatroom() {
  const history = useHistory();
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.user;
    if (data) setUser(JSON.parse(data));
    else setError('Corrupted local Storage Data');
    const newSocket = io(`${serverEndpoint}`); // TODO: should route deeper not base
    setSocket(newSocket);
    setLoading(false);
    return () => newSocket.close();
  }, [setSocket]);

  function handleLogout() {
    localStorage.removeItem('user');
    history.push('/');
  }

  if (loading) return <h1>Loading Messages</h1>;
  if (error) return <h1>{error}</h1>;
  return (
    <div>
      <div className="chatroom">
        <header className="chatroom-header">
          <button type="button" onClick={handleLogout}>Logout</button>
          Chatroom page - {user.userType}
        </header>
        { socket ? (
          <div className="chat-container">
            <Messages socket={socket} />
            <MessageInput socket={socket} username={user.username} /> {/* TODO: username should be removed */}
          </div>
        ) : (
          <div>Not Connected</div>
        )}
      </div>
    </div>
  );
}
