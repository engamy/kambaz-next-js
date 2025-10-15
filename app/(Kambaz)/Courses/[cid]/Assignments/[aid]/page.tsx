'use client';

import { Button, Row, Col, Container } from 'react-bootstrap';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import assignments from '@/app/(Kambaz)/Database/assignments.json';

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
}

export default function AssignmentEditor() {
    const params = useParams();
    const assignmentId = params.aid as string;
    const courseId = params.cid as string;
    
    // Find the assignment by ID
    const assignment = assignments.find((a: Assignment) => a._id === assignmentId);
    
    // If assignment not found, show a message
    if (!assignment) {
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
          <h2 className="mb-4">{assignment.name}</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="wd-name" className="form-label">Assignment Name</label>
              <input 
                id="wd-name" 
                defaultValue={assignment.title} 
                className="form-control border-secondary"
                type="text"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="wd-description" className="form-label">Assignment Description</label>
              <textarea 
                id="wd-description"
                className="form-control border-secondary"
                rows={8}
                defaultValue={assignment.description}
              />
            </div>

            <Row className="mb-3">
              <Col md={2} className="text-end">
                <label htmlFor="wd-points" className="form-label">Points</label>
              </Col>
              <Col md={2}>
                <input 
                  id="wd-points" 
                  defaultValue={assignment.points} 
                  type="number" 
                  className="form-control text-end border-secondary"
                />
              </Col>
            </Row>

            <div className="mb-3">
              <label htmlFor="wd-assignment-group" className="form-label">Assignment Group</label>
              <select id="wd-assignment-group" className="form-select border-secondary" defaultValue={assignment.assignmentGroup}>
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="PROJECTS">PROJECTS</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="wd-select-grade-display" className="form-label">Display Grade as</label>
              <select id="wd-select-grade-display" className="form-select border-secondary" defaultValue={assignment.displayGradeAs}>
                <option value="Percentage">Percentage</option>
                <option value="Letter">Letter</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
              <select id="wd-submission-type" className="form-select border-secondary" defaultValue={assignment.submissionType}>
                <option value="Online">Online</option>
                <option value="In-Person">In-Person</option>
              </select>
            </div>

            <div className="ms-4 mb-4">
              <h5 className="mb-3">Online Entry Options</h5>
              <div className="mb-2">
                <div className="form-check">
                  <input 
                    type="checkbox" 
                    id="wd-text-entry" 
                    className="form-check-input border-secondary"
                    defaultChecked={assignment.onlineEntryOptions.textEntry}
                  />
                  <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
                </div>
              </div>
              <div className="mb-2">
                <div className="form-check">
                  <input 
                    type="checkbox" 
                    id="wd-website-url" 
                    className="form-check-input border-secondary"
                    defaultChecked={assignment.onlineEntryOptions.websiteUrl}
                  />
                  <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
                </div>
              </div>
              <div className="mb-2">
                <div className="form-check">
                  <input 
                    type="checkbox" 
                    id="wd-media-recordings" 
                    className="form-check-input border-secondary"
                    defaultChecked={assignment.onlineEntryOptions.mediaRecordings}
                  />
                  <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
                </div>
              </div>
              <div className="mb-2">
                <div className="form-check">
                  <input 
                    type="checkbox" 
                    id="wd-student-annotation" 
                    className="form-check-input border-secondary"
                    defaultChecked={assignment.onlineEntryOptions.studentAnnotation}
                  />
                  <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
                </div>
              </div>
              <div className="mb-2">
                <div className="form-check">
                  <input 
                    type="checkbox" 
                    id="wd-file-uploads" 
                    className="form-check-input border-secondary"
                    defaultChecked={assignment.onlineEntryOptions.fileUploads}
                  />
                  <label htmlFor="wd-file-uploads" className="form-check-label">File Uploads</label>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="wd-assign-to" className="form-label">Assign to</label>
              <div className="border border-secondary rounded p-2 bg-white">
                <span className="badge bg-secondary me-2">
                  Everyone 
                  <button type="button" className="btn-close btn-close-white ms-1" style={{fontSize: '0.6em'}}></button>
                </span>
              </div>
            </div>

            <Row className="mb-3">
              <Col md={2}>
                <label htmlFor="wd-due-date" className="form-label">Due</label>
              </Col>
              <Col md={4}>
                <input 
                  id="wd-due-date" 
                  defaultValue={assignment.dueDate} 
                  type="date" 
                  className="form-control border-secondary"
                />
              </Col>
              <Col md={2}>
                <input 
                  id="wd-due-time" 
                  defaultValue={assignment.dueTime} 
                  type="time" 
                  className="form-control border-secondary"
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={2}>
                <label htmlFor="wd-available-from-date" className="form-label">Available from</label>
              </Col>
              <Col md={4}>
                <input 
                  id="wd-available-from-date" 
                  defaultValue={assignment.availableFromDate} 
                  type="date" 
                  className="form-control border-secondary"
                />
              </Col>
              <Col md={2}>
                <input 
                  id="wd-available-from-time" 
                  defaultValue={assignment.availableFromTime} 
                  type="time" 
                  className="form-control border-secondary"
                />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={2}>
                <label htmlFor="wd-until-date" className="form-label">Until</label>
              </Col>
              <Col md={4}>
                <input 
                  id="wd-until-date" 
                  defaultValue={assignment.untilDate || ""} 
                  type="date" 
                  className="form-control border-secondary"
                />
              </Col>
              <Col md={2}>
                <input 
                  id="wd-until-time" 
                  defaultValue={assignment.untilTime || ""} 
                  type="time" 
                  className="form-control border-secondary"
                />
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2">
              <Link href={`/Courses/${courseId}/Assignments`}>
                <Button variant="outline-secondary" className="px-4">
                  Cancel
                </Button>
              </Link>
              <Link href={`/Courses/${courseId}/Assignments`}>
                <Button variant="danger" className="px-4">
                  Save
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </Container>
    );
}