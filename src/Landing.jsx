import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import serverEndpoint from './_helpers/serverEndpoint';
import authToken from './_helpers/auth';

function Landing() {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const { error, setError } = useState();

  async function submitLogin(data) {
    await axios.get(`${serverEndpoint}/login`, {
      params: {
        username: data.username,
        password: data.password,
      },
    }).then((res) => {
      authToken.isAuthenticated = res.data.isAuthenticated;
      authToken.token = res.data.token;
      // TODO: Should also save authToken in session cashe
    }).catch((err) => setError(err));

    if (authToken.isAuthenticated) {
      history.push('/chatroom');
    } else {
      console.log(error);
      console.log('login failed'); // TODO: Tell user there was error
    }
  }

  return (
    <div>
      <h1>Landing Page</h1>
      <form onSubmit={handleSubmit(submitLogin)}>
        <input type="text" placeholder="groupName" {...register('groupName', { required: true })} />
        <input type="text" placeholder="username" {...register('username', { required: true })} />
        <input type="text" placeholder="password" {...register('password', { required: true })} />
        <button type="submit">Login</button>
      </form>
      <Link to="/registration">New User?</Link>
    </div>
  );
}

export default Landing;
