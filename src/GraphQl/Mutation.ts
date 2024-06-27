import { gql } from '@apollo/client';


export const CURRENT_USER = gql`
  query currentUser {
    currentUser {
    id
    title
    firstname
    lastname
    email
    phone
    gender
    status
    employers {
      activeTerm
      address
      campus {
        id
        name
      }
      email
      id
      logo
      name
      phone
      timeSettings
      website
    }
    children {
      balance
      checkedIn
      dateOfBirth
      firstname
      gender
      id
      lastname
      middlename
      parentReplied
      parents {
        id
        title
        firstname
        lastname
        email
        phone
        gender
        status
        photo
      }
      photo
      room {
        id
        name
        real_class
      }
      status
    }
    photo
    dateOfBirth
  }
}
`;

export const GET_USERS = gql`
query GetUsers($input: userInput!, $schoolID: Int) {
  getUsers(input: $input, schoolID: $schoolID) {
    id
    title
    firstname
    email
    lastname
    phone
    gender
    status
    photo
    limitToClass
    schoolUserID
  }
}
`;


export const LOGIN = gql`
mutation response($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    refreshToken
  }
}
`;


export const PASSWORDLESS_LOGIN = gql`
mutation response($email: String!, $token: String!) {
  passwordlessLogin(email: $email, token: $token) {
    accessToken
    refreshToken
  }
}
`;


export const SEND_TOKEN = gql`
mutation sendLoginToken($email: String!) {
  sendLoginToken(email: $email)
}
`;



export const PASSWORDLESS_REGISTER = gql`
mutation response($input: RegisterInput) {
  passwordlessRegister(input: $input)
}
`;



export const FORGOT_PASSWORD = gql`
mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    success
    message
  }
}
`;


export const RESET_PASSWORD = gql`
mutation ResetPassword($email: String!, $token: String!, $password: String!) {
  resetPassword(email: $email, token: $token, password: $password) {
    success
    message
  }
}
`;

export const REGISTER = gql`
mutation response($input: RegisterInput) {
  register(input: $input) {
    success
    message
  }
}
`;

export const UPDATE_PROFILE = gql`
mutation profile($input: UpdateUserInput) {
  updateProfile(input: $input) 
}
`;



export const RESET_USER_PASSWORD = gql`
mutation ResetUserPassword($schoolID: Int, $email: String!, $password: String!, $password2: String!) {
  resetUserPassword(schoolID: $schoolID, email: $email, password: $password, password2: $password2)
}
`;

export const CREATE_PROSPECT = gql`
  mutation CreateProspect(
    $company_name: String!,
    $company_address: String,
    $company_phone: String,
    $company_email: String,
    $contact_name: String!,
    $contact_phone: String!,
    $contact_email: String,
    $details: String
  ) {
    adminCreateProspect(
      company_name: $company_name,
      company_address: $company_address,
      company_phone: $company_phone,
      company_email: $company_email,
      contact_name: $contact_name,
      contact_phone: $contact_phone,
      contact_email: $contact_email,
      details: $details
    ) {
      id
    }
  }
`;




export const UPDATE_PROSPECT = gql`
  mutation UpdateProspect(
    $id: ID!,
    $company_name: String!,
    $company_address: String,
    $company_phone: String,
    $company_email: String,
    $contact_name: String!,
    $contact_phone: String!,
    $contact_email: String,
    $details: String
  ) {
    adminUpdateProspect(
      id: $id,
      company_name: $company_name,
      company_address: $company_address,
      company_phone: $company_phone,
      company_email: $company_email,
      contact_name: $contact_name,
      contact_phone: $contact_phone,
      contact_email: $contact_email,
      details: $details
    ) {
      id
    }
  }
`;

export const DELETE_PROSPECT = gql`
  mutation DeleteProspect($id: ID!) {
    adminDeleteProspect(id: $id) {
      id
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $name: String!, $role: String!) {
    createUser(email: $email, name: $name, role: $role) {
      id
      email
      name
      role
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $email: String, $name: String, $role: String) {
    updateUser(id: $id, email: $email, name: $name, role: $role) {
      id
      email
      name
      role
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const CREATE_ADMIN = gql`
  mutation CreateAdmin($email: String!, $name: String!) {
    createAdmin(email: $email, name: $name) {
      id
      email
      name
    }
  }
`;

export const UPDATE_ADMIN = gql`
  mutation UpdateAdmin($id: ID!, $email: String, $name: String) {
    updateAdmin(id: $id, email: $email, name: $name) {
      id
      email
      name
    }
  }
`;

export const DELETE_ADMIN = gql`
  mutation DeleteAdmin($id: ID!) {
    deleteAdmin(id: $id) {
      id
    }
  }
`;


export const GET_EVENTS = gql`
  query GetEvents($startDate: String!, $endDate: String!) {
    adminGetEvents(startDate: $startDate, endDate: $endDate) {
      id
      prospectID
      schoolID
      title
      event_date
      event_time
      address
      details
      created_by
      status
    }
  }
`;

export const GET_EVENT_DETAILS = gql`
  query GetEventDetails($id: ID!) {
    adminGetEventNotificationAndUser(id: $id) {
      id
      notifications {
        calendarID
        date_d
      }
      users {
        calendarID
        userID
        firstname
        lastname
        email
        phone
      }
      prospectHistory {
        id
        event_date
        details
      }
      schoolHistory {
        event_date
        details
      }
    }
  }
`;

export const GET_POSTPONED_EVENTS = gql`
  query GetPostponedEvents($schoolId: Int, $offset: Int, $prospectID: Int) {
    adminGetAllPostponedEvents(schoolId: $schoolId, offset: $offset, prospectID: $prospectID) {
      id
      prospectID
      schoolID
      title
      event_date
      event_time
      address
      details
      created_by
      status
    }
  }
`;

// src/graphql/mutations.ts

export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $prospectID: Int,
    $schoolID: Int,
    $title: String!,
    $event_date: String!,
    $event_time: String!,
    $address: String,
    $details: String,
    $notifications: [String],
    $userIDs: [Int]
  ) {
    adminCreateEvent(
      prospectID: $prospectID,
      schoolID: $schoolID,
      title: $title,
      event_date: $event_date,
      event_time: $event_time,
      address: $address,
      details: $details,
      notifications: $notifications,
      userIDs: $userIDs
    )
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $id: ID!,
    $prospectID: Int,
    $schoolID: Int,
    $title: String!,
    $eventDateTime: String!,
    $address: String,
    $details: String,
    $notifications: [String]
  ) {
    adminUpdateEvent(
      id: $id,
      prospectID: $prospectID,
      schoolID: $schoolID,
      title: $title,
      eventDateTime: $eventDateTime,
      address: $address,
      details: $details,
      notifications: $notifications
    )
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    adminDeleteEvent(id: $id)
  }
`;

export const POSTPONE_EVENT = gql`
  mutation PostponeEvent(
    $id: ID!,
    $prospectID: Int,
    $schoolID: Int,
    $title: String!,
    $eventDateTime: String!,
    $address: String,
    $details: String,
    $notifications: [String],
    $status: String!
  ) {
    adminPostponeEvent(
      id: $id,
      prospectID: $prospectID,
      schoolID: $schoolID,
      title: $title,
      eventDateTime: $eventDateTime,
      address: $address,
      details: $details,
      notifications: $notifications,
      status: $status
    )
  }
`;

export const CONCLUDE_EVENT = gql`
  mutation ConcludeEvent($id: ID!) {
    adminConcludeEvent(id: $id)
  }
`;


