

// import React, { useState } from 'react';
// import { useQuery, gql } from '@apollo/client';
// import {Container, Table} from "react-bootstrap"
// import {FaEdit} from "react-icons/fa"

// const GET_USERS = gql`
//   query GetUsers($offset: Int) {
//     adminGetUsers(offset: $offset)
//   }
// `;

// const UserList: React.FC = () => {
//   const [offset, setOffset] = useState(0);
//   const { loading, error, data, fetchMore } = useQuery(GET_USERS, {
//     variables: { offset },
//     notifyOnNetworkStatusChange: true,
//   });

//   if (loading && !data) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const users = data?.adminGetUsers || [];

//   const loadMore = () => {
//     fetchMore({
//       variables: {
//         offset: users.length,
//       },
//       updateQuery: (prev, { fetchMoreResult }) => {
//         if (!fetchMoreResult) return prev;
//         return {
//           adminGetUsers: [...prev.adminGetUsers, ...fetchMoreResult.adminGetUsers],
//         };
//       },
//     }).catch(error => {
//       console.error('Error fetching more users:', error);
//     });
//   };

//   return (
//     <Container className='mt-5'>
//       <h1 className='text-center'>User List</h1>
//       <Table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Title</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Gender</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user: any) => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.title}</td>
//               <td>{user.firstname}</td>
//               <td>{user.lastname}</td>
//               <td>{user.email}</td>
//               <td>{user.phone}</td>
//               <td>{user.gender}</td>
//               <td>{user.status}</td>
//               <td>
//                 <button className='btn btn-success'><FaEdit/></button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       {loading ? (
//         <p>Loading more...</p>
//       ) : (
//         <button onClick={loadMore}>Load More</button>
//       )}
//     </Container>
//   );
// };

// export default UserList;



import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Container, Table, Modal, Button, Form } from "react-bootstrap";
import {FaEdit} from "react-icons/fa"

const GET_USERS = gql`
  query GetUsers($offset: Int) {
    adminGetUsers(offset: $offset)
  }
`;

const UPDATE_USER = gql`
  mutation Mutation($userId: Int, $input: JSON) {
    adminUpdateUser(userID: $userId, input: $input)
  }
`;

const UserList: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({});
  
  const { loading, error, data, fetchMore } = useQuery(GET_USERS, {
    variables: { offset },
    notifyOnNetworkStatusChange: true,
  });

  const [updateUser] = useMutation(UPDATE_USER);

  if (loading && !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const users = data?.adminGetUsers || [];

  const loadMore = () => {
    fetchMore({
      variables: {
        offset: users.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          adminGetUsers: [...prev.adminGetUsers, ...fetchMoreResult.adminGetUsers],
        };
      },
    }).catch(error => {
      console.error('Error fetching more users:', error);
    });
  };

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setFormData(user);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedUser(null);
    setFormData({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ variables: { userId: selectedUser.id, input: formData } })
      .then(() => {
        setShowModal(false);
        setSelectedUser(null);
        setFormData({});
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <>
    <div className='container mt-5'>
      <h1 className='text-center'>User List</h1>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.title}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.gender}</td>
              <td>{user.status}</td>
              <td>
                <button className='btn btn-success' onClick={() => handleEdit(user)}><FaEdit/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {loading ? (
        <p>Loading more...</p>
      ) : (
        <button onClick={loadMore}>Load More</button>
      )}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
          
              <label>Title</label>
              <input
                type="text"
                name="title"
                className='form-control shadow-none'
                value={formData.title || ''}
                onChange={handleChange}
              />
           
         
              <label>First Name</label>
              <input
                type="text"
                name="firstname"
                className='form-control shadow-none'
                value={formData.firstname || ''}
                onChange={handleChange}
              />
          
         
              <label>Last Name</label>
              <input
                type="text"
                name="lastname"
                className='form-control shadow-none'
                value={formData.lastname || ''}
                onChange={handleChange}
              />
   
        
              <label>Email</label>
              <input
                type="email"
                name="email"
                className='form-control shadow-none'
                value={formData.email || ''}
                onChange={handleChange}
              />
              <label>Phone</label>
              <input
                type="text"
                className='form-control shadow-none'
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
              />

              <label>Gender</label>
              <input
                type="text"
                name="gender"
                className='form-control shadow-none'
                value={formData.gender || ''}
                onChange={handleChange}
              />
              <label>Status</label>
              <input
                type="text"
                name="status"
                className='form-control shadow-none'
                value={formData.status || ''}
                onChange={handleChange}
              />
              <div className='mt-2'>
            <button className="btn btn-primary" type="submit">
              Save Changes
            </button>
              </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
    </>
  );
};

export default UserList;
