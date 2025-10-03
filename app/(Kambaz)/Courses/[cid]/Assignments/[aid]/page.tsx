'use client';

import { Button, Row, Col, Container } from 'react-bootstrap';

export default function AssignmentEditor() {
    return (
      <Container className="mt-4">
        <div id="wd-assignments-editor" className="mr-5">
          <form>
            {/* Assignment Name */}
            <div className="mb-3">
              <label htmlFor="wd-name" className="form-label">Assignment Name</label>
              <input 
                id="wd-name" 
                defaultValue="A1" 
                className="form-control border-secondary"
                type="text"
              />
            </div>

            {/* Assignment Description */}
            <div className="mb-4">
              <label htmlFor="wd-description" className="form-label">Assignment Description</label>
              <textarea 
                id="wd-description"
                className="form-control border-secondary"
                rows={8}
                defaultValue={`The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kambas application
• Links to all relevant source code repositories

The Kambas application should include a link to navigate back to the landing page.`}
              />
            </div>

            {/* Configuration Section */}
            <Row className="mb-3">
              <Col md={2} className="text-end">
                <label htmlFor="wd-points" className="form-label">Points</label>
              </Col>
              <Col md={2}>
                <input 
                  id="wd-points" 
                  defaultValue={100} 
                  type="number" 
                  className="form-control text-end border-secondary"
                />
              </Col>
            </Row>

            <div className="mb-3">
              <label htmlFor="wd-assignment-group" className="form-label">Assignment Group</label>
              <select id="wd-assignment-group" className="form-select border-secondary">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="wd-select-grade-display" className="form-label">Display Grade as</label>
              <select id="wd-select-grade-display" className="form-select border-secondary">
                <option value="Percentage">Percentage</option>
                <option value="Letter">Letter</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
              <select id="wd-submission-type" className="form-select border-secondary">
                <option value="Online">Online</option>
                <option value="In-Person">In-Person</option>
              </select>
            </div>

            {/* Online Entry Options */}
            <div className="ms-4 mb-4">
              <h5 className="mb-3">Online Entry Options</h5>
              <div className="mb-2">
                <div className="form-check">
                  <input 
                    type="checkbox" 
                    id="wd-text-entry" 
                    className="form-check-input border-secondary"
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
                    defaultChecked
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
                  />
                  <label htmlFor="wd-file-uploads" className="form-check-label">File Uploads</label>
                </div>
              </div>
            </div>

            {/* Assignment Dates Section */}
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
                  defaultValue="2024-05-13" 
                  type="date" 
                  className="form-control border-secondary"
                />
              </Col>
              <Col md={2}>
                <input 
                  id="wd-due-time" 
                  defaultValue="23:59" 
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
                  defaultValue="2024-05-06" 
                  type="date" 
                  className="form-control border-secondary"
                />
              </Col>
              <Col md={2}>
                <input 
                  id="wd-available-from-time" 
                  defaultValue="00:01" 
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
                  type="date" 
                  className="form-control border-secondary"
                />
              </Col>
              <Col md={2}>
                <input 
                  id="wd-until-time" 
                  type="time" 
                  className="form-control border-secondary"
                />
              </Col>
            </Row>

            {/* Action Buttons */}
            <div className="d-flex justify-content-end gap-2">
              <Button variant="outline-secondary" className="px-4">
                Cancel
              </Button>
              <Button variant="danger" className="px-4">
                Save
              </Button>
            </div>
          </form>
        </div>
      </Container>
    );
}