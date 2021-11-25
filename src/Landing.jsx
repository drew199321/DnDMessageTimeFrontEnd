import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import serverEndpoint from './_helpers/serverEndpoint';

function Landing() {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [error, setError] = useState();

  async function submitLogin(data) {
    const isAuthenticated = await axios.get(`${serverEndpoint}/login`, {
      params: {
        username: data.username,
        password: data.password,
      },
    }).then((res) => {
      localStorage.user = JSON.stringify({ ...res.data });
      return res.data.isAuthenticated;
    }).catch((err) => {
      setError(err);
      return false;
    });

    if (isAuthenticated) {
      history.push('/chatroom');
    } else {
      console.log(error);
      console.log('login failed'); // TODO: Tell user there was error
    }
  }

  return (
    <div className="landing">
      <h1>DnD Message Time</h1>
      <form onSubmit={handleSubmit(submitLogin)}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <input type="text" id="floating-input" placeholder="Username" {...register('username', { required: true })} />
        <input type="text" id="floating-input" placeholder="Password" {...register('password', { required: true })} />
        <button type="submit">Login</button>
      </form>
      <Link to="/registration">New User?</Link>
    </div>
  );
}

export default Landing;
