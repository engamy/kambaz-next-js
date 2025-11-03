import { Modal, Button } from "react-bootstrap";

export default function DeleteAssignmentModal({
  show,
  handleClose,
  assignmentName,
  onConfirm,
}: {
  show: boolean;
  handleClose: () => void;
  assignmentName: string;
  onConfirm: () => void;
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to remove <strong>{assignmentName}</strong>? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            onConfirm();
            handleClose();
          }}
        >
          Yes, Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

