// src/components/Navigation.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navigation: React.FC = () => {
  return (
    <Nav>
            <NavLink to="/">Login</NavLink>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/users">Users</NavLink>
      <NavLink to="/admin">Admin</NavLink>
      <NavLink to="/prospects">Prospects</NavLink>
      <NavLink to="/events">Events</NavLink>
      <NavLink to="/addProspect">Add Prospect</NavLink>
      <NavLink to="/register">Register</NavLink>


    </Nav>
  ); 
};

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const NavLink = styled(Link)`
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #333;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-right: 0.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export default Navigation;
