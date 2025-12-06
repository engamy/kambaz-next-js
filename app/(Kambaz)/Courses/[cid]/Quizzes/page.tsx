"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { FaPlus } from "react-icons/fa";
import * as client from "./client";
import DeleteQuizModal from "./DeleteQuizModal";
import QuizContextMenu from "./QuizContextMenu";

interface Quiz {
  _id: string;
  title: string;
  name: string;
  course: string;
  description: string;
  points: number;
  published: boolean;
  availableFromDate: string;
  availableFromTime: string;
  untilDate: string;
  untilTime: string;
  dueDate: string;
  dueTime: string;
  questions: unknown[];
  [key: string]: unknown;
}

interface QuizAttempt {
  _id: string;
  score: number;
  totalPoints: number;
  submittedAt: string;
}

export default function Quizzes() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.cid as string;
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<Quiz | null>(null);
  const [quizScores, setQuizScores] = useState<Record<string, QuizAttempt | null>>({});
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const canEdit = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const isStudent = currentUser?.role === "STUDENT";

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (courseId) {
        try {
          const fetchedQuizzes = await client.findQuizzesForCourse(courseId);
          
          // Sort quizzes by available date (earliest first)
          const sortedQuizzes = [...fetchedQuizzes].sort((a, b) => {
            // Handle quizzes without availableFromDate (put them at the end)
            if (!a.availableFromDate && !b.availableFromDate) return 0;
            if (!a.availableFromDate) return 1;
            if (!b.availableFromDate) return -1;
            
            // Combine date and time for comparison (format: YYYY-MM-DDTHH:MM)
            const dateTimeA = a.availableFromDate + 'T' + (a.availableFromTime || '00:00:00');
            const dateTimeB = b.availableFromDate + 'T' + (b.availableFromTime || '00:00:00');
            
            // Convert to Date objects for proper comparison
            const dateA = new Date(dateTimeA);
            const dateB = new Date(dateTimeB);
            
            return dateA.getTime() - dateB.getTime();
          });
          
          setQuizzes(sortedQuizzes);
          
          // Fetch scores for students
          if (isStudent) {
            const scores: Record<string, QuizAttempt | null> = {};
            for (const quiz of sortedQuizzes) {
              const attempt = await client.findLatestAttemptForQuiz(quiz._id);
              scores[quiz._id] = attempt;
            }
            setQuizScores(scores);
          }
        } catch {
          // Error fetching quizzes
        }
      }
    };
    fetchQuizzes();
  }, [courseId, isStudent]);

  const handleDeleteClick = (quiz: Quiz) => {
    setQuizToDelete(quiz);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (quizToDelete) {
      try {
        await client.deleteQuiz(quizToDelete._id);
        setQuizzes(quizzes.filter((q) => q._id !== quizToDelete._id));
        setQuizToDelete(null);
        setShowDeleteModal(false);
      } catch {
        // Error deleting quiz
      }
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setQuizToDelete(null);
  };

  const handlePublish = async (quiz: Quiz) => {
    try {
      const updatedQuiz = { ...quiz, published: true };
      await client.updateQuiz(updatedQuiz);
      setQuizzes(quizzes.map((q) => (q._id === quiz._id ? { ...q, published: true } : q)));
    } catch {
      // Error publishing quiz
    }
  };

  const handleUnpublish = async (quiz: Quiz) => {
    try {
      const updatedQuiz = { ...quiz, published: false };
      await client.updateQuiz(updatedQuiz);
      setQuizzes(quizzes.map((q) => (q._id === quiz._id ? { ...q, published: false } : q)));
    } catch {
      // Error unpublishing quiz
    }
  };

  const handleAddQuiz = () => {
    router.push(`/Courses/${courseId}/Quizzes/new/Edit`);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes}${ampm}`;
  };

  const getAvailabilityStatus = (quiz: Quiz) => {
    const now = new Date();
    const availableFrom = quiz.availableFromDate && quiz.availableFromTime
      ? new Date(`${quiz.availableFromDate}T${quiz.availableFromTime}`)
      : null;
    const until = quiz.untilDate && quiz.untilTime
      ? new Date(`${quiz.untilDate}T${quiz.untilTime}`)
      : null;

    if (until && now > until) {
      return "Closed";
    }
    if (availableFrom && now < availableFrom) {
      return `Not available until ${formatDate(quiz.availableFromDate)}`;
    }
    if (availableFrom && until && now >= availableFrom && now <= until) {
      return "Available";
    }
    if (availableFrom && now >= availableFrom) {
      return "Available";
    }
    return "Available";
  };

  const getAvailabilityDisplay = (quiz: Quiz) => {
    const status = getAvailabilityStatus(quiz);
    if (status === "Closed") {
      return <span className="text-danger">Closed</span>;
    }
    if (status.startsWith("Not available until")) {
      return <span className="text-muted">{status}</span>;
    }
    return <span className="text-success">Available</span>;
  };

  return (
    <>
      <div id="wd-quizzes" className="p-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="flex-fill"></div>
          {canEdit && (
            <button
              type="button"
              className="btn btn-danger"
              id="wd-add-quiz"
              onClick={handleAddQuiz}
            >
              <FaPlus className="me-1" />Quiz
            </button>
          )}
        </div>

        {quizzes.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">
              {canEdit 
                ? "Click the + Quiz button to add a new quiz."
                : "There are currently no quizzes for this course."}
            </p>
          </div>
        ) : (
          <div className="wd-quiz-list">
            {quizzes.map((quiz) => {
              const attempt = quizScores[quiz._id];
              const scoreDisplay = attempt
                ? `${attempt.score} / ${attempt.totalPoints}`
                : null;

              return (
                <div
                  key={quiz._id}
                  className="wd-quiz-item border rounded-1 mb-3 p-3"
                  style={{ borderLeft: '4px solid #198754' }}
                >
                  <div className="d-flex align-items-start">
                    <div className="me-3 mt-1">
                      {quiz.published ? (
                        <span
                          className="text-success"
                          style={{ cursor: canEdit ? "pointer" : "default", fontSize: "1.2rem" }}
                          onClick={canEdit ? () => handleUnpublish(quiz) : undefined}
                          title="Published - Click to unpublish"
                        >
                          ✅
                        </span>
                      ) : (
                        <span
                          className="text-danger"
                          style={{ cursor: canEdit ? "pointer" : "default", fontSize: "1.2rem" }}
                          onClick={canEdit ? () => handlePublish(quiz) : undefined}
                          title="Unpublished - Click to publish"
                        >
                          🚫
                        </span>
                      )}
                    </div>
                    <div className="flex-fill">
                      <div className="d-flex align-items-center mb-2">
                        <Link
                          href={`/Courses/${courseId}/Quizzes/${quiz._id}`}
                          className="wd-quiz-link fw-bold text-decoration-none text-dark"
                        >
                          {quiz.title}
                        </Link>
                        {canEdit && (
                          <div className="ms-3">
                            <QuizContextMenu
                              quizId={quiz._id}
                              quizName={quiz.name}
                              published={quiz.published}
                              onEdit={() => router.push(`/Courses/${courseId}/Quizzes/${quiz._id}/Edit`)}
                              onDelete={() => handleDeleteClick(quiz)}
                              onPublish={() => handlePublish(quiz)}
                              onUnpublish={() => handleUnpublish(quiz)}
                              canEdit={canEdit}
                            />
                          </div>
                        )}
                      </div>
                      <div className="ms-0">
                        <div className="text-muted small mb-1">
                          <strong>Availability:</strong> {getAvailabilityDisplay(quiz)}
                        </div>
                        {quiz.dueDate && (
                          <div className="text-muted small mb-1">
                            <strong>Due:</strong> {formatDate(quiz.dueDate)} {quiz.dueTime && `at ${formatTime(quiz.dueTime)}`}
                          </div>
                        )}
                        <div className="text-muted small mb-1">
                          <strong>Points:</strong> {quiz.points}
                        </div>
                        <div className="text-muted small mb-1">
                          <strong>Questions:</strong> {quiz.questions?.length || 0}
                        </div>
                        {isStudent && scoreDisplay && (
                          <div className="text-muted small mb-1">
                            <strong>Score:</strong> {scoreDisplay}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <DeleteQuizModal
        show={showDeleteModal}
        handleClose={handleDeleteCancel}
        quizName={quizToDelete?.name || ""}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}

