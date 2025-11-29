import axios from "axios";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
export const COURSES_API = `${HTTP_SERVER}/api/courses`;
export const USERS_API = `${HTTP_SERVER}/api/users`;

export const axiosWithCredentials = axios.create({
  baseURL: HTTP_SERVER,
  withCredentials: true,
});

export const axiosApiProxy = axios.create({
  baseURL: '',
  withCredentials: true,
});

interface Module {
  _id?: string;
  name?: string;
  description?: string;
  course?: string;
  lessons?: unknown[];
  [key: string]: unknown;
}

interface Course {
  _id?: string;
  name?: string;
  number?: string;
  startDate?: string;
  endDate?: string;
  department?: string;
  credits?: number;
  description?: string;
  image?: string;
  [key: string]: unknown;
}

interface AxiosError {
  response?: {
    status?: number;
  };
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

export const findMyCourses = async () => {
  try {
    const { data } = await axiosApiProxy.get(`/api/users/current/courses`);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401 || axiosError.response?.status === 403) {
      return [];
    }
    throw error;
  }
};

export const createCourse = async (course: Course) => {
  const { data } = await axiosApiProxy.post(`/api/users/current/courses`, course);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`/api/courses/${id}`);
  return data;
};

export const updateCourse = async (course: Course) => {
  try {
    const { data } = await axiosWithCredentials.put(`/api/courses/${course._id}`, course);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 400) {
      throw new Error("You need to try again");
    }
    throw error;
  }
};

export const deleteModule = async (moduleId: string) => {
  const { data } = await axiosWithCredentials.delete(`/api/modules/${moduleId}`);
  return data;
};

export const updateModule = async (module: Module) => {
  const { data } = await axiosWithCredentials.put(`/api/modules/${module._id}`, module);
  return data;
};
