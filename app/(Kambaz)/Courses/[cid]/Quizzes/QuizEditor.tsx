"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button, Row, Col, Container, FormControl, FormSelect, FormCheck, Nav, NavItem } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as client from "./client";
import QuestionEditor from "./QuestionEditor";
import { v4 as uuidv4 } from "uuid";

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
  questions?: Array<{
    _id?: string;
    type?: string;
    title?: string;
    points?: number;
    question?: string;
    correctAnswer?: string;
    possibleAnswers?: string[];
    blanks?: string[];
    [key: string]: unknown;
  }>;
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

export default function QuizEditor() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.cid as string;
  const quizId = params.qid as string;
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const canEdit = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [quiz, setQuiz] = useState<Quiz>({
    title: "Unnamed Quiz",
    name: "Unnamed Quiz",
    published: false,
    points: 0,
    questions: [],
    quizType: "Graded Quiz",
    assignmentGroup: "QUIZZES",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    showCorrectAnswers: "",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
  });

  const [howManyAttempts, setHowManyAttempts] = useState(1);
  const [activeTab, setActiveTab] = useState("Details");
  const [questions, setQuestions] = useState<Array<{
    _id?: string;
    type?: string;
    title?: string;
    points?: number;
    question?: string;
    correctAnswer?: string;
    possibleAnswers?: string[];
    blanks?: string[];
    [key: string]: unknown;
  }>>([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (quizId && quizId !== "new") {
        try {
          const fetchedQuiz = await client.findQuizById(quizId);
          setQuiz(fetchedQuiz);
          if (fetchedQuiz.multipleAttempts && typeof fetchedQuiz.howManyAttempts === 'number') {
            setHowManyAttempts(fetchedQuiz.howManyAttempts);
          } else {
            setHowManyAttempts(1);
          }
          setQuestions(fetchedQuiz.questions || []);
        } catch {
          // Error fetching quiz
        }
      }
    };
    fetchQuiz();
  }, [quizId]);

  // Calculate points from questions
  const calculatedPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  const handleAddQuestion = () => {
    const newQuestion = {
      _id: uuidv4(),
      type: "Multiple Choice",
      title: "",
      points: 1,
      question: "",
      correctAnswer: "",
      possibleAnswers: ["", "", "", ""],
    };
    setQuestions([...questions, newQuestion]);
    // Switch to Questions tab if not already there
    if (activeTab !== "Questions") {
      setActiveTab("Questions");
    }
  };

  const handleUpdateQuestion = (index: number, updatedQuestion: typeof questions[0]) => {
    // Ensure question has an _id
    if (!updatedQuestion._id) {
      updatedQuestion._id = uuidv4();
    }
    
    // Create a complete question object with all required fields
    const completeQuestion = {
      _id: updatedQuestion._id,
      type: updatedQuestion.type || "Multiple Choice",
      title: updatedQuestion.title || "",
      points: updatedQuestion.points || 1,
      question: updatedQuestion.question || "",
      correctAnswer: updatedQuestion.correctAnswer || "",
      possibleAnswers: updatedQuestion.possibleAnswers || [],
      blanks: updatedQuestion.blanks || [],
    };
    
    const updated = [...questions];
    // Find and update the question by _id if it exists, otherwise update by index
    const questionIndex = updated.findIndex(q => q._id === completeQuestion._id);
    if (questionIndex >= 0) {
      // Question exists, update it
      updated[questionIndex] = completeQuestion;
    } else if (index >= 0 && index < updated.length) {
      // Question not found by _id, but index is valid - update by index
      updated[index] = completeQuestion;
    } else {
      // Index is invalid or question is new - add it to the array
      updated.push(completeQuestion);
    }
    setQuestions(updated);
    // Update quiz state to reflect question changes
    setQuiz({ ...quiz, questions: updated });
  };

  const handleDeleteQuestion = (index: number) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
    // Update quiz state to reflect question changes
    setQuiz({ ...quiz, questions: updated });
  };

  const handleSave = async (publish: boolean = false) => {
    if (!canEdit) {
      return;
    }

    try {
      // Ensure all questions have all required fields before saving
      const questionsToSave = questions.map(q => ({
        _id: q._id || uuidv4(),
        type: q.type || "Multiple Choice",
        title: q.title || "",
        points: q.points || 1,
        question: q.question || "",
        correctAnswer: q.correctAnswer || "",
        possibleAnswers: q.possibleAnswers || [],
        blanks: q.blanks || [],
      }));

      const quizToSave = {
        ...quiz,
        _id: quizId, // Ensure _id is included
        points: calculatedPoints,
        howManyAttempts: quiz.multipleAttempts ? howManyAttempts : undefined,
        published: publish ? true : quiz.published,
        questions: questionsToSave,
      };

      if (quizId && quizId !== "new") {
        await client.updateQuiz(quizToSave);
        if (publish) {
          router.push(`/Courses/${courseId}/Quizzes`);
        } else {
          router.push(`/Courses/${courseId}/Quizzes/${quizId}`);
        }
      } else {
        const newQuiz = await client.createQuizForCourse(courseId, quizToSave);
        if (publish) {
          router.push(`/Courses/${courseId}/Quizzes`);
        } else {
          router.push(`/Courses/${courseId}/Quizzes/${newQuiz._id}`);
        }
      }
    } catch {
      // Error saving quiz
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${courseId}/Quizzes`);
  };

  if (!canEdit) {
    return (
      <Container className="mt-4">
        <div className="alert alert-warning">
          You do not have permission to edit quizzes.
        </div>
        <Button variant="outline-secondary" onClick={() => router.push(`/Courses/${courseId}/Quizzes`)}>
          Back
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div id="wd-quiz-editor" className="mr-5">
        <h2 className="mb-4">{quiz.title || "Unnamed Quiz"}</h2>

        {/* Tabs */}
        <Nav variant="tabs" className="mb-4">
          <NavItem>
            <Button
              variant="link"
              className={`text-decoration-none ${activeTab === "Details" ? "text-dark border-bottom border-dark border-2" : "text-secondary"}`}
              onClick={() => setActiveTab("Details")}
              style={{ border: "none", background: "none", padding: "0.5rem 1rem" }}
            >
              Details
            </Button>
          </NavItem>
          <NavItem>
            <Button
              variant="link"
              className={`text-decoration-none ${activeTab === "Questions" ? "text-dark border-bottom border-dark border-2" : "text-secondary"}`}
              onClick={() => setActiveTab("Questions")}
              style={{ border: "none", background: "none", padding: "0.5rem 1rem" }}
            >
              Questions
            </Button>
          </NavItem>
        </Nav>

        {activeTab === "Details" && (
          <form>
            {/* Title */}
            <div className="mb-3">
              <label className="form-label fw-bold">Title</label>
              <FormControl
                type="text"
                value={quiz.title || ""}
                onChange={(e) => setQuiz({ ...quiz, title: e.target.value, name: e.target.value })}
                placeholder="Unnamed Quiz"
                className="border-secondary"
              />
            </div>

            {/* Description - WYSIWYG-like editor */}
            <div className="mb-4">
              <label className="form-label fw-bold">Quiz Instructions</label>
              <div className="border rounded">
                <div className="bg-light border-bottom p-2 d-flex align-items-center gap-2 flex-wrap">
                  <select className="form-select form-select-sm" style={{ width: "auto" }}>
                    <option>12pt</option>
                  </select>
                  <select className="form-select form-select-sm" style={{ width: "auto" }}>
                    <option>Paragraph</option>
                  </select>
                  <Button variant="link" size="sm" className="p-1"><strong>B</strong></Button>
                  <Button variant="link" size="sm" className="p-1"><em>I</em></Button>
                  <Button variant="link" size="sm" className="p-1"><u>U</u></Button>
                  <div className="vr"></div>
                  <Button variant="link" size="sm" className="p-1">A</Button>
                  <Button variant="link" size="sm" className="p-1">✎</Button>
                  <Button variant="link" size="sm" className="p-1">T²</Button>
                </div>
                <FormControl
                  as="textarea"
                  rows={8}
                  value={quiz.description || ""}
                  onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                  placeholder="Enter quiz instructions..."
                  className="border-0"
                  style={{ minHeight: "200px" }}
                />
                <div className="bg-light border-top p-2 d-flex justify-content-between align-items-center">
                  <span className="text-muted small">0 words</span>
                  <div className="d-flex gap-2">
                    <Button variant="link" size="sm" className="text-muted p-0">&lt;/&gt;</Button>
                    <Button variant="link" size="sm" className="text-muted p-0">⛶</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quiz Properties */}
            <div className="border rounded p-4 mb-4">
              <h5 className="mb-3">Quiz Properties</h5>

              <Row className="mb-3">
                <Col md={3} className="text-end">
                  <label className="form-label">Quiz Type</label>
                </Col>
                <Col md={9}>
                  <FormSelect
                    value={quiz.quizType || "Graded Quiz"}
                    onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
                    className="border-secondary"
                  >
                    <option value="Graded Quiz">Graded Quiz</option>
                    <option value="Practice Quiz">Practice Quiz</option>
                    <option value="Graded Survey">Graded Survey</option>
                    <option value="Ungraded Survey">Ungraded Survey</option>
                  </FormSelect>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={3} className="text-end">
                  <label className="form-label">Points</label>
                </Col>
                <Col md={9}>
                  <FormControl
                    type="text"
                    value={calculatedPoints}
                    readOnly
                    className="border-secondary bg-light"
                  />
                  <small className="text-muted">(Sum of all question points)</small>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={3} className="text-end">
                  <label className="form-label">Assignment Group</label>
                </Col>
                <Col md={9}>
                  <FormSelect
                    value={quiz.assignmentGroup || "QUIZZES"}
                    onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
                    className="border-secondary"
                  >
                    <option value="QUIZZES">Quizzes</option>
                    <option value="EXAMS">Exams</option>
                    <option value="ASSIGNMENTS">Assignments</option>
                    <option value="PROJECT">Project</option>
                  </FormSelect>
                </Col>
              </Row>

              <div className="mb-3">
                <Row>
                  <Col md={3} className="text-end">
                    <label className="form-label">Options</label>
                  </Col>
                  <Col md={9}>
                    <div className="mb-2">
                      <FormCheck
                        type="checkbox"
                        checked={quiz.shuffleAnswers !== false}
                        onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
                        label="Shuffle Answers"
                      />
                    </div>
                    <div className="mb-2 d-flex align-items-center gap-2">
                      <FormCheck
                        type="checkbox"
                        checked={quiz.timeLimit ? quiz.timeLimit > 0 : false}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setQuiz({ ...quiz, timeLimit: quiz.timeLimit || 20 });
                          } else {
                            setQuiz({ ...quiz, timeLimit: 0 });
                          }
                        }}
                        label="Time Limit"
                      />
                      {(quiz.timeLimit && quiz.timeLimit > 0) && (
                        <>
                          <FormControl
                            type="number"
                            value={quiz.timeLimit || 20}
                            onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) || 20 })}
                            className="border-secondary"
                            style={{ width: "100px" }}
                          />
                          <span>Minutes</span>
                        </>
                      )}
                    </div>
                    <div className="mb-2">
                      <FormCheck
                        type="checkbox"
                        checked={quiz.multipleAttempts === true}
                        onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
                        label="Allow Multiple Attempts"
                      />
                    </div>
                  </Col>
                </Row>
              </div>

              {quiz.multipleAttempts && (
                <Row className="mb-3">
                  <Col md={3} className="text-end">
                    <label className="form-label">How Many Attempts</label>
                  </Col>
                  <Col md={9}>
                    <FormControl
                      type="number"
                      value={howManyAttempts}
                      onChange={(e) => setHowManyAttempts(parseInt(e.target.value) || 1)}
                      className="border-secondary"
                      style={{ width: "100px" }}
                      min="1"
                    />
                  </Col>
                </Row>
              )}

              <Row className="mb-3">
                <Col md={3} className="text-end">
                  <label className="form-label">Show Correct Answers</label>
                </Col>
                <Col md={9}>
                  <FormControl
                    type="text"
                    value={quiz.showCorrectAnswers || ""}
                    onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.value })}
                    className="border-secondary"
                    placeholder="If and when correct answers are shown to students"
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={3} className="text-end">
                  <label className="form-label">Access Code</label>
                </Col>
                <Col md={9}>
                  <FormControl
                    type="text"
                    value={quiz.accessCode || ""}
                    onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
                    className="border-secondary"
                    placeholder="Passcode students need to type to access the quiz"
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={3} className="text-end">
                  <label className="form-label">One Question at a Time</label>
                </Col>
                <Col md={9}>
                  <FormCheck
                    type="switch"
                    checked={quiz.oneQuestionAtATime !== false}
                    onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })}
                    label={quiz.oneQuestionAtATime !== false ? "Yes" : "No"}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={3} className="text-end">
                  <label className="form-label">Webcam Required</label>
                </Col>
                <Col md={9}>
                  <FormCheck
                    type="switch"
                    checked={quiz.webcamRequired === true}
                    onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })}
                    label={quiz.webcamRequired ? "Yes" : "No"}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={3} className="text-end">
                  <label className="form-label">Lock Questions After Answering</label>
                </Col>
                <Col md={9}>
                  <FormCheck
                    type="switch"
                    checked={quiz.lockQuestionsAfterAnswering === true}
                    onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })}
                    label={quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
                  />
                </Col>
              </Row>
            </div>

            {/* Assignment/Scheduling Section */}
            <div className="border rounded p-4 mb-4">
              <h5 className="mb-3">Assign</h5>

              <Row className="mb-3">
                <Col md={3} className="text-end">
                  <label className="form-label">Due</label>
                </Col>
                <Col md={4}>
                  <FormControl
                    type="date"
                    value={quiz.dueDate || ""}
                    onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
                    className="border-secondary"
                  />
                </Col>
                <Col md={2}>
                  <FormControl
                    type="time"
                    value={quiz.dueTime || ""}
                    onChange={(e) => setQuiz({ ...quiz, dueTime: e.target.value })}
                    className="border-secondary"
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={3} className="text-end">
                  <label className="form-label">Available from</label>
                </Col>
                <Col md={4}>
                  <FormControl
                    type="date"
                    value={quiz.availableFromDate || ""}
                    onChange={(e) => setQuiz({ ...quiz, availableFromDate: e.target.value })}
                    className="border-secondary"
                  />
                </Col>
                <Col md={2}>
                  <FormControl
                    type="time"
                    value={quiz.availableFromTime || ""}
                    onChange={(e) => setQuiz({ ...quiz, availableFromTime: e.target.value })}
                    className="border-secondary"
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={3} className="text-end">
                  <label className="form-label">Until</label>
                </Col>
                <Col md={4}>
                  <FormControl
                    type="date"
                    value={quiz.untilDate || ""}
                    onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })}
                    className="border-secondary"
                  />
                </Col>
                <Col md={2}>
                  <FormControl
                    type="time"
                    value={quiz.untilTime || ""}
                    onChange={(e) => setQuiz({ ...quiz, untilTime: e.target.value })}
                    className="border-secondary"
                  />
                </Col>
              </Row>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-end gap-2">
              <Button variant="outline-secondary" className="px-4" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="danger" className="px-4" onClick={() => handleSave(false)}>
                Save
              </Button>
              <Button variant="danger" className="px-4" onClick={() => handleSave(true)}>
                Save & Publish
              </Button>
            </div>
          </form>
        )}

        {activeTab === "Questions" && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Questions</h5>
              <div className="d-flex align-items-center gap-3">
                <span className="text-muted">Points: {calculatedPoints}</span>
                <Button 
                  variant="outline-secondary" 
                  onClick={handleAddQuestion}
                  className="border-secondary"
                >
                  + New Question
                </Button>
              </div>
            </div>

            {questions.length === 0 ? (
              <div className="text-center py-5 border rounded">
                <p className="text-muted">No questions yet. Click &quot;+ New Question&quot; to add one.</p>
              </div>
            ) : (
              <div>
                {questions.map((question, index) => (
                  <QuestionEditor
                    key={question._id || index}
                    question={question}
                    index={index}
                    onUpdate={(updated) => handleUpdateQuestion(index, updated)}
                    onDelete={() => handleDeleteQuestion(index)}
                  />
                ))}
              </div>
            )}

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="outline-secondary" className="px-4" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="danger" className="px-4" onClick={() => handleSave(false)}>
                Save
              </Button>
              <Button variant="danger" className="px-4" onClick={() => handleSave(true)}>
                Save & Publish
              </Button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
