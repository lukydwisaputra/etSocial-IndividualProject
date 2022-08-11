import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		userLogin: (state, action) => {
			return action.payload
		},
		userLogout: (state) => {
			state = initialState
		}
	}
})

// Action creators are generated for each case reducer function
export const { userLogin, userLogout } = userSlice.actions

export default userSlice.reducer
