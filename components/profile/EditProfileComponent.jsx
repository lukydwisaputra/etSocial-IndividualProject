import React, { useState } from 'react'
import { Modal, Text, TextInput, Textarea, Button, Card, Loader } from '@mantine/core'
import { At } from 'tabler-icons-react'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { AiOutlineEdit, AiOutlineClose, AiOutlineCheck } from 'react-icons/ai'
import axios from 'axios'
import { API_URL } from '../../helper/helper'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../slices/userSlice'
import { setPost } from '../../slices/postSlice'
import { getUser } from '../../slices/userSlice'

export default function EditProfileComponent({ form }) {
	// HOOKS
	const dispatch = useDispatch()
	const [fileName, setFileName] = useState('')
	const [opened, setOpened] = useState(false)
	const [edited, setEdited] = useState({ isLoading: false, isEdited: null })
	const [state, setState] = useState({
		isTakenEmail: null,
		isValidEmail: null,
		isTakenUsername: null,
		isMatchPassword: false,
		isStrengthPassword: false,
		isUploading: false,
		isSuccess: null,
		isCredentialsOk: null,
	})

	let { isTakenEmail, isValidEmail, isTakenUsername, isMatchPassword, isStrengthPassword, isUploading, isSuccess, isCredentialsOk } = state

	// VAR
	const { id, username, name, bio, profile_picture } = useSelector(getUser)
	const iconSize = 17

	const handleEditProfile = () => {
		setEdited((prev) => ({ ...prev, isLoading: true }))
		setTimeout(async () => {
			try {
				if (form.values?.profile_picture === '') {
					delete form.values?.profile_picture
					console.log(form.values)
					form.setFieldValue('profile_picture', profile_picture)
					let result = await axios.patch(`${API_URL}/api/users/${id}`, JSON.stringify(form.values), {
						headers: {
							Authorization: `Bearer ${Cookies.get('token')}`,
						},
					})
					if (result?.data?.success) {
						setTimeout(() => {
							setEdited((prev) => ({ ...prev, isEdited: true }))
							setEdited((prev) => ({ ...prev, isLoading: false }))
						}, 1500)
					}
				} else {
					let formData = new FormData()
					formData.append(
						'data',
						JSON.stringify({
							name: form.values?.name ? form.values?.name : '•' ,
							username: form.values?.username,
							bio: form.values?.bio,
						})
					)

					formData.append('profile_picture', form.values?.profile_picture)

					let result = await axios.patch(`${API_URL}/api/users/${id}`, formData, {
						headers: {
							Authorization: `Bearer ${Cookies.get('token')}`,
						},
					})
					if (result?.data?.success) {
						setTimeout(() => {
							setEdited((prev) => ({ ...prev, isEdited: true }))
							setEdited((prev) => ({ ...prev, isLoading: false }))
						}, 1500)
					}
				}

				let token = Cookies.get('token')
				let res = await axios.get(`${API_URL}/api/users/keep`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})

				if (token && res.data?.success) {
					dispatch(userLogin(res.data?.users))
					setOpened(false)
					form.setFieldValue('profile_picture', profile_picture)
					setFileName((prev) => (prev = ''))
				}

				let post = await axios.get(`${API_URL}/api/posts/details`)

				if (post?.data?.success) {
					dispatch(setPost(post?.data?.posts))
				}
			} catch (error) {
				console.log(error)
				setEdited((prev) => ({ ...prev, isLoading: false }))
				setEdited((prev) => ({ ...prev, isEdited: false }))
			}
		}, 1000)
	}

	return (
		<>
			<AiOutlineEdit
				className="text-muted"
				size={15}
				onClick={() => {
					setOpened(true)
					form.setFieldValue('profile_picture', profile_picture)
					form.setFieldValue('name', name)
					form.setFieldValue('username', username)
					form.setFieldValue('bio', bio)
				}}
			/>
			<Modal
				size={'sm'}
				style={{ marginTop: '5vh' }}
				centered
				opened={opened === true}
				onClose={() => {
					setOpened(false)
					form.setFieldValue('profile_picture', profile_picture)
					setFileName((prev) => (prev = ''))
				}}
			>
				<Text className="fw-bold text-center mb-4" style={{ fontSize: '1rem', hover: 'none', marginTop: '-3vh' }}>
					Edit Profilé
				</Text>

				<Card shadow={'sm'} withBorder className="text-center">
					<div className="wrapper">
						<input
							type="file"
							id="file-input"
							onChange={(input) => {
								const file = input.target?.files[0]
								form.setFieldValue('profile_picture', file)
								setFileName((prev) => (prev = file?.name))
							}}
						/>
						<label htmlFor="file-input">
							<AiOutlinePaperClip size={iconSize + 5} />
							{fileName ? (
								<>
									<small className="ms-1 fw-bold">{fileName}</small>
								</>
							) : (
								<small className="ms-1 fw-bold">Choose Profile Picture</small>
							)}
						</label>
					</div>
				</Card>

				{/* NAME FIELD */}
				<TextInput maxLength={20} className="mt-2" label="Name" value={form.values.name} variant="default" onChange={(event) => form.setFieldValue('name', event.currentTarget.value)} />

				{/* USERNAME FIELD */}
				<TextInput
					maxLength={20}
					label="Username"
					id={`username-${id}`}
					className="mt-2"
					variant="default"
					icon={<At size={14} />}
					rightSection={
						form.values.username === '' ? (
							''
						) : isTakenUsername && form.values?.username !== username ? (
							<AiOutlineClose size={14} color={'red'} />
						) : form.values.username !== '' ? (
							<AiOutlineCheck size={14} color={'teal'} />
						) : (
							''
						)
					}
					placeholder="username"
					value={form?.values?.username?.toLowerCase()}
					onChange={async (event) => {
						let username = event.currentTarget.value
						form.setFieldValue('username', username)
						try {
							let res = await axios.get(`${API_URL}/api/users?username=${username.toLowerCase()}`)
							if (res.data.success && username !== '') {
								setState((prev) => ({
									...prev,
									isTakenUsername: true,
								}))
							} else {
								setState((prev) => ({
									...prev,
									isTakenUsername: false,
								}))
							}
						} catch (error) {
							setState((prev) => ({
								...prev,
								isTakenUsername: false,
							}))
						}
					}}
					error={
						form.values.username === '' || form.values?.username === username ? (
							''
						) : isTakenUsername ? (
							<div className="row">
								<small className="text-danger">username has been taken</small>
							</div>
						) : form.values.username !== '' ? (
							''
						) : (
							''
						)
					}
				/>

				{/* BIO FIELD */}
				<Textarea maxLength={150} className="mt-2" variant="default" value={form.values.bio} label="Bio" onChange={(event) => form.setFieldValue('bio', event.currentTarget.value)} />

				<div className="mt-4 mb-2 text-center">
					<Button
						style={{ width: '100%' }}
						variant="default"
						size="sm"
						onClick={() => {
							handleEditProfile()
						}}
					>
						{edited.isLoading ? <Loader size={'xs'} color={'gray'} /> : 'Save'}
					</Button>
				</div>
			</Modal>
		</>
	)
}
