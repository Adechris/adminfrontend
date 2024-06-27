// src/components/AdminPanel.tsx
import React from 'react';
import styled from 'styled-components';

const AdminPanel: React.FC = () => {
  return (
    <Panel>
      <Section>
        <h2>Users</h2>
        {/* User management components */}
      </Section>
      <Section>
        <h2>Schools</h2>
        {/* School management components */}
      </Section>
      <Section>
        <h2>Roles</h2>
        {/* Role management components */}
      </Section>
      <Section>
        <h2>Games</h2>
        {/* Game management components */}
      </Section>
      <Section>
        <h2>Subscriptions</h2>
        {/* Subscription management components */}
      </Section>
    </Panel>
  );
};

const Panel = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;


const Section = styled.div`
  flex-basis: 48%;
  background-color: #f5f5f5;
  padding: 1rem;
  margin-bottom: 1rem;
`;

export default AdminPanel;