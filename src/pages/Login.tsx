// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useMutation } from '@apollo/client';
// import { LOGIN } from '../GraphQl/Mutation';
// import LoginForm from '../components/LoginForm';

// const LoginPage: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [login, { loading, error }] = useMutation(LOGIN);
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const { data } = await login({ variables: { email, password } });
//       if (data?.login?.accessToken) { // Ensure data and data.login are not null or undefined
//         // Store the access token and navigate to the home page
//         localStorage.setItem('accessToken', data.login.accessToken);
//         navigate('/home');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//     }
//   };


//   return (
//     <div>
//       <h1>Login</h1>
//       <LoginForm
//         email={email}
//         password={password}
//         onEmailChange={setEmail}
//         onPasswordChange={setPassword}
//         onSubmit={handleSubmit}
//         loading={loading}
//         error={error}
//       />
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import {Container} from "react-bootstrap"

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

interface LoginResponse {
  login: {
    accessToken: string;
    refreshToken: string;
  }
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const navigate = useNavigate();
  const [login, { loading }] = useMutation<LoginResponse>(LOGIN_MUTATION, {
    onCompleted: (data) => {
      // Store tokens in cookies
      Cookies.set('x-access-token', data.login.accessToken);
      Cookies.set('x-refresh-token', data.login.refreshToken);
      
      // Redirect or update app state here
      console.log('Login successful');
      navigate('/home')
      // For example: history.push('/dashboard');
    },
    onError: (error) => {
      setError(error.message);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login({ variables: { email, password } });
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <>
    <div className='container mt-5'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className='form-control shadow-none'
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className='mt-2' htmlFor="password">Password:</label>
          <input
            type="password"
            className='form-control shadow-none'
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className='mt-2'>
          <button className='btn btn-success' type="submit" disabled={loading} >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
       
      </form>
    </div>
    </>
  );
};

export default Login;
