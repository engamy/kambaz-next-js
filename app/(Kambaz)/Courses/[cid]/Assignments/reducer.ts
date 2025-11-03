import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assignments } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

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

interface AssignmentInput {
  title: string;
  name: string;
  course: string;
  description?: string;
  points?: number;
  assignmentGroup?: string;
  displayGradeAs?: string;
  submissionType?: string;
  onlineEntryOptions?: {
    textEntry: boolean;
    websiteUrl: boolean;
    mediaRecordings: boolean;
    studentAnnotation: boolean;
    fileUploads: boolean;
  };
  dueDate?: string;
  dueTime?: string;
  availableFromDate?: string;
  availableFromTime?: string;
  untilDate?: string;
  untilTime?: string;
}

const initialState = {
  assignments: assignments as Assignment[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }: PayloadAction<AssignmentInput>) => {
      const newAssignment: Assignment = {
        _id: uuidv4(),
        title: assignment.title,
        name: assignment.name,
        course: assignment.course,
        description: assignment.description || "",
        points: assignment.points || 0,
        assignmentGroup: assignment.assignmentGroup || "ASSIGNMENTS",
        displayGradeAs: assignment.displayGradeAs || "Percentage",
        submissionType: assignment.submissionType || "Online",
        onlineEntryOptions: assignment.onlineEntryOptions || {
          textEntry: false,
          websiteUrl: false,
          mediaRecordings: false,
          studentAnnotation: false,
          fileUploads: false,
        },
        dueDate: assignment.dueDate || "",
        dueTime: assignment.dueTime || "",
        availableFromDate: assignment.availableFromDate || "",
        availableFromTime: assignment.availableFromTime || "",
        untilDate: assignment.untilDate || "",
        untilTime: assignment.untilTime || "",
      };
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (state, { payload: assignmentId }: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (a: Assignment) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a: Assignment) =>
        a._id === assignment._id ? assignment : a
      );
    },
    editAssignment: (state, { payload: assignmentId }: PayloadAction<string>) => {
      state.assignments = state.assignments.map((a: Assignment) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      );
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment, editAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;

