// src/types.ts

// Event types
export interface Event {
  id: number;
  prospectID: number;
  schoolID: number;
  title: string;
  event_date: string;
  event_time: string;
  address: string;
  details: string;
  created_by: string;
  status?: string;
}

export interface Notification {
  calendarID: number;
  date_d: string;
}

export interface EventUser {
  calendarID: number;
  userID: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

export interface Event {
  id: number;
  prospectID: number;
  schoolID: number;
  title: string;
  event_date: string;
  event_time: string;
  address: string;
  details: string;
  created_by: string;
  company_name?: string;
  company_address?: string;
  company_phone?: string;
  company_email?: string;
  contact_name?: string;
  contact_phone?: string;
  contact_email?: string;
  schoolName?: string;
  schoolPhone?: string;
  schoolEmail?: string;
}

// Prospect types
export interface Prospect {
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


// Admin types
export interface Admin {
  id: string;
  email: string;
  name: string;
}

export interface AdminUser {
  id: number;
  title: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  photo: string;
  status: string;
  json: string;
  limitToClass?: any[];
  schoolUserID?: number;
}

export interface AdminSchool {
  id: number;
  name: string;
  email: string;
  phone: number;
  aiCredit: number;
  status: string;
  plan: string;
  planValidity: number;
  userID: number;
  parents: number;
  staff: number;
}

export interface AdminRole {
  id: number;
  name: string;
  json: string;
  status: string;
}

export interface AdminGame {
  id: number;
  name: string;
  description: string;
  imageURL: string;
  status: string;
}

export interface AdminEmail {
  id: number;
  json: string;
  status: string;
  schedule: string;
  schoolID: number;
}

export interface AdminSubscription {
  id: number;
  schoolID: number;
  reference: string;
  json: string;
  status: string;
  created_at: string;
  created_by: string;
  gatewayResponse: string;
}

// User types
export interface LoginInput {
  email: string;
  password: string;
}

export interface SendLoginTokenInput {
  email: string;
}

export interface PasswordlessLoginInput {
  email: string;
  token: string;
}

export interface PasswordlessRegisterInput {
  title: string;
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  phone: string;
  dateOfBirth: string;
  photo: string;
}

export interface UpdateProfileInput {
  title?: string;
  firstname?: string;
  lastname: string;
  gender: string;
  phone: string;
  dateOfBirth: string;
  photo?: string;
}

export interface User {
  id: number;
  title: string;
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  phone: string;
  dateOfBirth: string;
  photo: string;
  status: string;
  json: string;
  limitToClass?: any[];
  schoolUserID?: number;
}
