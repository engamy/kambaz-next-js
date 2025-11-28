import axios from "axios";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
export const COURSES_API = `${HTTP_SERVER}/api/courses`;
export const USERS_API = `${HTTP_SERVER}/api/users`;

export const axiosWithCredentials = axios.create({
  baseURL: HTTP_SERVER,
  withCredentials: true,
});

export interface Module {
  _id?: string;
  name: string;
  description?: string;
  course: string;
  editing?: boolean;
  lessons?: Array<{
    _id: string;
    name: string;
    description?: string;
    module: string;
  }>;
}

export const createModuleForCourse = async (courseId: string, module: Module) => {
  const response = await axiosWithCredentials.post(`/api/courses/${courseId}/modules`, module);
  return response.data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`/api/courses/${courseId}/modules`);
  return response.data;
};

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

interface AxiosError {
  response?: {
    status?: number;
  };
}

export const findMyCourses = async () => {
  try {
    const { data } = await axiosWithCredentials.get(`/api/users/current/courses`);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401 || axiosError.response?.status === 403) {
      return [];
    }
    throw error;
  }
};

interface Course {
  _id?: string;
  name: string;
  number?: string;
  startDate?: string;
  endDate?: string;
  department?: string;
  credits?: number;
  description?: string;
  image?: string;
}

export const createCourse = async (course: Course) => {
  const { data } = await axiosWithCredentials.post(`/api/users/current/courses`, course);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`/api/courses/${id}`);
  return data;
};

export const updateCourse = async (course: Course) => {
  const { data } = await axiosWithCredentials.put(`/api/courses/${course._id}`, course);
  return data;
};

export const deleteModule = async (moduleId: string) => {
  const { data } = await axiosWithCredentials.delete(`/api/modules/${moduleId}`);
  return data;
};

export const updateModule = async (module: Module) => {
  const { data } = await axiosWithCredentials.put(`/api/modules/${module._id}`, module);
  return data;
};
