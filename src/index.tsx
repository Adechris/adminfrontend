import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink, HttpLink } from '@apollo/client';
    import Cookies from 'js-cookie';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"

const httpLink = new HttpLink({
  uri: 'http://localhost:4005/',
});

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = Cookies.get('x-access-token');
  const refreshToken = Cookies.get('x-refresh-token');

  operation.setContext({
    headers: {
      'x-access-token': accessToken || '',
      'x-refresh-token': refreshToken || '',
    },
  });


  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

window.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
    );
  } else {
    console.error('Root element not found in the HTML document.');
  }
});