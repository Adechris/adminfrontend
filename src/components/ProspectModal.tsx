// src/components/ProspectModal.tsx
import React, { useState } from 'react';

interface ProspectData {
    id: string;
    company_name: string;
    company_address: string;
    company_phone: string;
    company_email: string;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    details: string;
  }
  
  type Prospect = ProspectData;
  

interface ProspectModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (prospect: ProspectData) => void;
  prospect: ProspectData | null;
}

const ProspectModal: React.FC<ProspectModalProps> = ({ show, onClose, onSave, prospect }) => {
  const [formState, setFormState] = useState<Prospect>(
    prospect || {
      id: '',
      company_name: '',
      company_address: '',
      company_phone: '',
      company_email: '',
      contact_name: '',
      contact_phone: '',
      contact_email: '',
      details: '',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formState);
  };

  if (!show) return null;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="company_name"
          value={formState.company_name}
          onChange={handleChange}
          placeholder="Company Name"
        />
        <input
          type="text"
          name="company_address"
          value={formState.company_address}
          onChange={handleChange}
          placeholder="Company Address"
        />
        <input
          type="text"
          name="company_phone"
          value={formState.company_phone}
          onChange={handleChange}
          placeholder="Company Phone"
        />
        <input
          type="email"
          name="company_email"
          value={formState.company_email}
          onChange={handleChange}
          placeholder="Company Email"
        />
        <input
          type="text"
          name="contact_name"
          value={formState.contact_name}
          onChange={handleChange}
          placeholder="Contact Name"
        />
        <input
          type="text"
          name="contact_phone"
          value={formState.contact_phone}
          onChange={handleChange}
          placeholder="Contact Phone"
        />
        <input
          type="email"
          name="contact_email"
          value={formState.contact_email}
          onChange={handleChange}
          placeholder="Contact Email"
        />
        <textarea
          name="details"
          value={formState.details}
          onChange={(e) => handleChange(e as any)}
          placeholder="Details"
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ProspectModal;
