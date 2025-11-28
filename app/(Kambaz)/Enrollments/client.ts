import axios from "axios";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

export const axiosWithCredentials = axios.create({
  baseURL: HTTP_SERVER,
  withCredentials: true,
});

export const enrollInCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.post(`/api/users/current/courses/${courseId}/enrollments`);
  return response.data;
};

export const unenrollFromCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.delete(`/api/users/current/courses/${courseId}/enrollments`);
  return response.data;
};

export const findEnrollment = async (courseId: string) => {
  try {
    const response = await axiosWithCredentials.get(`/api/users/current/courses/${courseId}/enrollments`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

