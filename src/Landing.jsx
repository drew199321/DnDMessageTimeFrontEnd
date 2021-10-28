import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import serverEndpoint from './_helpers/serverEndpoint';
import authToken from './_helpers/auth';

function Landing() {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

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
    }).catch((err) => {
      console.log(err); // TODO: Tell user that there is a server error
    });

    if (authToken.isAuthenticated) {
      history.push('/chatroom');
    } else if (authToken.err) {
      console.log('network error');
    } else {
      // TODO: Tell user the login failed
      console.log('login failed');
    }
  }

  return (
    <div>
      <h1>Landing Page</h1>
      <form onSubmit={handleSubmit(submitLogin)}>
        <input type="text" placeholder="username" {...register('username', { required: true })} />
        <input type="text" placeholder="password" {...register('password', { required: true })} />
        <button type="submit">Login</button>
      </form>
      <Link to="/registration">New User?</Link>
    </div>
  );
}

export default Landing;
