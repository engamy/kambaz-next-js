"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as client from "./client";

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
  questions?: Array<{ points?: number; [key: string]: unknown }>;
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

interface QuizAttempt {
  _id?: string;
  score?: number;
  totalPoints?: number;
  submittedAt?: string;
  [key: string]: unknown;
}

export default function QuizDetails() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.cid as string;
  const quizId = params.qid as string;
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isStudent = currentUser?.role === "STUDENT";

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [latestAttempt, setLatestAttempt] = useState<QuizAttempt | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_allAttempts, setAllAttempts] = useState<QuizAttempt[]>([]);
  const [canTakeQuiz, setCanTakeQuiz] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (quizId) {
        try {
          const fetchedQuiz = await client.findQuizById(quizId);
          setQuiz(fetchedQuiz);
        } catch {
          // Error fetching quiz
        }
      }
    };
    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    const fetchAttempts = async () => {
      if (quiz && quiz._id && isStudent) {
        try {
          const attempts = await client.findAttemptsForQuiz(quiz._id);
          setAllAttempts(attempts);
          if (attempts.length > 0) {
            setLatestAttempt(attempts[0]);
            
            // Check if student can take quiz again
            if (quiz.multipleAttempts && quiz.howManyAttempts) {
              if (attempts.length >= quiz.howManyAttempts) {
                setCanTakeQuiz(false);
              }
            } else if (!quiz.multipleAttempts && attempts.length > 0) {
              setCanTakeQuiz(false);
            }
          }
        } catch {
          // Error fetching attempts
        }
      }
    };
    fetchAttempts();
  }, [quiz, isStudent]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Not set";
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes}${ampm}`;
  };

  const calculatedPoints = quiz?.questions?.reduce((sum, q) => sum + (q.points || 0), 0) || 0;

  if (!quiz) {
    return (
      <Container className="mt-4">
        <div>Loading quiz...</div>
      </Container>
    );
  }

  if (isStudent) {
    return (
      <Container className="mt-4">
        <div id="wd-quiz-details-student">
          <h2 className="mb-4">{quiz.title || "Quiz"}</h2>
          {quiz.description && (
            <div className="mb-4">
              <div dangerouslySetInnerHTML={{ __html: quiz.description }} />
            </div>
          )}

          {!quiz.published && (
            <div className="alert alert-warning mb-4">
              This quiz is not yet published and cannot be taken.
            </div>
          )}

          {quiz.published && canTakeQuiz && (
            <div className="mb-4">
              <Button 
                variant="danger" 
                size="lg" 
                onClick={() => router.push(`/Courses/${courseId}/Quizzes/${quizId}/Take`)}
              >
                Start Quiz
              </Button>
            </div>
          )}

          {latestAttempt && (
            <div className="mb-4 p-3 border rounded">
              <h5>Last Attempt Results</h5>
              <p className="mb-1">
                <strong>Score:</strong> {latestAttempt.score || 0} / {latestAttempt.totalPoints || 0}
                {latestAttempt.totalPoints && latestAttempt.totalPoints > 0 && (
                  <span> ({Math.round(((latestAttempt.score || 0) / latestAttempt.totalPoints) * 100)}%)</span>
                )}
              </p>
              {latestAttempt.submittedAt && (
                <p className="mb-0 text-muted small">
                  Submitted: {new Date(latestAttempt.submittedAt).toLocaleString()}
                </p>
              )}
              <div className="mt-3">
                <Button
                  variant="outline-primary"
                  onClick={() => router.push(`/Courses/${courseId}/Quizzes/${quizId}/Take`)}
                >
                  {canTakeQuiz ? "View Results / Retake" : "View Results"}
                </Button>
              </div>
            </div>
          )}

          {!canTakeQuiz && !latestAttempt && (
            <div className="alert alert-info mb-4">
              You have completed this quiz. Multiple attempts are not allowed.
            </div>
          )}

          <div className="mb-3">
            <Button variant="outline-secondary" onClick={() => router.push(`/Courses/${courseId}/Quizzes`)}>
              Back
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div id="wd-quiz-details" className="mr-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>{quiz.title || "Quiz Details"}</h2>
          <div className="d-flex gap-2">
            {quiz.published ? (
              <Button 
                variant="outline-secondary" 
                onClick={async () => {
                  try {
                    const updatedQuiz = { ...quiz, published: false };
                    await client.updateQuiz(updatedQuiz);
                    setQuiz({ ...quiz, published: false });
                  } catch {
                    // Error unpublishing quiz
                  }
                }}
              >
                Unpublish
              </Button>
            ) : (
              <Button 
                variant="danger" 
                onClick={async () => {
                  try {
                    const updatedQuiz = { ...quiz, published: true };
                    await client.updateQuiz(updatedQuiz);
                    setQuiz({ ...quiz, published: true });
                  } catch {
                    // Error publishing quiz
                  }
                }}
              >
                Publish
              </Button>
            )}
            <Button 
              variant="outline-secondary" 
              onClick={() => router.push(`/Courses/${courseId}/Quizzes/${quizId}/Preview`)}
            >
              Preview
            </Button>
            <Button 
              variant="outline-secondary" 
              onClick={() => router.push(`/Courses/${courseId}/Quizzes/${quizId}/Edit`)}
            >
              <FaPencilAlt className="me-2" />
              Edit
            </Button>
          </div>
        </div>

        <div className="border rounded p-4">
          <Row className="mb-3">
            <Col md={3} className="fw-bold">Quiz Type</Col>
            <Col md={9}>{quiz.quizType || "Graded Quiz"}</Col>
          </Row>

          <Row className="mb-3">
            <Col md={3} className="fw-bold">Points</Col>
            <Col md={9}>{calculatedPoints} (Sum of all question points)</Col>
          </Row>

          <Row className="mb-3">
            <Col md={3} className="fw-bold">Assignment Group</Col>
            <Col md={9}>{quiz.assignmentGroup || "QUIZZES"}</Col>
          </Row>

          <Row className="mb-3">
            <Col md={3} className="fw-bold">Shuffle Answers</Col>
            <Col md={9}>{quiz.shuffleAnswers !== false ? "Yes" : "No"}</Col>
          </Row>

          <Row className="mb-3">
            <Col md={3} className="fw-bold">Time Limit</Col>
            <Col md={9}>{quiz.timeLimit || 20} Minutes</Col>
          </Row>

          <Row className="mb-3">
            <Col md={3} className="fw-bold">Multiple Attempts</Col>
            <Col md={9}>
              {quiz.multipleAttempts ? "Yes" : "No"}
              {quiz.multipleAttempts && quiz.howManyAttempts && (
                <span className="ms-2">({quiz.howManyAttempts} attempts allowed)</span>
              )}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={3} className="fw-bold">Show Correct Answers</Col>
            <Col md={9}>{quiz.showCorrectAnswers || "Not set"}</Col>
          </Row>

          <Row className="mb-3">
            <Col md={3} className="fw-bold">Access Code</Col>
            <Col md={9}>{quiz.accessCode || "No access code required"}</Col>
          </Row>

          <Row className="mb-3">
            <Col md={3} className="fw-bold">One Question at a Time</Col>
            <Col md={9}>{quiz.oneQuestionAtATime !== false ? "Yes" : "No"}</Col>
          </Row>

          <Row className="mb-3">
            <Col md={3} className="fw-bold">Webcam Required</Col>
            <Col md={9}>{quiz.webcamRequired ? "Yes" : "No"}</Col>
          </Row>

          <Row className="mb-3">
            <Col md={3} className="fw-bold">Lock Questions After Answering</Col>
            <Col md={9}>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</Col>
          </Row>

          <Row className="mb-3">
            <Col md={3} className="fw-bold">Due</Col>
            <Col md={9}>
              {quiz.dueDate 
                ? `${formatDate(quiz.dueDate)} ${quiz.dueTime ? `at ${formatTime(quiz.dueTime)}` : ""}`
                : "Not set"}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={3} className="fw-bold">Available from</Col>
            <Col md={9}>
              {quiz.availableFromDate 
                ? `${formatDate(quiz.availableFromDate)} ${quiz.availableFromTime ? `at ${formatTime(quiz.availableFromTime)}` : ""}`
                : "Not set"}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={3} className="fw-bold">Until</Col>
            <Col md={9}>
              {quiz.untilDate 
                ? `${formatDate(quiz.untilDate)} ${quiz.untilTime ? `at ${formatTime(quiz.untilTime)}` : ""}`
                : "Not set"}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={3} className="fw-bold">Questions</Col>
            <Col md={9}>{quiz.questions?.length || 0} question(s)</Col>
          </Row>
        </div>

        <div className="mt-4">
          <Button variant="outline-secondary" onClick={() => router.push(`/Courses/${courseId}/Quizzes`)}>
            Back
          </Button>
        </div>
      </div>
    </Container>
  );
}

