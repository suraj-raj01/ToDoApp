import { createSlice } from "@reduxjs/toolkit";
const todoSlice = createSlice({
    name:"todo",
    initialState:{
        task:[]
    },
    reducers:{
        addTask:(state,actions)=>{
            state.task.push(actions.payload);
        },
        delTask:(state,actions)=>{
            state.task = state.task.filter((key)=>{})
        }
    }
})
export default todoSlice.reducer;
export const {addTask,delTask} = todoSlice.actions;