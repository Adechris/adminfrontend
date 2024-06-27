// src/components/UserProfileModal.tsx
import React, { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  // Add other relevant fields
}

interface UserProfileModalProps {
  user: User;
  onClose: () => void;
  onUpdate: (updatedUser: User) => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ user, onClose, onUpdate }) => {
  const [updatedName, setUpdatedName] = useState(user.name);
  const [updatedEmail, setUpdatedEmail] = useState(user.email);

  const handleUpdateClick = () => {
    const updatedUser = {
      ...user,
      name: updatedName,
      email: updatedEmail,
      // Add other fields to update as needed
    };
    onUpdate(updatedUser);
    onClose();
  };

  return (
    <div>
      <h2>User Profile</h2>
      <p>ID: {user.id}</p>
      <label>
        Name:
        <input
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={updatedEmail}
          onChange={(e) => setUpdatedEmail(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleUpdateClick}>Update</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default UserProfileModal;
