import axios from "axios";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
export const USERS_API = `${HTTP_SERVER}/api/users`;

export const axiosWithCredentials = axios.create({
  baseURL: HTTP_SERVER,
  withCredentials: true, 
});
console.log("HTTP_SERVER =", HTTP_SERVER);
console.log("USERS_API =", USERS_API);

export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`/api/users/signup`, user);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`/api/users/signout`);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(`/api/users/${user._id}`, user);
  return response.data;
};
