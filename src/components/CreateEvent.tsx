// src/components/EventForm.tsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { CREATE_EVENT, UPDATE_EVENT } from '../GraphQl/Mutation'; // Assuming Mutations.ts or Mutations.tsx exists and exports CREATE_EVENT and UPDATE_EVENT


interface EventFormProps {
  eventId?: number; // Optional eventId for updating events
}

const EventForm: React.FC<EventFormProps> = ({ eventId }) => {
  const [formData, setFormData] = useState({
    prospectID: 0,
    schoolID: 0,
    title: '',
    eventDateTime: '',
    address: '',
    details: '',
    notifications: [] as string[],
    userIDs: [] as number[],
  });

  const [createEvent] = useMutation(CREATE_EVENT);
  const [updateEvent] = useMutation(UPDATE_EVENT);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (eventId) {
        await updateEvent({ variables: { id: eventId, ...formData } });
      } else {
        await createEvent({ variables: formData });
      }
      // Optionally, handle success or navigate to another page
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <Input
        type="datetime-local"
        name="eventDateTime"
        value={formData.eventDateTime}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
      />
      <TextArea
        name="details"
        value={formData.details}
        onChange={handleChange}
        placeholder="Details"
      />
      {/* Add inputs for notifications and userIDs if needed */}
      <Button type="submit">{eventId ? 'Update' : 'Create'} Event</Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const TextArea = styled.textarea`
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default EventForm;
