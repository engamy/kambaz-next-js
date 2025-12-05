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
  try {
    const { data } = await axiosWithCredentials.get(`/api/courses`);
    console.log("API Response - Courses data:", data);
    if (Array.isArray(data) && data.length > 0) {
      console.log("First course from API:", data[0]);
      console.log("First course name:", data[0]?.name);
      console.log("First course description:", data[0]?.description);
    }
    return data;
  } catch (error) {
    console.error("Error fetching all courses:", error);
    throw error;
  }
};

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

export const createCourse = async (course: Course) => {
  const { data } = await axiosWithCredentials.post(`/api/users/current/courses`, course);
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

export const deleteModule = async (courseId: string, moduleId: string) => {
  const response = await axios.delete(
    `${COURSES_API}/${courseId}/modules/${moduleId}`
  );
  return response.data;
 };

 export const updateModule = async (courseId: string, module: any) => {
  const { data } = await axios.put(
    `${COURSES_API}/${courseId}/modules/${module._id}`,
    module
  );
  return data;
 };
 