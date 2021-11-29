/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './Messages.css';

export default function Messages({ socket, user }) {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const messageListener = (message) => {
      console.log(user);
      console.log(message);
      if (message.type === 'brodcast' || user.userType === 'admin' || message.username === user.username) {
        setMessages((prevMessages) => {
          const newMessages = { ...prevMessages };
          newMessages[message.id] = message;
          return newMessages;
        });
      }
    };

    socket.on('message', messageListener);
    socket.emit('getMessages');

    return () => {
      socket.off('message', messageListener);
    };
  }, [socket]);

  return (
    <div className="message-list">
      {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message) => (
          <div
            key={message.id}
            className="message-container"
            title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
          >
            <span className="user">{message.username}:</span>
            <span className="message">{message.content}</span>
            <span className="date">{new Date(message.time).toLocaleTimeString()}</span>
          </div>
        ))}
    </div>
  );
}
