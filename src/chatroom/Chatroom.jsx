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
    if (data) {
      const userData = JSON.parse(data);
      setUser(userData);
      const newSocket = io(`${serverEndpoint}`, {
        query: {
          username: userData.username,
          userType: userData.userType,
          token: userData.token,
        },
      }); // TODO: should route deeper not base
      setSocket(newSocket);
      setLoading(false);
      return () => newSocket.close();
    }
    setError('Corrupted local Storage Data');
    return () => {};
  }, [setSocket]);

  function handleLogout() {
    localStorage.removeItem('user');
    history.push('/');
  }

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading Messages</h1>;
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
            <MessageInput socket={socket} user={user} />
          </div>
        ) : (
          <div>Not Connected</div>
        )}
      </div>
    </div>
  );
}
