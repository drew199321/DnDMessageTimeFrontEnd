import React from 'react';
import { useHistory } from 'react-router';

import { logout } from './_helpers/auth';

export default function Chatroom() {
  const history = useHistory();

  function handleLogout() {
    logout();
    history.push('/');
  }

  return (
    <div>
      <h1>Chatroom page</h1>
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  );
}
