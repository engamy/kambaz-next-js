"use client";
import { useState, useEffect, useRef } from "react";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import { FaTrash, FaEdit, FaArrowRight } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

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

interface QuestionEditorProps {
  question: Question;
  index: number;
  onUpdate: (question: Question) => void;
  onDelete: () => void;
}

export default function QuestionEditor({ question, index, onUpdate, onDelete }: QuestionEditorProps) {
  // New questions (without _id or with empty question text) start in edit mode
  const [isEditing, setIsEditing] = useState(!question._id || !question.question);
  const [editedQuestion, setEditedQuestion] = useState<Question>({
    _id: question._id || uuidv4(),
    type: question.type || "Multiple Choice",
    title: question.title || "",
    points: question.points || 1,
    question: question.question || "",
    correctAnswer: question.correctAnswer || "",
    possibleAnswers: question.possibleAnswers || (question.type === "Multiple Choice" ? ["", "", "", ""] : []),
    blanks: question.blanks || (question.type === "Fill in the Blank" ? [""] : []),
  });
  
  // Use ref to track previous question ID to avoid dependency issues
  const prevQuestionIdRef = useRef<string | undefined>(question._id);
  const justSavedRef = useRef(false);
  const questionRef = useRef(question);
  
  // Update ref when question changes
  useEffect(() => {
    questionRef.current = question;
  });

  // Sync editedQuestion with question prop when question prop changes (only when not editing)
  // This ensures the component reflects updates from the parent, but only syncs when we're viewing (not editing)
  const questionId = question._id;
  useEffect(() => {
    // Don't sync if we just saved (give parent time to update)
    if (justSavedRef.current) {
      justSavedRef.current = false;
      return;
    }
    
    const currentQuestion = questionRef.current;
    if (!isEditing && currentQuestion._id && currentQuestion._id !== prevQuestionIdRef.current) {
      prevQuestionIdRef.current = currentQuestion._id;
      setEditedQuestion({
        _id: currentQuestion._id || uuidv4(),
        type: currentQuestion.type || "Multiple Choice",
        title: currentQuestion.title || "",
        points: currentQuestion.points || 1,
        question: currentQuestion.question || "",
        correctAnswer: currentQuestion.correctAnswer || "",
        possibleAnswers: currentQuestion.possibleAnswers || (currentQuestion.type === "Multiple Choice" ? ["", "", "", ""] : []),
        blanks: currentQuestion.blanks || (currentQuestion.type === "Fill in the Blank" ? [""] : []),
      });
    }
  }, [questionId, isEditing]);

  const handleSave = () => {
    // Ensure the question has an _id before saving
    const questionToSave = {
      ...editedQuestion,
      _id: editedQuestion._id || question._id || uuidv4(),
      // Ensure all fields are properly included
      question: editedQuestion.question || "",
      type: editedQuestion.type || "Multiple Choice",
      points: editedQuestion.points || 1,
      title: editedQuestion.title || "",
      correctAnswer: editedQuestion.correctAnswer || "",
      possibleAnswers: editedQuestion.possibleAnswers || [],
      blanks: editedQuestion.blanks || [],
    };
    // Update the ref so useEffect doesn't overwrite our saved changes
    prevQuestionIdRef.current = questionToSave._id;
    justSavedRef.current = true; // Prevent useEffect from overwriting immediately
    // Update local state immediately so it persists even if parent hasn't updated yet
    setEditedQuestion(questionToSave);
    onUpdate(questionToSave);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedQuestion(question);
    setIsEditing(false);
  };

  const handleTypeChange = (newType: string) => {
    const updated: Question = {
      ...editedQuestion,
      type: newType,
    };
    
    if (newType === "True/False") {
      updated.possibleAnswers = ["True", "False"];
      updated.correctAnswer = editedQuestion.correctAnswer || "True";
    } else if (newType === "Multiple Choice") {
      updated.possibleAnswers = editedQuestion.possibleAnswers || ["", "", "", ""];
      updated.correctAnswer = editedQuestion.correctAnswer || "";
    } else if (newType === "Fill in the Blank") {
      updated.blanks = editedQuestion.blanks || [""];
      updated.correctAnswer = "";
    }
    
    setEditedQuestion(updated);
  };

  const addAnswerOption = () => {
    const answers = [...(editedQuestion.possibleAnswers || [])];
    answers.push("");
    setEditedQuestion({ ...editedQuestion, possibleAnswers: answers });
  };

  const removeAnswerOption = (index: number) => {
    const answers = [...(editedQuestion.possibleAnswers || [])];
    answers.splice(index, 1);
    setEditedQuestion({ ...editedQuestion, possibleAnswers: answers });
  };

  const updateAnswerOption = (index: number, value: string) => {
    const answers = [...(editedQuestion.possibleAnswers || [])];
    answers[index] = value;
    setEditedQuestion({ ...editedQuestion, possibleAnswers: answers });
  };

  const addBlank = () => {
    const blanks = [...(editedQuestion.blanks || [])];
    blanks.push("");
    setEditedQuestion({ ...editedQuestion, blanks });
  };

  const removeBlank = (index: number) => {
    const blanks = [...(editedQuestion.blanks || [])];
    blanks.splice(index, 1);
    setEditedQuestion({ ...editedQuestion, blanks });
  };

  const updateBlank = (index: number, value: string) => {
    const blanks = [...(editedQuestion.blanks || [])];
    blanks[index] = value;
    setEditedQuestion({ ...editedQuestion, blanks });
  };

  if (!isEditing) {
    return (
      <div className="border rounded p-3 mb-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="flex-fill">
            <div className="d-flex align-items-center gap-2 mb-2">
              <strong>Question {index + 1}</strong>
              {editedQuestion.title && <span className="badge bg-secondary">{editedQuestion.title}</span>}
              <span className="badge bg-secondary">{editedQuestion.type || "Multiple Choice"}</span>
              <span className="badge bg-primary">{editedQuestion.points || 0} pts</span>
            </div>
            <p className="mb-2">{editedQuestion.question || "No question text"}</p>
            {editedQuestion.type === "Multiple Choice" && editedQuestion.possibleAnswers && (
              <ul className="list-unstyled ms-3">
                {editedQuestion.possibleAnswers.map((answer, i) => (
                  <li key={i} className="mb-1">
                    <input type="radio" disabled className="me-2" />
                    {answer}
                    {answer === editedQuestion.correctAnswer && (
                      <span className="ms-2 text-success">✓ (Correct)</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {editedQuestion.type === "True/False" && (
              <div className="ms-3">
                <div className="mb-1">
                  <input type="radio" disabled className="me-2" />
                  True
                  {editedQuestion.correctAnswer === "True" && (
                    <span className="ms-2 text-success">✓ (Correct)</span>
                  )}
                </div>
                <div>
                  <input type="radio" disabled className="me-2" />
                  False
                  {editedQuestion.correctAnswer === "False" && (
                    <span className="ms-2 text-success">✓ (Correct)</span>
                  )}
                </div>
              </div>
            )}
            {editedQuestion.type === "Fill in the Blank" && editedQuestion.blanks && (
              <div className="ms-3">
                {editedQuestion.blanks.map((blank, i) => (
                  <div key={i} className="mb-2">
                    <input type="text" disabled className="form-control d-inline-block" style={{ width: "200px" }} />
                    <span className="ms-2 text-muted">(Expected: {blank})</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="d-flex gap-2">
            <Button variant="link" size="sm" onClick={() => setIsEditing(true)}>
              <FaEdit />
            </Button>
            <Button variant="link" size="sm" className="text-danger" onClick={onDelete}>
              <FaTrash />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded p-4 mb-3">
      {/* Header with Title, Type, and Points */}
      <div className="d-flex align-items-center gap-3 mb-3">
        <FormControl
          type="text"
          value={editedQuestion.title || ""}
          onChange={(e) => setEditedQuestion({ ...editedQuestion, title: e.target.value })}
          placeholder="Question Title (optional)"
          className="border-secondary"
          style={{ maxWidth: "200px" }}
        />
        <FormSelect
          value={editedQuestion.type || "Multiple Choice"}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="border-secondary"
          style={{ maxWidth: "200px" }}
        >
          <option value="Multiple Choice">Multiple Choice</option>
          <option value="True/False">True/False</option>
          <option value="Fill in the Blank">Fill in the Blank</option>
        </FormSelect>
        <div className="d-flex align-items-center gap-2 ms-auto">
          <label className="mb-0">pts:</label>
          <FormControl
            type="number"
            value={editedQuestion.points || 0}
            onChange={(e) => setEditedQuestion({ ...editedQuestion, points: parseInt(e.target.value) || 0 })}
            className="border-secondary"
            style={{ width: "80px" }}
            min="0"
          />
        </div>
      </div>

      {/* Instruction Text */}
      {editedQuestion.type === "Multiple Choice" && (
        <p className="text-muted mb-3">
          Enter your question and multiple answers, then select the one correct answer.
        </p>
      )}
      {editedQuestion.type === "True/False" && (
        <p className="text-muted mb-3">
          Enter your question text, then select if True or False is the correct answer.
        </p>
      )}
      {editedQuestion.type === "Fill in the Blank" && (
        <p className="text-muted mb-3">
          Enter your question text, then define all possible correct answers for the blank. Students will see the question followed by a small text box to type their answer.
        </p>
      )}

      {/* Question Text - WYSIWYG-like editor */}
      <div className="mb-4">
        <label className="form-label fw-bold">Question:</label>
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
            rows={4}
            value={editedQuestion.question || ""}
            onChange={(e) => setEditedQuestion({ ...editedQuestion, question: e.target.value })}
            className="border-0"
            placeholder="Enter your question here..."
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

      {/* Answers Section */}
      <div>
        <label className="form-label fw-bold">Answers:</label>

        {editedQuestion.type === "Multiple Choice" && (
          <div className="mt-2">
            {(editedQuestion.possibleAnswers || []).map((answer, i) => {
              const isCorrect = answer === editedQuestion.correctAnswer && answer.trim() !== "";
              return (
                <div key={i} className="mb-3">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <input
                      type="radio"
                      name={`correct-${editedQuestion._id}`}
                      checked={isCorrect}
                      onChange={() => setEditedQuestion({ ...editedQuestion, correctAnswer: answer })}
                      className="me-2"
                    />
                    <label className="form-label mb-0 fw-bold" style={{ minWidth: "120px" }}>
                      {isCorrect ? "Correct Answer" : "Possible Answer"}
                    </label>
                    {isCorrect && (
                      <FaArrowRight className="text-success" />
                    )}
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <FormControl
                      as="textarea"
                      rows={2}
                      value={answer}
                      onChange={(e) => updateAnswerOption(i, e.target.value)}
                      className="border-secondary"
                      placeholder={`Answer option ${i + 1}`}
                    />
                    <div className="d-flex gap-1">
                      <Button
                        variant="link"
                        size="sm"
                        className="text-secondary p-1"
                        onClick={() => setIsEditing(true)}
                        style={{ visibility: "hidden" }}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-danger p-1"
                        onClick={() => removeAnswerOption(i)}
                        disabled={(editedQuestion.possibleAnswers || []).length <= 2}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            <Button 
              variant="link" 
              className="text-danger p-0 mt-2" 
              onClick={addAnswerOption}
            >
              + Add Another Answer
            </Button>
          </div>
        )}

        {editedQuestion.type === "True/False" && (
          <div className="mt-2">
            {["True", "False"].map((option) => {
              const isCorrect = editedQuestion.correctAnswer === option;
              return (
                <div key={option} className="mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name={`tf-correct-${editedQuestion._id}`}
                      checked={isCorrect}
                      onChange={() => setEditedQuestion({ ...editedQuestion, correctAnswer: option })}
                      className="me-2"
                    />
                    <label className="form-label mb-0 fw-bold" style={{ minWidth: "120px" }}>
                      {option}
                    </label>
                    {isCorrect && (
                      <FaArrowRight className="text-success" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {editedQuestion.type === "Fill in the Blank" && (
          <div className="mt-2">
            {(editedQuestion.blanks || []).map((blank, i) => (
              <div key={i} className="mb-3">
                <label className="form-label mb-1 fw-bold">Possible Answer:</label>
                <div className="d-flex align-items-start gap-2">
                  <FormControl
                    as="textarea"
                    rows={2}
                    value={blank}
                    onChange={(e) => updateBlank(i, e.target.value)}
                    className="border-secondary"
                    placeholder={`Possible answer ${i + 1}`}
                  />
                  <Button
                    variant="link"
                    size="sm"
                    className="text-danger p-1"
                    onClick={() => removeBlank(i)}
                    disabled={(editedQuestion.blanks || []).length <= 1}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </div>
            ))}
            <Button 
              variant="link" 
              className="text-danger p-0 mt-2" 
              onClick={addBlank}
            >
              + Add Another Answer
            </Button>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
        <Button variant="outline-secondary" className="px-4" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="danger" className="px-4" onClick={handleSave}>
          {question._id ? "Update Question" : "Save Question"}
        </Button>
      </div>
    </div>
  );
}
