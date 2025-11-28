import axios from "axios";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

export const axiosWithCredentials = axios.create({
  baseURL: HTTP_SERVER,
  withCredentials: true,
});

interface Assignment {
  _id?: string;
  title?: string;
  name?: string;
  course?: string;
  description?: string;
  points?: number;
  assignmentGroup?: string;
  displayGradeAs?: string;
  submissionType?: string;
  onlineEntryOptions?: {
    textEntry?: boolean;
    websiteUrl?: boolean;
    mediaRecordings?: boolean;
    studentAnnotation?: boolean;
    fileUploads?: boolean;
  };
  dueDate?: string;
  dueTime?: string;
  availableFromDate?: string;
  availableFromTime?: string;
  untilDate?: string;
  untilTime?: string;
  [key: string]: unknown;
}

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`/api/courses/${courseId}/assignments`);
  return response.data;
};

export const createAssignmentForCourse = async (courseId: string, assignment: Assignment) => {
  const response = await axiosWithCredentials.post(`/api/courses/${courseId}/assignments`, assignment);
  return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axiosWithCredentials.delete(`/api/assignments/${assignmentId}`);
  return response.data;
};

export const updateAssignment = async (assignment: Assignment) => {
  const response = await axiosWithCredentials.put(`/api/assignments/${assignment._id}`, assignment);
  return response.data;
};

