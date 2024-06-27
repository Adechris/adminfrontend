// src/pages/Home.tsx
import React from 'react';
import Navigation from '../components/Navigation';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Navigation />
      {/* Additional content for the home page */}
    </div>
  );
};

export default HomePage;