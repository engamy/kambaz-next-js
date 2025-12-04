"use client";

import { useState, useEffect, useCallback } from "react";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import * as coursesClient from "../Courses/client";
import * as enrollmentsClient from "./client";
import EnrollmentButton from "./EnrollmentButton";

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  image?: string;
  [key: string]: unknown;
}

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

export default function EnrollmentsPage() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Map<string, Enrollment>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      const allCourses = await coursesClient.fetchAllCourses();
      setCourses(allCourses || []);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load courses");
      setCourses([]);
    }
  };

  const checkEnrollments = useCallback(async () => {
    if (currentUser?.role !== "STUDENT") {
      setLoading(false);
      return;
    }

    const enrollmentMap = new Map<string, Enrollment>();
    for (const course of courses) {
      try {
        const enrollment = await enrollmentsClient.findEnrollment(course._id);
        if (enrollment) {
          enrollmentMap.set(course._id, enrollment);
        }
      } catch (err) {
        console.error(`Error checking enrollment for course ${course._id}:`, err);
      }
    }
    setEnrollments(enrollmentMap);
    setLoading(false);
  }, [courses, currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    }
  }, [currentUser]);

  useEffect(() => {
    if (courses.length > 0 && currentUser?.role === "STUDENT") {
      checkEnrollments();
    } else if (courses.length > 0) {
      setLoading(false);
    }
  }, [courses, currentUser, checkEnrollments]);

  const handleEnrollmentChange = async (courseId: string) => {
    // Refresh enrollment status for the specific course
    if (currentUser?.role === "STUDENT") {
      try {
        const enrollment = await enrollmentsClient.findEnrollment(courseId);
        setEnrollments((prev) => {
          const newMap = new Map(prev);
          if (enrollment) {
            newMap.set(courseId, enrollment);
          } else {
            newMap.delete(courseId);
          }
          return newMap;
        });
      } catch (err) {
        console.error("Error refreshing enrollment:", err);
      }
    }
  };

  if (!currentUser) {
    return (
      <div id="wd-enrollments">
        <h1>Enrollments</h1>
        <hr />
        <p>Please sign in to view enrollments.</p>
      </div>
    );
  }

  if (currentUser.role !== "STUDENT") {
    return (
      <div id="wd-enrollments">
        <h1>Enrollments</h1>
        <hr />
        <p>Only students can enroll in courses. Faculty can manage courses from the Dashboard.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div id="wd-enrollments">
        <h1>Enrollments</h1>
        <hr />
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div id="wd-enrollments">
      <h1>Course Enrollments</h1>
      <hr />
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <h2>Available Courses ({courses.length})</h2>
      <hr />
      <div id="wd-enrollments-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => {
            const isEnrolled = enrollments.has(course._id);
            return (
              <Col key={course._id} className="wd-enrollments-course" style={{ width: "300px" }}>
                <Card>
                  <Link
                    href={`/Courses/${course._id}/Home`}
                    className="wd-enrollments-course-link text-decoration-none text-dark"
                  >
                    <CardImg src="/images/reactjs.webp" variant="top" width="100%" height={160} />
                    <CardBody className="card-body">
                      <CardTitle className="wd-enrollments-course-title text-nowrap overflow-hidden fw-bold" style={{ color: '#003366' }}>
                        {course.name}
                      </CardTitle>
                      <CardText className="wd-enrollments-course-description overflow-hidden" style={{ height: "100px" }}>
                        {course.description}
                      </CardText>
                      {isEnrolled && (
                        <div className="mb-2">
                          <span className="badge bg-success">Enrolled</span>
                        </div>
                      )}
                      <Button variant="primary" className="me-2">Go</Button>
                    </CardBody>
                  </Link>
                  <div className="p-2">
                    <EnrollmentButton
                      courseId={course._id}
                      currentUserRole={currentUser.role}
                      onEnrollmentChange={() => handleEnrollmentChange(course._id)}
                    />
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

