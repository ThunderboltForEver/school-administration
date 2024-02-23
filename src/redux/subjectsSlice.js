import { createSlice } from "@reduxjs/toolkit";

export const subjectsSlice = createSlice({
  name: "subjects",
  initialState: {
    subjects: [],
  },
  reducers: {
    addSubject: function (state, action) {
      state.subjects.push(action.payload);
    },
    deleteSubject: function (state, action) {
      state.subjects = state.subjects.filter(
        (subject) => subject.id != action.payload.id
      );
    },
    updateSubject: function (state, action) {
      const { id, name, teacher } = action.payload;

      const existingSubject = state.subjects.find((subject) => subject.id == id);

      if (existingSubject) {
        existingSubject.name = name;
        existingSubject.teacher = teacher;
      }
    },
  },
});

export const { addSubject, deleteSubject,updateSubject } = subjectsSlice.actions;
export default subjectsSlice.reducer;
