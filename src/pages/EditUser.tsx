


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useQuery, useMutation, gql } from '@apollo/client';
// import { Container, Form, Button } from "react-bootstrap";

// const GET_USER = gql`
//   query GetUser($id: Int!) {
//     adminGetUser(id: $id) {
//       id
//       title
//       firstname
//       lastname
//       email
//       phone
//       gender
//       status
//     }
//   }
// `;

// const UPDATE_USER = gql`
//   mutation UpdateUser($userId: Int!, $input: JSON) {
//     adminUpdateUser(userID: $userId, input: $input)
//   }
// `;

// const EditUser: React.FC = () => {
//   const { id } = useParams<{ id: number }>();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState<any>({});

//   const { data, loading, error } = useQuery(GET_USER, {
//     variables: { id: parseInt(id) },
//   });

//   const [updateUser] = useMutation(UPDATE_USER);

//   useEffect(() => {
//     if (data) {
//       setFormData(data.adminGetUser);
//     }
//   }, [data]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     updateUser({ variables: { userId: parseInt(id), input: formData } })
//       .then(() => {
//         navigate('/');
//       })
//       .catch(error => {
//         console.error('Error updating user:', error);
//       });
//   };

//   return (
//     <Container className='mt-5'>
//       <h1 className='text-center'>Edit User</h1>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="formTitle">
//           <Form.Label>Title</Form.Label>
//           <Form.Control
//             type="text"
//             name="title"
//             value={formData.title || ''}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="formFirstName">
//           <Form.Label>First Name</Form.Label>
//           <Form.Control
//             type="text"
//             name="firstname"
//             value={formData.firstname || ''}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="formLastName">
//           <Form.Label>Last Name</Form.Label>
//           <Form.Control
//             type="text"
//             name="lastname"
//             value={formData.lastname || ''}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="formEmail">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             name="email"
//             value={formData.email || ''}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="formPhone">
//           <Form.Label>Phone</Form.Label>
//           <Form.Control
//             type="text"
//             name="phone"
//             value={formData.phone || ''}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="formGender">
//           <Form.Label>Gender</Form.Label>
//           <Form.Control
//             type="text"
//             name="gender"
//             value={formData.gender || ''}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="formStatus">
//           <Form.Label>Status</Form.Label>
//           <Form.Control
//             type="text"
//             name="status"
//             value={formData.status || ''}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Save Changes
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default EditUser;

import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const GET_USER = gql`
  query GetUser($userId: Int!) {
    adminGetUser(userID: $userId) {
      id
      title
      firstname
      lastname
      email
      phone
      gender
      status
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($userId: Int!, $input: JSON) {
    adminUpdateUser(userID: $userId, input: $input)
  }
`;

const EditUser: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [updateUser] = useMutation(UPDATE_USER);
  const [userDetails, setUserDetails] = useState({
    title: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    gender: '',
    status: '',
  });

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId: parseInt(userId as string) },
    fetchPolicy: 'network-only', // This ensures we always get the latest data from the server
  });

  useEffect(() => {
    if (data && data.adminGetUser) {
      setUserDetails(data.adminGetUser);
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser({
        variables: {
          userId: parseInt(userId as string),
          input: userDetails,
        },
      });
      alert('User updated successfully!');
      navigate('/users');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
    <div className="container mt-5">
      <h1 className="text-center">Edit User</h1>
      <form onSubmit={handleSubmit}>
        {Object.entries(userDetails).map(([key, value]) => (
          key !== 'id' && (
            <div key={key} className="mb-3">
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                type="text"
                name={key}
                value={value as string}
                onChange={handleInputChange}
              />
            </div>
          )
        ))}
        <div className='mt-2'>
        <button className="btn btn-primary" type="submit">
          Update User
        </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default EditUser;