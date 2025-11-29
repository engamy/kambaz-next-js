"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Row, Col, Container } from "react-bootstrap";
import * as client from "./client";

interface Assignment {
  _id: string;
  title: string;
  name: string;
  course: string;
  description: string;
  points: number;
  assignmentGroup: string;
  displayGradeAs: string;
  submissionType: string;
  onlineEntryOptions: {
    textEntry: boolean;
    websiteUrl: boolean;
    mediaRecordings: boolean;
    studentAnnotation: boolean;
    fileUploads: boolean;
  };
  dueDate: string;
  dueTime: string;
  availableFromDate: string;
  availableFromTime: string;
  untilDate: string;
  untilTime: string;
  editing?: boolean;
}

export default function AssignmentEditor() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.cid as string;
  const assignmentId = params.aid as string | undefined;
  const [assignment, setAssignment] = useState<Assignment | null>(null);

  const isEditing = !!assignmentId;

  useEffect(() => {
    const fetchAssignment = async () => {
      if (isEditing && assignmentId && courseId) {
        try {
          const assignments = await client.findAssignmentsForCourse(courseId);
          const foundAssignment = assignments.find((a: Assignment) => a._id === assignmentId);
          setAssignment(foundAssignment || null);
        } catch (error) {
          console.error("Error fetching assignment:", error);
        }
      }
    };
    fetchAssignment();
  }, [isEditing, assignmentId, courseId]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(100);
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("23:59");
  const [availableFromDate, setAvailableFromDate] = useState("");
  const [availableFromTime, setAvailableFromTime] = useState("00:01");
  const [untilDate, setUntilDate] = useState("");
  const [untilTime, setUntilTime] = useState("");

  useEffect(() => {
    if (assignment) {
      setName(assignment.name || "");
      setDescription(assignment.description || "");
      setPoints(assignment.points || 100);
      setDueDate(assignment.dueDate || "");
      setDueTime(assignment.dueTime || "23:59");
      setAvailableFromDate(assignment.availableFromDate || "");
      setAvailableFromTime(assignment.availableFromTime || "00:01");
      setUntilDate(assignment.untilDate || "");
      setUntilTime(assignment.untilTime || "");
    }
  }, [assignment]);

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Please enter an assignment name");
      return;
    }

    try {
      if (isEditing && assignment) {
        const updatedAssignment = {
          ...assignment,
          name,
          description,
          points,
          dueDate,
          dueTime,
          availableFromDate,
          availableFromTime,
          untilDate,
          untilTime,
        };
        await client.updateAssignment(updatedAssignment);
      } else {
        const existingAssignments = await client.findAssignmentsForCourse(courseId);
        const assignmentNumbers = existingAssignments
          .filter((a: Assignment) => a.title?.startsWith("A"))
          .map((a: Assignment) => {
            const match = a.title?.match(/A(\d+)/);
            return match ? parseInt(match[1]) : 0;
          });
        const nextNumber = assignmentNumbers.length > 0 ? Math.max(...assignmentNumbers) + 1 : 1;
        const title = `A${nextNumber}`;

        await client.createAssignmentForCourse(courseId, {
          title,
          name,
          description,
          points,
          assignmentGroup: "ASSIGNMENTS",
          displayGradeAs: "Percentage",
          submissionType: "Online",
          onlineEntryOptions: {
            textEntry: false,
            websiteUrl: true,
            mediaRecordings: false,
            studentAnnotation: false,
            fileUploads: false,
          },
          dueDate,
          dueTime,
          availableFromDate,
          availableFromTime,
          untilDate,
          untilTime,
        });
      }

      router.push(`/Courses/${courseId}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
      alert("Error saving assignment. Please try again.");
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${courseId}/Assignments`);
  };

  if (isEditing && !assignment) {
    return (
      <Container className="mt-4">
        <div className="alert alert-warning">
          Assignment not found.
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div id="wd-assignments-editor" className="mr-5">
        <h2 className="mb-4">{isEditing ? assignment?.name || "Edit Assignment" : "New Assignment"}</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="wd-name" className="form-label">
              Assignment Name
            </label>
            <input
              id="wd-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control border-secondary"
              type="text"
              placeholder="Enter assignment name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="wd-description" className="form-label">
              Assignment Description
            </label>
            <textarea
              id="wd-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control border-secondary"
              rows={8}
              placeholder="Enter assignment description"
            />
          </div>

          <Row className="mb-3">
            <Col md={2} className="text-end">
              <label htmlFor="wd-points" className="form-label">
                Points
              </label>
            </Col>
            <Col md={2}>
              <input
                id="wd-points"
                value={points}
                onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
                type="number"
                className="form-control text-end border-secondary"
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={2}>
              <label htmlFor="wd-due-date" className="form-label">
                Due
              </label>
            </Col>
            <Col md={4}>
              <input
                id="wd-due-date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                type="date"
                className="form-control border-secondary"
              />
            </Col>
            <Col md={2}>
              <input
                id="wd-due-time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                type="time"
                className="form-control border-secondary"
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={2}>
              <label htmlFor="wd-available-from-date" className="form-label">
                Available from
              </label>
            </Col>
            <Col md={4}>
              <input
                id="wd-available-from-date"
                value={availableFromDate}
                onChange={(e) => setAvailableFromDate(e.target.value)}
                type="date"
                className="form-control border-secondary"
              />
            </Col>
            <Col md={2}>
              <input
                id="wd-available-from-time"
                value={availableFromTime}
                onChange={(e) => setAvailableFromTime(e.target.value)}
                type="time"
                className="form-control border-secondary"
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={2}>
              <label htmlFor="wd-until-date" className="form-label">
                Until
              </label>
            </Col>
            <Col md={4}>
              <input
                id="wd-until-date"
                value={untilDate}
                onChange={(e) => setUntilDate(e.target.value)}
                type="date"
                className="form-control border-secondary"
              />
            </Col>
            <Col md={2}>
              <input
                id="wd-until-time"
                value={untilTime}
                onChange={(e) => setUntilTime(e.target.value)}
                type="time"
                className="form-control border-secondary"
              />
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="outline-secondary" className="px-4" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="danger" className="px-4" onClick={handleSave}>
              Save
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}

