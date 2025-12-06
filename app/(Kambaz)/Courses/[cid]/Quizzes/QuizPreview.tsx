"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button, Container, FormCheck, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { FaPencilAlt, FaCheckCircle, FaQuestionCircle } from "react-icons/fa";
import * as client from "./client";

interface Question {
  _id?: string;
  type?: string;
  title?: string;
  points?: number;
  question?: string;
  correctAnswer?: string;
  possibleAnswers?: string[];
  blanks?: string[];
  [key: string]: unknown;
}

interface Quiz {
  _id?: string;
  title?: string;
  name?: string;
  description?: string;
  questions?: Question[];
  [key: string]: unknown;
}

interface Answer {
  questionId: string;
  answer: string;
  isCorrect: boolean;
}

export default function QuizPreview() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.cid as string;
  const quizId = params.qid as string;
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const canEdit = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [startTime] = useState(new Date());

  useEffect(() => {
    const fetchQuiz = async () => {
      if (quizId) {
        try {
          const fetchedQuiz = await client.findQuizById(quizId);
          setQuiz(fetchedQuiz);
          if (fetchedQuiz.questions) {
            const total = fetchedQuiz.questions.reduce((sum: number, q: Question) => sum + (q.points || 0), 0);
            setTotalPoints(total);
          }
        } catch {
          // Error fetching quiz
        }
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    if (!quiz || !quiz.questions) return;

    const calculatedResults: Answer[] = [];
    let calculatedScore = 0;

    quiz.questions.forEach((question) => {
      const questionId = question._id || "";
      const userAnswer = answers[questionId] || "";
      let isCorrect = false;

      if (question.type === "Multiple Choice" || question.type === "True/False") {
        isCorrect = userAnswer === question.correctAnswer;
      } else if (question.type === "Fill in the Blank" && question.blanks) {
        // Case-insensitive comparison for fill in the blank
        const normalizedUserAnswer = userAnswer.trim().toLowerCase();
        isCorrect = question.blanks.some(
          (blank) => blank.trim().toLowerCase() === normalizedUserAnswer
        );
      }

      if (isCorrect) {
        calculatedScore += question.points || 0;
      }

      calculatedResults.push({
        questionId,
        answer: userAnswer,
        isCorrect,
      });
    });

    setResults(calculatedResults);
    setScore(calculatedScore);
    setSubmitted(true);
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const displayHour = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    return `${month} ${day} at ${displayHour}:${displayMinutes}${ampm}`;
  };

  const getQuestionStatus = (index: number) => {
    if (!quiz || !quiz.questions) return "unanswered";
    const question = quiz.questions[index];
    const questionId = question._id || "";
    const hasAnswer = answers[questionId] && answers[questionId].trim() !== "";
    
    if (submitted) {
      const result = results.find((r) => r.questionId === questionId);
      return result?.isCorrect ? "correct" : "incorrect";
    }
    
    return hasAnswer ? "answered" : "unanswered";
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const goToNext = () => {
    if (quiz && quiz.questions && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (!quiz) {
    return (
      <Container className="mt-4">
        <div>Loading quiz preview...</div>
      </Container>
    );
  }

  const currentQuestion = quiz.questions?.[currentQuestionIndex];
  const questionId = currentQuestion?._id || "";
  const currentAnswer = answers[questionId] || "";

  return (
    <Container className="mt-4">
      <div id="wd-quiz-preview">
        {/* Warning Banner */}
        <div className="alert alert-warning mb-3">
          <strong>This is a preview of the published version of the quiz</strong>
        </div>

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="text-muted mb-0">Started: {formatTime(startTime)}</p>
          </div>
          {canEdit && (
            <Button
              variant="outline-secondary"
              onClick={() => router.push(`/Courses/${courseId}/Quizzes/${quizId}/Edit`)}
            >
              <FaPencilAlt className="me-2" />
              Keep Editing This Quiz
            </Button>
          )}
        </div>

        {/* Quiz Instructions */}
        {quiz.description && (
          <div className="mb-4 p-3 border rounded bg-light">
            <h5 className="mb-2">Quiz Instructions</h5>
            <div dangerouslySetInnerHTML={{ __html: quiz.description }} />
          </div>
        )}

        <div className="row">
          {/* Questions Sidebar */}
          {quiz.questions && quiz.questions.length > 0 && (
            <div className="col-md-3 mb-4">
              <div className="border rounded p-3">
                <h6 className="mb-3">Questions</h6>
                <div className="list-group list-group-flush">
                  {quiz.questions.map((question, index) => {
                    const status = getQuestionStatus(index);
                    return (
                      <button
                        key={question._id || index}
                        className={`list-group-item list-group-item-action d-flex align-items-center gap-2 ${
                          index === currentQuestionIndex ? "active" : ""
                        }`}
                        onClick={() => goToQuestion(index)}
                        style={{ border: "none", textAlign: "left" }}
                      >
                        {status === "correct" && <FaCheckCircle className="text-success" />}
                        {status === "incorrect" && <FaQuestionCircle className="text-danger" />}
                        {status === "answered" && <FaCheckCircle className="text-secondary" />}
                        {status === "unanswered" && <FaQuestionCircle className="text-muted" />}
                        <span>Question {index + 1}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className={quiz.questions && quiz.questions.length > 0 ? "col-md-9" : "col-12"}>
            {quiz.questions && quiz.questions.length > 0 ? (
              <>
                {!submitted ? (
                  <>
                    {/* Current Question */}
                    {currentQuestion && (
                      <div className="border rounded p-4 mb-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <h5>Question {currentQuestionIndex + 1}</h5>
                          <span className="badge bg-secondary">{currentQuestion.points || 0} pts</span>
                        </div>

                        <div className="mb-4">
                          <div dangerouslySetInnerHTML={{ __html: currentQuestion.question || currentQuestion.title || "No question text" }} />
                        </div>

                        {/* Answer Options */}
                        {currentQuestion.type === "Multiple Choice" && currentQuestion.possibleAnswers && (
                          <div className="ms-3">
                            {currentQuestion.possibleAnswers.map((answer, ansIndex) => (
                              <div key={ansIndex} className="mb-2">
                                <FormCheck
                                  type="radio"
                                  name={`question-${questionId}`}
                                  id={`answer-${questionId}-${ansIndex}`}
                                  label={answer}
                                  checked={currentAnswer === answer}
                                  onChange={() => handleAnswerChange(questionId, answer)}
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {currentQuestion.type === "True/False" && (
                          <div className="ms-3">
                            <div className="mb-2">
                              <FormCheck
                                type="radio"
                                name={`question-${questionId}`}
                                id={`answer-${questionId}-true`}
                                label="True"
                                checked={currentAnswer === "True"}
                                onChange={() => handleAnswerChange(questionId, "True")}
                              />
                            </div>
                            <div>
                              <FormCheck
                                type="radio"
                                name={`question-${questionId}`}
                                id={`answer-${questionId}-false`}
                                label="False"
                                checked={currentAnswer === "False"}
                                onChange={() => handleAnswerChange(questionId, "False")}
                              />
                            </div>
                          </div>
                        )}

                        {currentQuestion.type === "Fill in the Blank" && (
                          <div className="ms-3">
                            <FormControl
                              type="text"
                              value={currentAnswer}
                              onChange={(e) => handleAnswerChange(questionId, e.target.value)}
                              className="border-secondary"
                              placeholder="Enter your answer"
                              style={{ maxWidth: "300px" }}
                            />
                          </div>
                        )}

                        {/* Navigation */}
                        <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                          <Button
                            variant="outline-secondary"
                            onClick={goToPrevious}
                            disabled={currentQuestionIndex === 0}
                          >
                            ◂ Previous
                          </Button>
                          <Button
                            variant="primary"
                            onClick={goToNext}
                            disabled={currentQuestionIndex === (quiz.questions?.length || 0) - 1}
                          >
                            Next ▸
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Submit Section */}
                    <div className="border-top pt-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="text-muted">Quiz saved at {formatTime(new Date())}</span>
                        </div>
                        <Button variant="danger" onClick={handleSubmit}>
                          Submit Quiz
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Results View */
                  <div>
                    <div className="alert alert-info mb-4">
                      <h5>Quiz Results</h5>
                      <p className="mb-0">
                        <strong>Score: {score} / {totalPoints}</strong> ({totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0}%)
                      </p>
                    </div>

                    {quiz.questions?.map((question, index) => {
                      const questionId = question._id || "";
                      const result = results.find((r) => r.questionId === questionId);
                      const isCorrect = result?.isCorrect || false;
                      const userAnswer = result?.answer || "";

                      return (
                        <div
                          key={questionId}
                          className={`border rounded p-4 mb-3 ${isCorrect ? "border-success" : "border-danger"}`}
                        >
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <h5>Question {index + 1}</h5>
                            <div>
                              <span className="badge bg-secondary me-2">{question.points || 0} pts</span>
                              {isCorrect ? (
                                <span className="badge bg-success">Correct</span>
                              ) : (
                                <span className="badge bg-danger">Incorrect</span>
                              )}
                            </div>
                          </div>

                          <div className="mb-3">
                            <div dangerouslySetInnerHTML={{ __html: question.question || question.title || "No question text" }} />
                          </div>

                          <div className="mb-2">
                            <strong>Your Answer:</strong>{" "}
                            <span className={isCorrect ? "text-success" : "text-danger"}>
                              {userAnswer || "(No answer provided)"}
                            </span>
                          </div>

                          {!isCorrect && (
                            <div className="mb-2">
                              <strong>Correct Answer:</strong>{" "}
                              <span className="text-success">
                                {question.type === "Fill in the Blank"
                                  ? question.blanks?.join(" or ") || ""
                                  : question.correctAnswer || ""}
                              </span>
                            </div>
                          )}

                          <div className="mt-2">
                            <strong>Points:</strong> {isCorrect ? question.points || 0 : 0} / {question.points || 0}
                          </div>
                        </div>
                      );
                    })}

                    <div className="mt-4">
                      <Button
                        variant="outline-secondary"
                        onClick={() => router.push(`/Courses/${courseId}/Quizzes/${quizId}`)}
                      >
                        Back to Details
                      </Button>
                      {canEdit && (
                        <Button
                          variant="outline-secondary"
                          className="ms-2"
                          onClick={() => router.push(`/Courses/${courseId}/Quizzes/${quizId}/Edit`)}
                        >
                          <FaPencilAlt className="me-2" />
                          Edit Quiz
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="alert alert-info">
                No questions have been added to this quiz yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
