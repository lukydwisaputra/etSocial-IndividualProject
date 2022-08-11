import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		postAction: (state, action) => {
			// let { id, username, email, status, name, bio, profile_picture} = action.payload
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