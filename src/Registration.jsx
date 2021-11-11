import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import serverEndpoint from './_helpers/serverEndpoint';
import authToken from './_helpers/auth';

export default function Registration() {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const { error, setError } = useState();

  async function registerUser(data) {
    await axios.post(`${serverEndpoint}/register`, data)
      .then((res) => {
        console.log(res);
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
      <h1>Registration page</h1>
      <form onSubmit={handleSubmit(registerUser)}>
        <input type="text" placeholder="groupName" {...register('groupName', { required: true })} />
        <input type="text" placeholder="username" {...register('username', { required: true })} />
        <input type="text" placeholder="password" {...register('password', { required: true })} />
        <label htmlFor="field-admin">
          <input type="radio" id="field-admin" name="userType" value="admin" {...register('userType', { required: true })} />
          Admin
        </label>
        <label htmlFor="field-user">
          <input type="radio" id="field-user" name="userType" value="user" {...register('userType', { required: true })} />
          User
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
