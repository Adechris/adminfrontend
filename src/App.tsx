import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login"
import HomePage from './pages/Home';
import UsersPage from './pages/Users';
import AdminPage from './pages/Admin';
import ProspectsPage from './pages/Prospect';
import EventsPage from './pages/Event';
import ErrorPage from './pages/ErrorPage'; 
import EditUser from './pages/EditUser';
import AddProspect from 'pages/AddProspect';
import Register from 'pages/Register';
import PasswordlessLogin from 'pages/PasswordlessLogin';


const App = () => {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/prospects" element={<ProspectsPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="*" element={<ErrorPage />} /> 
      <Route path="/edit/:id" element={<EditUser />} />
      <Route path="/addProspect" element={<AddProspect/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<PasswordlessLogin />} />

    </Routes>
  </Router>
  )
}

export default App