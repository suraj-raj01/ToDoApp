import { createSlice } from "@reduxjs/toolkit";
const todoSlice = createSlice({
    name: "todo",
    initialState: {
        task: []
    },
    reducers: {
        addTask: (state, actions) => {
            state.task.push(actions.payload);
        },
        deleteRec: (state, actions) => {
            state.task = state.task.filter(key => key.id != actions.payload)
        },
        taskComplete: (state, actions) => {
            for (let i = 0; i < state.task.length; i++) {
                if (state.task[i].id == actions.payload) {
                    state.task[i].status = true;
                }
            }
        },
        taskUncomplete: (state, actions) => {
            for (let i = 0; i < state.task.length; i++) {
                if (state.task[i].id == actions.payload) {
                    state.task[i].status = false;
                }
            }
        },
        editSaveData: (state, actions) => {
            for (let i = 0; i < state.task.length; i++) {
                if (state.task[i].id == actions.payload.id) {
                    state.task[i].data = actions.payload.data;
                }
            }
        }
    }
})
export default todoSlice.reducer;
export const { addTask, deleteRec, taskComplete, taskUncomplete, editSaveData } = todoSlice.actions;