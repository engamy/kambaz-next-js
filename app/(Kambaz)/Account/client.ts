import axios from "axios";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
export const USERS_API = `${HTTP_SERVER}/api/users`;

export const axiosWithCredentials = axios.create({
  baseURL: HTTP_SERVER,
  withCredentials: true, 
});
console.log("HTTP_SERVER =", HTTP_SERVER);
console.log("USERS_API =", USERS_API);

export interface Credentials {
  username?: string;
  password?: string;
}

export interface User {
  _id?: string;
  id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: string;
  role?: string;
  loginId?: string;
  section?: string;
  lastActivity?: string;
  totalActivity?: string;
}

export const signin = async (credentials: Credentials) => {
  const response = await axiosWithCredentials.post(`/api/users/signin`, credentials);
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(`/api/users/profile`);
  return response.data;
};

export const signup = async (user: User) => {
  const response = await axiosWithCredentials.post(`/api/users/signup`, user);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`/api/users/signout`);
  return response.data;
};

export const updateUser = async (user: User) => {
  const response = await axiosWithCredentials.put(`/api/users/${user._id}`, user);
  return response.data;
};
