import React from 'react';
import styled from 'styled-components';
import EventForm from '../components/CreateEvent';
import EventList from '../components/EventList';

const EventPage: React.FC = () => {
  const startDate = new Date().toISOString();
  const endDate = new Date().toISOString();

  return (
    <Container>
      <Section>
        <h2>Create or Update Event</h2>
        <EventForm />
      </Section>
      <Section>
        <h2>Event List</h2>
        <EventList startDate={startDate} endDate={endDate} />
      </Section>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
`;

const Section = styled.div`
  width: 50%;
  margin: 0 1rem;
`;

export default EventPage;
