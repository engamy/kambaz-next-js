"use client";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";

interface QuizContextMenuProps {
  quizId: string;
  quizName: string;
  published: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onPublish: () => void;
  onUnpublish: () => void;
  canEdit: boolean;
}

export default function QuizContextMenu({
  quizId,
  quizName: _,
  published,
  onEdit,
  onDelete,
  onPublish,
  onUnpublish,
  canEdit,
}: QuizContextMenuProps) {
  const [show, setShow] = useState(false);

  if (!canEdit) {
    return null;
  }

  return (
    <Dropdown show={show} onToggle={(isOpen) => setShow(isOpen)}>
      <Dropdown.Toggle
        variant="link"
        className="text-decoration-none text-dark p-0"
        id={`quiz-menu-${quizId}`}
      >
        <FaEllipsisV />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => { setShow(false); onEdit(); }}>
          Edit
        </Dropdown.Item>
        <Dropdown.Item 
          onClick={() => { setShow(false); onDelete(); }} 
          className="text-danger"
        >
          Delete
        </Dropdown.Item>
        {published ? (
          <Dropdown.Item onClick={() => { setShow(false); onUnpublish(); }}>
            Unpublish
          </Dropdown.Item>
        ) : (
          <Dropdown.Item onClick={() => { setShow(false); onPublish(); }}>
            Publish
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

