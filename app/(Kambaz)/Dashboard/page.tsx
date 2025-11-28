"use client"
import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/reducer";
import { RootState } from "../store";
import * as client from "../Courses/client";
import * as enrollmentsClient from "../Enrollments/client";


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

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();
  const [enrollments, setEnrollments] = useState<Record<string, boolean>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  interface UserWithRole {
    role?: string;
    [key: string]: unknown;
  }
  
  const currentUserData = currentUser as UserWithRole | null;
  const userRole = currentUserData?.role?.toUpperCase();
  const isStudent = userRole === "STUDENT";
  const isFaculty = userRole === "FACULTY" || (!isStudent && currentUser);
  
  useEffect(() => {
    console.log("Dashboard Debug:", {
      currentUser: currentUser,
      userRole: currentUserData?.role,
      userRoleUpper: userRole,
      isStudent,
      isFaculty
    });
  }, [currentUser, currentUserData?.role, userRole, isStudent, isFaculty]);
  
  const fetchCourses = async () => {
    try {
      if (isStudent) {
        const allCourses = await client.fetchAllCourses();
        dispatch(setCourses(allCourses || []));
        
        const enrollmentStatus: Record<string, boolean> = {};
        for (const course of allCourses) {
          try {
            const enrollment = await enrollmentsClient.findEnrollment(course._id);
            enrollmentStatus[course._id] = !!enrollment;
          } catch {
            enrollmentStatus[course._id] = false;
          }
        }
        setEnrollments(enrollmentStatus);
      } else if (isFaculty) {
        const myCourses = await client.findMyCourses();
        dispatch(setCourses(myCourses || []));
      } else {
        const allCourses = await client.fetchAllCourses();
        dispatch(setCourses(allCourses || []));
      }
    } catch {
      console.error("Error fetching courses");
      dispatch(setCourses([]));
    }
  };

  const onAddNewCourse = async () => {
    try {
      setErrorMessage(null);
      // Remove _id before creating - backend will generate a new one
      const { _id, ...courseData } = course;
      const newCourse = await client.createCourse(courseData);
      // Refresh the course list to get the updated list from the server
      await fetchCourses();
      // Reset the form
      setCourse({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        department: "", credits: 0,
        image: "/images/reactjs.jpg", description: "New Description"
      });
    } catch (error) {
      const err = error as Error;
      console.error("Error adding course:", err);
      const message = err.message || "Failed to add course. Please try again.";
      setErrorMessage(message);
      alert(message);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    try {
      setErrorMessage(null);
      await client.updateCourse(course);
      dispatch(setCourses(courses.map((c) => {
          if (c._id === course._id) { return course; }
          else { return c; }
      })));
    } catch (error) {
      const err = error as Error;
      console.error("Error updating course:", err);
      const message = err.message || "You need to try again";
      setErrorMessage(message);
      alert(message);
    }
  };

  const onEnroll = async (courseId: string) => {
    try {
      await enrollmentsClient.enrollInCourse(courseId);
      setEnrollments({ ...enrollments, [courseId]: true });
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  const onUnenroll = async (courseId: string) => {
    try {
      await enrollmentsClient.unenrollFromCourse(courseId);
      setEnrollments({ ...enrollments, [courseId]: false });
    } catch (error) {
      console.error("Error unenrolling from course:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const [course, setCourse] = useState<Course>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    department: "", credits: 0,
    image: "/images/reactjs.jpg", description: "New Description"
  });

  

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      {isFaculty && (
        <>
          <h5>New Course
          <button onClick={onAddNewCourse} 
          className="btn btn-primary float-end" 
          id="wd-add-new-course-click" >
             Add
           </button>
           <button onClick={onUpdateCourse} className="btn btn-secondary float-end" id="wd-update-course-click" >
            Update
          </button>

          </h5><br />
          <FormControl value={course.name} className="mb-2"
                       onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
          <FormControl value={course.description} as="textarea" rows={3}
                       onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
          <hr />
        </>
      )}


      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link href={`/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <CardImg src="/images/reactjs.webp" variant="top" width="100%" height={160} />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden fw-bold" style={{ color: '#003366' }}>
                      {course.name} </CardTitle>
                    <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description} </CardText>
                    <Button variant="primary"> Go </Button>
                    {isStudent && (
                      <>
                        {enrollments[course._id] ? (
                          <button 
                            className="btn btn-danger ms-2"
                            onClick={(event) => {
                              event.preventDefault();
                              onUnenroll(course._id);
                            }}
                          >
                            Unenroll
                          </button>
                        ) : (
                          <button 
                            className="btn btn-success ms-2"
                            onClick={(event) => {
                              event.preventDefault();
                              onEnroll(course._id);
                            }}
                          >
                            Enroll
                          </button>
                        )}
                      </>
                    )}
                    {isFaculty && (
                      <>
                        <button className="btn btn-danger ms-2"
                onClick={(event) => {
                  event.preventDefault();
                  onDeleteCourse(course._id);
                }} >
          Delete
        </button>
        <button id="wd-edit-course-click"
          onClick={(event) => {
            event.preventDefault();
            setCourse(course as Course);
          }}
          className="btn btn-warning me-2 float-end" >
          Edit
        </button>
                      </>
                    )}


                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
