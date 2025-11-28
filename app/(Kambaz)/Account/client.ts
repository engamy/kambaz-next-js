import axios from "axios";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
export const USERS_API = `${HTTP_SERVER}/api/users`;

// For direct backend calls (no authentication needed)
export const axiosWithCredentials = axios.create({
  baseURL: HTTP_SERVER,
  withCredentials: true, 
});

// For authenticated requests through Next.js API route proxy (works in production)
export const axiosApiProxy = axios.create({
  baseURL: '', // Use relative URLs to hit Next.js API routes
  withCredentials: true,
});

console.log("HTTP_SERVER =", HTTP_SERVER);
console.log("USERS_API =", USERS_API);

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

export const signin = async (credentials: Credentials) => {
  // Use Next.js API route proxy to maintain session cookies in production
  const response = await axiosApiProxy.post(`/api/users/signin`, credentials);
  return response.data;
};

export const profile = async () => {
  // Use Next.js API route proxy to maintain session cookies in production
  const response = await axiosApiProxy.post(`/api/users/profile`);
  return response.data;
};

export const signup = async (user: User) => {
  // Use Next.js API route proxy to maintain session cookies in production
  const response = await axiosApiProxy.post(`/api/users/signup`, user);
  return response.data;
};

export const signout = async () => {
  // Use Next.js API route proxy to maintain session cookies in production
  const response = await axiosApiProxy.post(`/api/users/signout`);
  return response.data;
};

export const updateUser = async (user: User) => {
  // Use Next.js API route proxy to maintain session cookies in production
  const response = await axiosApiProxy.put(`/api/users/${user._id}`, user);
  return response.data;
};
