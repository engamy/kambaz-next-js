import axios from "axios";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
export const USERS_API = `${HTTP_SERVER}/api/users`;

export const axiosWithCredentials = axios.create({
  baseURL: HTTP_SERVER,
  withCredentials: true, 
});

interface Credentials {
  username?: string;
  password?: string;
}

interface User {
  _id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: string;
  role?: string;
  [key: string]: unknown;
}

export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(USERS_API);
  return response.data;
};

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
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const findUsersByRole = async (role: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const findUsersByPartialName = async (name: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?name=${name}`);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${id}`);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axiosWithCredentials.delete( `${USERS_API}/${userId}` );
  return response.data;
};

export const createUser = async (user: User) => {
  const response = await axiosWithCredentials.post(`${USERS_API}`, user);
  return response.data;
};
