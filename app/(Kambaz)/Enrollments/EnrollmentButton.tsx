"use client";

import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import * as enrollmentsClient from "./client";
import * as coursesClient from "../Courses/client";

interface EnrollmentButtonProps {
  courseId: string;
  currentUserRole?: string;
  onEnrollmentChange?: () => void;
}

export default function EnrollmentButton({ 
  courseId, 
  currentUserRole,
  onEnrollmentChange 
}: EnrollmentButtonProps) {
  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check enrollment status on mount and when courseId changes
  useEffect(() => {
    if (currentUserRole !== "STUDENT") {
      return;
    }
    const checkEnrollment = async () => {
      try {
        const enrollment = await enrollmentsClient.findEnrollment(courseId);
        setIsEnrolled(enrollment !== null);
      } catch (err) {
        // 404 is expected when not enrolled, so we don't log it as an error
        const error = err as { response?: { status?: number } };
        if (error.response?.status === 404) {
          setIsEnrolled(false);
        } else {
          console.error("Error checking enrollment:", err);
          // On error, try to check via my courses as fallback
          try {
            const myCourses = await coursesClient.findMyCourses();
            const isEnrolledInMyCourses = Array.isArray(myCourses) && 
              myCourses.some((c: { _id?: string }) => c._id === courseId);
            setIsEnrolled(isEnrolledInMyCourses);
          } catch (fallbackError) {
            console.error("Fallback enrollment check failed:", fallbackError);
            setIsEnrolled(false);
          }
        }
      }
    };
    checkEnrollment();
  }, [courseId, currentUserRole]);

  // Only show enrollment button for students
  if (currentUserRole !== "STUDENT") {
    return null;
  }

  const handleEnroll = async () => {
    setLoading(true);
    setError(null);
    try {
      await coursesClient.enrollIntoCourse(courseId);
      setIsEnrolled(true);
      if (onEnrollmentChange) {
        onEnrollmentChange();
      }
    } catch (err) {
      const error = err as { response?: { status?: number; data?: { message?: string } }; message?: string };
      
      // If enrollment fails, check if we're already enrolled (might be a duplicate)
      if (error.response?.status === 400 || error.response?.status === 409 || error.response?.status === 500) {
        try {
          // Re-check enrollment status
          const enrollment = await enrollmentsClient.findEnrollment(courseId);
          if (enrollment !== null) {
            // We're already enrolled, update UI accordingly
            setIsEnrolled(true);
            if (onEnrollmentChange) {
              onEnrollmentChange();
            }
            return; // Don't show error if we're already enrolled
          }
        } catch (checkError) {
          // If check fails, continue to show error
        }
      }
      
      const errorMessage = error.response?.data?.message || error.message || "Failed to enroll in course";
      setError(errorMessage);
      console.error("Error enrolling in course:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnenroll = async () => {
    setLoading(true);
    setError(null);
    try {
      await coursesClient.unenrollFromCourse(courseId);
      setIsEnrolled(false);
      if (onEnrollmentChange) {
        onEnrollmentChange();
      }
    } catch (err) {
      const error = err as { response?: { status?: number; data?: { message?: string } }; message?: string };
      const errorMessage = error.response?.data?.message || error.message || "Failed to unenroll from course";
      setError(errorMessage);
      console.error("Error unenrolling from course:", err);
    } finally {
      setLoading(false);
    }
  };

  if (isEnrolled === null) {
    return <Button variant="secondary" disabled>Loading...</Button>;
  }

  return (
    <div>
      {error && (
        <div className="alert alert-danger mb-2" role="alert" style={{ fontSize: "0.8rem" }}>
          {error}
        </div>
      )}
      {isEnrolled ? (
        <Button
          variant="danger"
          onClick={handleUnenroll}
          disabled={loading}
          size="sm"
        >
          {loading ? "Unenrolling..." : "Unenroll"}
        </Button>
      ) : (
        <Button
          variant="success"
          onClick={handleEnroll}
          disabled={loading}
          size="sm"
        >
          {loading ? "Enrolling..." : "Enroll"}
        </Button>
      )}
    </div>
  );
}

