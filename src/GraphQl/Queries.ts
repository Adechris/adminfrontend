
import { gql } from '@apollo/client';


export const GET_ADMINS = gql`
  query GetAdmins {
    admins {
      id
      email
      name
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




export const GET_USERS = gql`
  query {
    getUsers {
      id
      firstname
      lastname
      email
    }
  }
`;



export const GET_PROSPECTS = gql`
  query GetProspects($offset: Int!) {
    adminGetProspect(offset: $offset) {
      id
      company_name
      company_address
      company_phone
      company_email
      contact_name
      contact_phone
      contact_email
      details
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
