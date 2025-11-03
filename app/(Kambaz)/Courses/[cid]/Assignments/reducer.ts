import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: assignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
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
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      ) as any;
    },
    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      ) as any;
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment, editAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;

