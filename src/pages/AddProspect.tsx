// import React, { useState } from 'react';
// import { useMutation, gql } from '@apollo/client';
// import { Container } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const CREATE_PROSPECT = gql`
//   mutation CreateProspect(
//     $companyName: String,
//     $companyAddress: String,
//     $companyPhone: String,
//     $companyEmail: String,
//     $contactName: String,
//     $contactPhone: String,
//     $contactEmail: String,
//     $details: String
//   ) {
//     adminCreateProspect(
//       company_name: $companyName,
//       company_address: $companyAddress,
//       company_phone: $companyPhone,
//       company_email: $companyEmail,
//       contact_name: $contactName,
//       contact_phone: $contactPhone,
//       contact_email: $contactEmail,
//       details: $details
//     )
//   }
// `;

// const AddProspect: React.FC = () => {
//     const [formData, setFormData] = useState({
//         companyName: '',
//         companyAddress: '',
//         companyPhone: '',
//         companyEmail: '',
//         contactName: '',
//         contactPhone: '',
//         contactEmail: '',
//         details: ''
//     });


//     const navigate = useNavigate();
//     const [createProspect, { loading, error }] = useMutation(CREATE_PROSPECT, {
//         onCompleted: (data) => {
//             console.log('Prospect created successfully:', data);
//             navigate('/prospect')
//             setFormData({
//                 companyName: '',
//                 companyAddress: '',
//                 companyPhone: '',
//                 companyEmail: '',
//                 contactName: '',
//                 contactPhone: '',
//                 contactEmail: '',
//                 details: ''
//             });
//         },
//         onError: (error) => {
//             console.error('Error creating prospect:', error);
//         }
//     });

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setFormData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         createProspect({ variables: formData });
//     };

//     return (
//         <>
//         <Container className='mt-5'>
//             <h2 className='text-center'>Create New Prospect</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="companyName">Company Name:</label>
//                     <input
//                         type="text"
//                         id="companyName"
//                         name="companyName"
//                         className='form-control shadow-none'
//                         value={formData.companyName}
//                         onChange={handleInputChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="companyAddress">Company Address:</label>
//                     <input
//                         type="text"
//                         id="companyAddress"
//                         name="companyAddress"
//                         className='form-control shadow-none'
//                         value={formData.companyAddress}
//                         onChange={handleInputChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="companyPhone">Company Phone:</label>
//                     <input
//                         type="tel"
//                         id="companyPhone"
//                         name="companyPhone"
//                         className='form-control shadow-none'
//                         value={formData.companyPhone}
//                         onChange={handleInputChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="companyEmail">Company Email:</label>
//                     <input
//                         type="email"
//                         className='form-control shadow-none'
//                         id="companyEmail"
//                         name="companyEmail"
//                         value={formData.companyEmail}
//                         onChange={handleInputChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="contactName">Contact Name:</label>
//                     <input
//                         type="text"
//                         className='form-control shadow-none'
//                         id="contactName"
//                         name="contactName"
//                         value={formData.contactName}
//                         onChange={handleInputChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="contactPhone">Contact Phone:</label>
//                     <input
//                         type="tel"
//                         className='form-control shadow-none'
//                         id="contactPhone"
//                         name="contactPhone"
//                         value={formData.contactPhone}
//                         onChange={handleInputChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="contactEmail">Contact Email:</label>
//                     <input
//                         type="email"
//                         id="contactEmail"
//                         className='form-control shadow-none'
//                         name="contactEmail"
//                         value={formData.contactEmail}
//                         onChange={handleInputChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="details">Details:</label>
//                     <textarea rows={5} cols={30}
//                         className='form-control shadow-none'
//                         id="details"
//                         name="details"
//                         value={formData.details}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//                 {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
//                 <div className='mt-2'>
//                 <button className='btn btn-success w-100' type="submit" disabled={loading}>
//                     {loading ? 'Creating...' : 'Create Prospect'}
//                 </button>
//                 </div>
//             </form>
//         </Container>
//         </>
//     );
// };

// export default AddProspect;


import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Container, Form, Button, Alert } from "react-bootstrap";

const CREATE_PROSPECT = gql`
  mutation CreateProspect(
    $companyName: String,
    $companyAddress: String,
    $companyPhone: String,
    $companyEmail: String,
    $contactName: String,
    $contactPhone: String,
    $contactEmail: String,
    $details: String
  ) {
    adminCreateProspect(
      company_name: $companyName,
      company_address: $companyAddress,
      company_phone: $companyPhone,
      company_email: $companyEmail,
      contact_name: $contactName,
      contact_phone: $contactPhone,
      contact_email: $contactEmail,
      details: $details
    )
  }
`;

const CreateProspect: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyAddress: '',
    companyPhone: '',
    companyEmail: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    details: ''
  });

  const [createProspect, { data, loading, error }] = useMutation(CREATE_PROSPECT);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProspect({ variables: formData });
  };

  return (
    <>
    <div className='container mt-5'>
      <h1 className='text-center'>Create Prospect</h1>
      {data && <Alert variant='success'>Prospect created successfully!</Alert>}
      {error && <Alert variant='danger'>Error: {error.message}</Alert>}
      <form onSubmit={handleSubmit}>

          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
 
  
          <label>Company Address</label>
          <input
            type="text"
            className='form-control shadow-none'
            name="companyAddress"
            value={formData.companyAddress}
            onChange={handleChange}
            required
          />
     
     
          <label>Company Phone</label>
          <input
            type="text"
            className='form-control shadow-none'
            name="companyPhone"
            value={formData.companyPhone}
            onChange={handleChange}
            required
          />

  
          <label>Company Email</label>
          <input
            type="email"
            name="companyEmail"
            className='form-control shadow-none'
            value={formData.companyEmail}
            onChange={handleChange}
            required
          />


          <label>Contact Name</label>
          <input
            type="text"
            name="contactName"
            className='form-control shadow-none'
            value={formData.contactName}
            onChange={handleChange}
            required
          />


          <label>Contact Phone</label>
          <input
            type="text"
            className='form-control shadow-none'
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            required
          />

          <label>Contact Email</label>
          <input
            type="email"
            className='form-control shadow-none'
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            required
          />

        <div>
          <label>Details</label>
          <textarea
            name="details"
            className='form-control shadow-none'
            value={formData.details}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>
        <div className='mt-2'>
        <button className='btn btn-primary w-100'  type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Prospect'}
        </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default CreateProspect;
