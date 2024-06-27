// import React, { useState } from 'react';
// import { gql, useMutation } from '@apollo/client';
// import { Container, Form, Button, Alert } from "react-bootstrap";

// const PASSWORDLESS_REGISTER = gql`
//   mutation PasswordlessRegister($input: RegisterInput) {
//     passwordlessRegister(input: $input)
//   }
// `;

// const Register: React.FC = () => {
//   const [formData, setFormData] = useState({
//     dateOfBirth: '',
//     email: '',
//     firstname: '',
//     gender: '',
//     lastname: '',
//     phone: '',
//     photo: '',
//     title: ''
//   });

//   const [register, { data, loading, error }] = useMutation(PASSWORDLESS_REGISTER);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     register({ variables: { input: formData } });
//   };

//   return (
//     <Container className='mt-5'>
//       <h1 className='text-center'>Register</h1>
//       {data && <Alert variant='success'>Registration successful!</Alert>}
//       {error && <Alert variant='danger'>Error: {error.message}</Alert>}
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="formTitle">
//           <Form.Label>Title</Form.Label>
//           <Form.Control
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>
//         <Form.Group controlId="formFirstname">
//           <Form.Label>First Name</Form.Label>
//           <Form.Control
//             type="text"
//             name="firstname"
//             value={formData.firstname}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>
//         <Form.Group controlId="formLastname">
//           <Form.Label>Last Name</Form.Label>
//           <Form.Control
//             type="text"
//             name="lastname"
//             value={formData.lastname}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>
//         <Form.Group controlId="formEmail">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>
//         <Form.Group controlId="formPhone">
//           <Form.Label>Phone</Form.Label>
//           <Form.Control
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>
//         <Form.Group controlId="formGender">
//           <Form.Label>Gender</Form.Label>
//           <Form.Control
//             as="select"
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </Form.Control>
//         </Form.Group>
//         <Form.Group controlId="formDateOfBirth">
//           <Form.Label>Date of Birth</Form.Label>
//           <Form.Control
//             type="date"
//             name="dateOfBirth"
//             value={formData.dateOfBirth}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>
//         <Form.Group controlId="formPhoto">
//           <Form.Label>Photo URL</Form.Label>
//           <Form.Control
//             type="text"
//             name="photo"
//             value={formData.photo}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         <Button variant="primary" type="submit" disabled={loading}>
//           {loading ? 'Registering...' : 'Register'}
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Container, Form, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';


const PASSWORDLESS_REGISTER = gql`
  mutation PasswordlessRegister($input: RegisterInput) {
    passwordlessRegister(input: $input)
  }
`;

const PasswordlessRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    email: '',
    firstname: '',
    gender: '',
    lastname: '',
    phone: '',
    photo: '',
    title: ''
  });

  const [register, { data, loading, error }] = useMutation(PASSWORDLESS_REGISTER);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          [name]: reader.result as string
        });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({ variables: { input: formData } });
  };

  return (
    <div className='container mt-5'>
      <h1 className='text-center'>Register</h1>
      {data && <Alert variant='success'>Registration successful!</Alert>}
      {error && <Alert variant='danger'>Error: {error.message}</Alert>}
      <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            className='shadow-none'
            value={formData.title}
            onChange={handleChange}
          />
          <label className="mt-2">First Name</label>
          <input
            type="text"
            className='shadow-none'
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          <label className="mt-2">Last Name</label>
          <input
            type="text"
            className='shadow-none'
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
          <label className="mt-2">Email</label>
          <input
            type="email"
            className='shadow-none'
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label className="mt-2">Phone</label>
          <input
            type="text"
            className='shadow-none'
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <label className="mt-2">Gender</label>
          <select
            name="gender"
            className='shadow-none'
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label className="mt-2">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            className='shadow-none'
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />

          <label className="mt-2">Photo</label>
          <input
            type="file"
            accept='image/*'
            className='shadow-none'
            name="photo"
            onChange={handleChange}
            required
          />
     
        <div className='mt-2'>
        <button className="btn btn-primary w-100" type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        </div>
        <div className='mt-2'>
           <p> Already Registered? <Link to="/login">login</Link> Here!</p> 
        </div>
      </form>
    </div>
  );
};

export default PasswordlessRegister;
