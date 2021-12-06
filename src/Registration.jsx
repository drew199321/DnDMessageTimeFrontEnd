/* eslint-disable max-len */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import serverEndpoint from './_helpers/serverEndpoint';

export default function Registration() {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [error, setError] = useState();

  async function registerUser(data) {
    const isAuthenticated = await axios.post(`${serverEndpoint}/register`, data)
      .then((res) => {
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
      <h1>Registration page</h1>
      <form onSubmit={handleSubmit(registerUser)}>
        <input type="text" placeholder="username" {...register('username', { required: true })} />
        <input type="password" placeholder="password" {...register('password', { required: true })} />
        <label htmlFor="field-admin">
          <input type="radio" id="field-admin" name="userType" value="admin" {...register('userType', { required: true })} />
          Admin
        </label>
        <label htmlFor="field-user">
          <input type="radio" id="field-user" name="userType" value="member" {...register('userType', { required: true })} />
          User
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
