/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './MessageInput.css';

export default function NewMessage({ username, socket }) { // TODO: username should be removed
  const [value, setValue] = useState('');
  const submitForm = (e) => {
    // TODO: Restrict user input
    e.preventDefault();
    socket.emit('message', { // TODO: username should be removed only use value
      username,
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
