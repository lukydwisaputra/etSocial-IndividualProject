import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const detailSlice = createSlice({
	name: 'detail',
	initialState,
	reducers: {
		setDetail: (state, action) => {
			return action.payload
		},
		resetDetail: (state) => {
			return initialState
		},
	},
})

export const getDetail = (state) => state.detail

export const { setDetail, resetDetail} = detailSlice.actions

export default detailSlice.reducer
