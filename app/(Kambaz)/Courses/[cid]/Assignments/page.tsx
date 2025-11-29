"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaEllipsisV, FaPlus, FaSearch, FaCheckCircle, FaFileAlt, FaChevronDown, FaTrash } from "react-icons/fa";
import * as client from "./client";
import DeleteAssignmentModal from "./DeleteAssignmentModal";

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

export default function Assignments() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.cid as string;
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [assignmentToDelete, setAssignmentToDelete] = useState<Assignment | null>(null);

    useEffect(() => {
        const fetchAssignments = async () => {
            if (courseId) {
                try {
                    const fetchedAssignments = await client.findAssignmentsForCourse(courseId);
                    setAssignments(fetchedAssignments);
                } catch (error) {
                    console.error("Error fetching assignments:", error);
                }
            }
        };
        fetchAssignments();
    }, [courseId]);

    const handleDeleteClick = (assignment: Assignment) => {
        setAssignmentToDelete(assignment);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (assignmentToDelete) {
            try {
                await client.deleteAssignment(assignmentToDelete._id);
                setAssignments(assignments.filter((a) => a._id !== assignmentToDelete._id));
                setAssignmentToDelete(null);
                setShowDeleteModal(false);
            } catch (error) {
                console.error("Error deleting assignment:", error);
            }
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setAssignmentToDelete(null);
    };
    
    const courseAssignments = assignments.filter((assignment: Assignment) => assignment.course === courseId);
    
    const groupedAssignments = courseAssignments.reduce((groups: Record<string, Assignment[]>, assignment: Assignment) => {
        const group = assignment.assignmentGroup;
        if (!groups[group]) {
            groups[group] = [];
        }
        groups[group].push(assignment);
        return groups;
    }, {} as Record<string, Assignment[]>);

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const formatTime = (timeStr: string) => {
        if (!timeStr) return "";
        const [hours, minutes] = timeStr.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'pm' : 'am';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes}${ampm}`;
    };

    return (
      <>
        <div id="wd-assignments" className="p-4">
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
              <button 
                type="button"
                className="btn btn-danger" 
                id="wd-add-assignment"
                onClick={() => {
                  console.log('Navigating to:', `/Courses/${courseId}/Assignments/new`);
                  router.push(`/Courses/${courseId}/Assignments/new`);
                }}
              >
                <FaPlus className="me-1" />Assignment
              </button>
            </div>
          </div>

          {Object.entries(groupedAssignments).map(([groupName, groupAssignments]) => (
            <div key={groupName} className="wd-assignment-section mb-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center gap-2">
                  <FaEllipsisV className="text-secondary" />
                  <FaChevronDown className="text-secondary" />
                  <h3 className="mb-0 fw-bold text-uppercase">{groupName}</h3>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-light text-dark px-3 py-2 rounded-pill">
                    {groupName === 'ASSIGNMENTS' ? '40% of Total' : 
                     groupName === 'QUIZZES' ? '10% of Total' :
                     groupName === 'EXAMS' ? '15% of Total' :
                     groupName === 'PROJECTS' ? '15% of Total' : '20% of Total'}
                  </span>
                  <FaPlus className="text-secondary" />
                  <FaEllipsisV className="text-secondary" />
                </div>
              </div>
              
              <div className="wd-assignment-list border rounded-1" style={{ borderLeft: '4px solid #198754' }}>
                {(groupAssignments as Assignment[]).map((assignment: Assignment, index: number) => (
                  <div key={assignment._id} className={`wd-assignment-item ${index < (groupAssignments as Assignment[]).length - 1 ? 'border-bottom' : ''} p-3`}>
                    <div className="d-flex align-items-start">
                      <FaEllipsisV className="text-secondary me-3 mt-1" />
                      <div className="flex-fill">
                        <div className="d-flex align-items-center mb-2">
                          <div className="wd-assignment-icon me-3">
                            <FaFileAlt className="text-success" style={{ fontSize: '18px' }} />
                          </div>
                          <Link 
                            href={`/Courses/${courseId}/Assignments/${assignment._id}`} 
                            className="wd-assignment-link fw-bold text-decoration-none text-dark"
                          >
                            {assignment.title}
                          </Link>
                        </div>
                        <div className="ms-5">
                          <div className="text-danger mb-1">{assignment.name}</div>
                          <div className="text-muted small">
                            <strong>Not available until</strong> {formatDate(assignment.availableFromDate)} at {formatTime(assignment.availableFromTime)} | 
                            <strong> Due</strong> {formatDate(assignment.dueDate)} at {formatTime(assignment.dueTime)} | 
                            {assignment.points} pts
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <FaCheckCircle className="text-success" />
                        <FaTrash
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDeleteClick(assignment)}
                        />
                        <FaEllipsisV className="text-secondary" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <DeleteAssignmentModal
          show={showDeleteModal}
          handleClose={handleDeleteCancel}
          assignmentName={assignmentToDelete?.name || ""}
          onConfirm={handleDeleteConfirm}
        />
      </>
  );
}
  