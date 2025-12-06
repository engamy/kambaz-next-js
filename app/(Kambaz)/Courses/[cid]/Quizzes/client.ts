import axios from "axios";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

export const axiosWithCredentials = axios.create({
  baseURL: HTTP_SERVER,
  withCredentials: true,
});

interface Quiz {
  _id?: string;
  title?: string;
  name?: string;
  course?: string;
  description?: string;
  points?: number;
  published?: boolean;
  availableFromDate?: string;
  availableFromTime?: string;
  untilDate?: string;
  untilTime?: string;
  dueDate?: string;
  dueTime?: string;
  questions?: unknown[];
  quizType?: string;
  assignmentGroup?: string;
  shuffleAnswers?: boolean;
  timeLimit?: number;
  multipleAttempts?: boolean;
  howManyAttempts?: number;
  showCorrectAnswers?: string;
  accessCode?: string;
  oneQuestionAtATime?: boolean;
  webcamRequired?: boolean;
  lockQuestionsAfterAnswering?: boolean;
  [key: string]: unknown;
}

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`/api/courses/${courseId}/quizzes`);
  return response.data;
};

export const createQuizForCourse = async (courseId: string, quiz: Quiz) => {
  const response = await axiosWithCredentials.post(`/api/courses/${courseId}/quizzes`, quiz);
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(`/api/quizzes/${quizId}`);
  return response.data;
};

export const updateQuiz = async (quiz: Quiz) => {
  const response = await axiosWithCredentials.put(`/api/quizzes/${quiz._id}`, quiz);
  return response.data;
};

export const findQuizById = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`/api/quizzes/${quizId}`);
  return response.data;
};

export const findLatestAttemptForQuiz = async (quizId: string) => {
  try {
    const response = await axiosWithCredentials.get(`/api/quizzes/${quizId}/attempts/latest`);
    return response.data;
  } catch {
    return null;
  }
};

export const findAttemptsForQuiz = async (quizId: string) => {
  try {
    const response = await axiosWithCredentials.get(`/api/quizzes/${quizId}/attempts`);
    return response.data;
  } catch {
    return [];
  }
};

export const createQuizAttempt = async (quizId: string, attempt: {
  score: number;
  totalPoints: number;
  answers: Array<{ questionId: string; answer: string; isCorrect: boolean }>;
  startedAt: string;
}) => {
  const response = await axiosWithCredentials.post(`/api/quizzes/${quizId}/attempts`, attempt);
  return response.data;
};

