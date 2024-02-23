import { createSlice } from "@reduxjs/toolkit";

export const classesSlice = createSlice({
  name: "classes",
  initialState: {
    classes: [],
  },
  reducers: {
    addClass: function (state, action) {
      state.classes.push(action.payload);
    },
    deleteClass: function (state, action) {
      state.classes = state.classes.filter(
        (clas) => clas.id != action.payload.id
      );
    },
    updateClass: function (state, action) {
      const { id, className } = action.payload;
      const existingClass = state.classes.find((clas) => clas.id == id);
      if (existingClass) {
        existingClass.className = className;
      }
    },
  },
});

export const { addClass, deleteClass, updateClass } = classesSlice.actions;
export default classesSlice.reducer;
