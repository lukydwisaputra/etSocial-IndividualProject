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
			state = initialState
		},
		likePost: (state, action) => {
			let {postIndex, data} = action.payload
			state[postIndex].likes.push(data)
		},
		unlikePost: (state, action) => {
			let {postIndex, likesIndex} = action.payload
			state[postIndex].likes.splice(likesIndex, 1)
		}
	}
})

export const getAllPost = (state) => state.post

export const { setPost, addPost, resetPost, likePost, unlikePost } = postSlice.actions

export default postSlice.reducer