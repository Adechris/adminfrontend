import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const PASSWORDLESS_LOGIN = gql`
  mutation Mutation($email: String, $token: String) {
    passwordlessLogin(email: $email, token: $token) {
      accessToken
      refreshToken
    }
  }
`;

const PasswordlessLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    token: ''
  });

  const navigate = useNavigate()

  const [login, { data, loading, error }] = useMutation(PASSWORDLESS_LOGIN);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ variables: formData });
    navigate('/login'); 
  };

  return (
    <>
    <div className='container mt-5'>
      <h1 className='text-center'>Passwordless Login</h1>
      {data && <Alert variant='success'>Login successful! Access Token: {data.passwordlessLogin.accessToken}</Alert>}
      {error && <Alert variant='danger'>Error: {error.message}</Alert>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            className='form-control shadow-none'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Token</label>
          <input
            type="text"
            name="token"
            className='form-control shadow-none'
            value={formData.token}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mt-2'>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default PasswordlessLogin;
