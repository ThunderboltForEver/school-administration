import { configureStore } from "@reduxjs/toolkit";
import studentsSlice from "./studentsSlice";
import teachersSlice from "./teachersSlice";
import subjectsSlice from "./subjectsSlice";
import classesSlice from "./classesSlice";
import marksSlice from "./marksSlice";

export const store = configureStore({
  reducer: {
    students: studentsSlice,
    teachers: teachersSlice,
    subjects: subjectsSlice,
    classes: classesSlice,
    marks: marksSlice,
  },
});
