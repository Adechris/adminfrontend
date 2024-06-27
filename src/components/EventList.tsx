// src/components/EventList.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_EVENTS } from '../GraphQl/Queries';
import { Event } from '../Types';

interface EventListProps {
  startDate: string;
  endDate: string;
}

const EventList: React.FC<EventListProps> = ({ startDate, endDate }) => {
  const { loading, error, data } = useQuery(GET_EVENTS, {
    variables: { startDate, endDate },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Events</h2>
      <ul>
        {data.adminGetEvents.map((event: Event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.event_date} {event.event_time}</p>
            <p>{event.address}</p>
            <p>{event.details}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
