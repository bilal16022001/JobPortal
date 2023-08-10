import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
   Categories:[],
   Employers:[],
   Candidates:[],
   Jobs:[],
   Applications:[],
    width:270
 }

export const fetchCategories = createAsyncThunk("category/fetch",() => {
    return axios.get("/api/getCategories").then((res) => res.data);
})
export const fetchEmployers = createAsyncThunk("employer/fetch",() => {
   return axios.get("/api/getCompanies").then((res) => res.data);
})

export const fetchCandidates = createAsyncThunk("candidate/fetch",() => {
   return axios.get("/api/Users").then((res) => res.data);
})
export const fetchJobs = createAsyncThunk("Job/fetch",() => {
   return axios.get("/api/getJobs").then((res) => res.data);
})
export const fetchApplications = createAsyncThunk("Application/fetch",() => {
   return axios.get("/api/Applications").then((res) => res.data);
})


const Slice = createSlice({
   name:"Slice",
   initialState,
   reducers:{},

   extraReducers:(builder) => {
      builder.addCase(fetchCategories.fulfilled,(state,action) => {
             state.Categories = action.payload
      })
      builder.addCase(fetchEmployers.fulfilled,(state,action) => {
         state.Employers = action.payload
      })
      builder.addCase(fetchCandidates.fulfilled,(state,action) => {
         state.Candidates = action.payload
      })
      builder.addCase(fetchJobs.fulfilled,(state,action) => {
         state.Jobs = action.payload
      })
      builder.addCase(fetchApplications.fulfilled,(state,action) => {
         state.Applications = action.payload
      })
   }

})

export default Slice.reducer;