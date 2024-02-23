import { createSlice } from "@reduxjs/toolkit";

export const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    teachers: [],
  },
  reducers: {
    addTeacher: function (state, action) {
      state.teachers.push(action.payload);
    },
    deleteTeacher: function (state, action) {
      state.teachers = state.teachers.filter(
        (teacher) => teacher.id != action.payload.id
      );
    },
    updateTeacher: function (state, action) {
      const { id, name, birthday, address } = action.payload;

      const existingTeacher = state.teachers.find((teacher) => teacher.id == id);

      if (existingTeacher) {
        existingTeacher.name = name;
        existingTeacher.birthday = birthday;
        existingTeacher.address = address;
      }
    },
  },
});

export const { addTeacher, deleteTeacher, updateTeacher } =
  teachersSlice.actions;
export default teachersSlice.reducer;
