import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const userLoginThunk=createAsyncThunk('user-login',async(userCredObj,thunkApi)=>{
    try{
        const response = await axios.post('http://localhost:4000/user-api/login',userCredObj)
        // console.log(userCredObj)
        if(response.data.message==='Login successful'){
            localStorage.setItem('token',response.data.token)
            return response.data;
        }else{
            return thunkApi.rejectWithValue(response.data.message)
        }
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})
export const userSlice = createSlice({
    name:"user-login",
    initialState:{
        isPending:false,
        userLoginStatus:false,
        currentUser:{},
        errOccurred:false,
        errMessage:''
    },
    reducers:{
        resetState:(state,action)=>{
            state.isPending=false;
            state.userLoginStatus=false;
            state.currentUser={};
            state.errOccurred=false;
            state.errMessage=''
        }
    },
    extraReducers:builder=>{builder
    .addCase(userLoginThunk.pending,(state,action)=>{
        state.isPending=true;
    })
    .addCase(userLoginThunk.fulfilled,(state,action)=>{
        state.isPending=false;
        // console.log(action);
        state.currentUser=action.payload.user;
        state.errOccurred=false;
        state.errMessage='';
        state.userLoginStatus=true;
    })
    .addCase(userLoginThunk.rejected,(state,action)=>{
        state.isPending=false;
        state.currentUser={};
        state.errOccurred=true;
        state.errMessage=action.payload;
    })}
})

export let {resetState} = userSlice.actions;
export default userSlice.reducer;
