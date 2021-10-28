import React from 'react';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import serverEndpoint from './_helpers/serverEndpoint';
import authToken from './_helpers/auth';

export default function Registration() {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  async function registerUser(data) {
    await axios.post(`${serverEndpoint}/register`, data)
      .then((res) => {
        console.log(res);
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
      console.log('Username is already taken'); // TODO: tell user that username is taken
    }
  }
  return (
    <div>
      <h1>Registration page</h1>
      <form onSubmit={handleSubmit(registerUser)}>
        <input type="text" placeholder="username" {...register('username', { required: true })} />
        <input type="text" placeholder="password" {...register('password', { required: true })} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
