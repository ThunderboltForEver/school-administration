import { createSlice } from "@reduxjs/toolkit";

export const studentsSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
  },
  reducers: {
    addStudent: function (state, action) {
      state.students.push(action.payload);
    },
    deleteStudent: function (state, action) {
      state.students = state.students.filter(
        (student) => student.id != action.payload.id
      );
    },
    updateStudent(state, action) {
      const { id, name, birthday, address, image, clas } = action.payload;
      const existingStudent = state.students.find(
        (student) => student.id == id
      );

      if (existingStudent) {
        existingStudent.name = name;
        existingStudent.birthday = birthday;
        existingStudent.address = address;
        existingStudent.image = image;
        existingStudent.clas = clas;
      }
    },

  },
});

export const { addStudent, deleteStudent, updateStudent, updateClassId } =
  studentsSlice.actions;
export default studentsSlice.reducer;
