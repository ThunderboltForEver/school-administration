// marksSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const marksSlice = createSlice({
    name: "marks",
    initialState: {
        marks: [],
    },
    reducers: {
        addMark: function (state, action) {
            state.marks.push(action.payload);
        },
        deleteMark: function (state, action) {
            state.marks = state.marks.filter((mark) => mark.id != action.payload.id);
        },
        updateMark: function (state, action) {
            const { id, mark, student, subject } = action.payload;
            const existingMark = state.marks.find((mark) => mark.id == id);
            if (existingMark) {
                existingMark.mark = mark;
                existingMark.student = student;
                existingMark.subject = subject;
            }
        },
    },
});

export const { addMark, deleteMark, updateMark } = marksSlice.actions;
export default marksSlice.reducer;
