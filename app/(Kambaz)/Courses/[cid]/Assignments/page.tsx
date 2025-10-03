"use client";
import Link from "next/link";
import { FaEllipsisV, FaPlus, FaSearch, FaCheckCircle, FaFileAlt, FaChevronDown } from "react-icons/fa";

export default function Assignments() {
    return (
      <div id="wd-assignments" className="p-4">
        {/* Top Header Section */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="position-relative flex-fill">
            <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" />
            <input 
              type="text" 
              className="form-control ps-5" 
              placeholder="Search..." 
              id="wd-search-assignment"
              style={{ borderRadius: '6px', border: '1px solid #dee2e6' }}
            />
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-light border" id="wd-add-assignment-group">
              <FaPlus className="me-1" />Group
            </button>
            <button className="btn btn-danger" id="wd-add-assignment">
              <FaPlus className="me-1" />Assignment
            </button>
          </div>
        </div>

        {/* Assignments Section */}
        <div className="wd-assignment-section mb-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center gap-2">
              <FaEllipsisV className="text-secondary" />
              <FaChevronDown className="text-secondary" />
              <h3 className="mb-0 fw-bold text-uppercase">ASSIGNMENTS</h3>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-light text-dark px-3 py-2 rounded-pill">40% of Total</span>
              <FaPlus className="text-secondary" />
              <FaEllipsisV className="text-secondary" />
            </div>
          </div>
          
          <div className="wd-assignment-list border rounded-1" style={{ borderLeft: '4px solid #198754' }}>
            <div className="wd-assignment-item border-bottom p-3">
              <div className="d-flex align-items-start">
                <FaEllipsisV className="text-secondary me-3 mt-1" />
                <div className="flex-fill">
                  <div className="d-flex align-items-center mb-2">
                    <div className="wd-assignment-icon me-3">
                      <FaFileAlt className="text-success" style={{ fontSize: '18px' }} />
                    </div>
                    <Link href="/Courses/1234/Assignments/001" className="wd-assignment-link fw-bold text-decoration-none text-dark">
                      A1
                    </Link>
                  </div>
                  <div className="ms-5">
                    <div className="text-danger mb-1">Multiple Modules</div>
                    <div className="text-muted small">
                      <strong>Not available until</strong> May 6 at 12:00am | <strong>Due</strong> May 13 at 11:59pm | 100 pts
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <FaCheckCircle className="text-success" />
                  <FaEllipsisV className="text-secondary" />
                </div>
              </div>
            </div>

            <div className="wd-assignment-item border-bottom p-3">
              <div className="d-flex align-items-start">
                <FaEllipsisV className="text-secondary me-3 mt-1" />
                <div className="flex-fill">
                  <div className="d-flex align-items-center mb-2">
                    <div className="wd-assignment-icon me-3">
                      <FaFileAlt className="text-success" style={{ fontSize: '18px' }} />
                    </div>
                    <Link href="/Courses/1234/Assignments/002" className="wd-assignment-link fw-bold text-decoration-none text-dark">
                      A2
                    </Link>
                  </div>
                  <div className="ms-5">
                    <div className="text-danger mb-1">Multiple Modules</div>
                    <div className="text-muted small">
                      <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 20 at 11:59pm | 100 pts
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <FaCheckCircle className="text-success" />
                  <FaEllipsisV className="text-secondary" />
                </div>
              </div>
            </div>

            <div className="wd-assignment-item p-3">
              <div className="d-flex align-items-start">
                <FaEllipsisV className="text-secondary me-3 mt-1" />
                <div className="flex-fill">
                  <div className="d-flex align-items-center mb-2">
                    <div className="wd-assignment-icon me-3">
                      <FaFileAlt className="text-success" style={{ fontSize: '18px' }} />
                    </div>
                    <Link href="/Courses/1234/Assignments/003" className="wd-assignment-link fw-bold text-decoration-none text-dark">
                      A3
                    </Link>
                  </div>
                  <div className="ms-5">
                    <div className="text-danger mb-1">Multiple Modules</div>
                    <div className="text-muted small">
                      <strong>Not available until</strong> May 20 at 12:00am | <strong>Due</strong> May 27 at 11:59pm | 100 pts
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <FaCheckCircle className="text-success" />
                  <FaEllipsisV className="text-secondary" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="wd-assignment-section mb-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center gap-2">
              <FaEllipsisV className="text-secondary" />
              <FaChevronDown className="text-secondary" />
              <h3 className="mb-0 fw-bold text-uppercase">QUIZZES</h3>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-light text-dark px-3 py-2 rounded-pill">10% of Total</span>
              <FaPlus className="text-secondary" />
              <FaEllipsisV className="text-secondary" />
            </div>
          </div>
        </div>

        <div className="wd-assignment-section mb-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center gap-2">
              <FaEllipsisV className="text-secondary" />
              <FaChevronDown className="text-secondary" />
              <h3 className="mb-0 fw-bold text-uppercase">EXAMS</h3>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-light text-dark px-3 py-2 rounded-pill">15% of Total</span>
              <FaPlus className="text-secondary" />
              <FaEllipsisV className="text-secondary" />
            </div>
          </div>
        </div>

        <div className="wd-assignment-section mb-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center gap-2">
              <FaEllipsisV className="text-secondary" />
              <FaChevronDown className="text-secondary" />
              <h3 className="mb-0 fw-bold text-uppercase">PROJECTS</h3>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-light text-dark px-3 py-2 rounded-pill">15% of Total</span>
              <FaPlus className="text-secondary" />
              <FaEllipsisV className="text-secondary" />
            </div>
          </div>
        </div>
      </div>
  );
}
  