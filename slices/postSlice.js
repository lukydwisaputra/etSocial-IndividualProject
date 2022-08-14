import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		setPost: (state, action) => {
			return action.payload
		},
		addPost: (state, action) => {
			state.unshift(action.payload)
		},
		resetPost: (state) => {
			return initialState
		},
	},
})

export const getAllPost = (state) => state.post

export const { setPost, addPost, resetPost} = postSlice.actions

export default postSlice.reducer
