
import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container } from 'react-bootstrap';

export const GET_PROSPECTS = gql`
  query GetProspects($offset: Int!) {
    adminGetProspect(offset: $offset)
  }
`;

interface Prospect {
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

interface QueryData {
  adminGetProspect: Prospect[];
}

interface QueryVars {
  offset: number;
}

const ProspectList: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const { loading, error, data, fetchMore } = useQuery<QueryData, QueryVars>(GET_PROSPECTS, {
    variables: { offset },
    notifyOnNetworkStatusChange: true,
  });

  if (loading && !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const prospects = data?.adminGetProspect || [];

  const loadMore = () => {
    fetchMore({
      variables: {
        offset: prospects.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          adminGetProspect: [...prev.adminGetProspect, ...fetchMoreResult.adminGetProspect],
        };
      },
    }).catch(error => {
      console.error('Error fetching more prospects:', error);
    });
  };

  return (
    <>
    <div className='container'>
      <h1>Prospects</h1>
      {prospects.map((prosp: Prospect) => (
        <div key={prosp.id} className="prospect-card">
          <h2>{prosp.company_name}</h2>
          <p>Address: {prosp.company_address}</p>
          <p>Phone: {prosp.company_phone}</p>
          <p>Email: {prosp.company_email}</p>
          <h3>Contact</h3>
          <p>Name: {prosp.contact_name}</p>
          <p>Phone: {prosp.contact_phone}</p>
          <p>Email: {prosp.contact_email}</p>
          <p>Details: {prosp.details}</p>
        </div>
      ))}
      {loading ? (
        <p>Loading more...</p>
      ) : (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
    </>
  );
};

export default ProspectList;