import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import postReducer from './slices/postSlice'
import detailReducer from './slices/detailSlice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		post: postReducer,
		detail: detailReducer
	},
})
