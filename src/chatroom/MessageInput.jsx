/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './MessageInput.css';

export default function NewMessage({ user, socket }) {
  const [value, setValue] = useState('');
  const submitForm = (e) => {
    // TODO: Restrict user input
    // TODO: MessageType should be dynamic based on the type of messesage they want to send not userType
    e.preventDefault();
    socket.emit('message', {
      messageType: user.userType === 'member' ? 'direct' : 'brodcast',
      value,
    });
    setValue('');
  };

  return (
    <form onSubmit={submitForm}>
      <input
        value={value}
        placeholder="Type your message"
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
    </form>
  );
}
