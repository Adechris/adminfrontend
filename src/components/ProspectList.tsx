// src/components/ProspectList.tsx
import React from 'react';
import { Prospect } from '../Types';

interface ProspectListProps {
  prospects: Prospect[];
  onCreateProspect: () => void;
  onUpdateProspect: (prospect: Prospect) => void;
  onDeleteProspect: (id: string) => void;
}

const ProspectList: React.FC<ProspectListProps> = ({ prospects, onCreateProspect, onUpdateProspect, onDeleteProspect }) => {
  return (
    <div>
      <button onClick={onCreateProspect}>Create Prospect</button>
      <ul>
        {prospects.map((prospect) => (
          <li key={prospect.id}>
            {prospect.company_name} - {prospect.contact_name}
            <button onClick={() => onUpdateProspect(prospect)}>Edit</button>
            <button onClick={() => onDeleteProspect(prospect.id.toString())}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProspectList;
