import React, { useState } from 'react'
import { Text, Textarea, ActionIcon, Modal, createStyles, Button, Card, Loader } from '@mantine/core'
import { AiOutlinePlus, AiOutlinePaperClip } from 'react-icons/ai'
import { useForm } from '@mantine/hooks'
import axios from 'axios'
import Cookies from 'js-cookie'
import { API_URL } from '../../helper/helper'
import { useDispatch } from 'react-redux'
import { addPost } from '../../slices/postSlice'
import { useRouter } from 'next/router'

const useStyles = createStyles((theme) => ({
	a: {
		color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
		':hover': {
			color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
		},
	},
}))

export default function CreatePostComponent({ props }) {
	// HOOKS
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(null)
	const [opened, setOpened] = useState(false)
	const [fileName, setFileName] = useState('')
	const [captionCount, setCaptionCount] = useState(0)
	const { classes } = useStyles()
	const router = useRouter()
	const { pathname } = useRouter()

	// VAR
	const iconSize = 17
	let notification
	if (success === true) {
		notification = 'Post has been submitted ✅'
	} else if (success === false) {
		notification = 'Try again, something wrong happened..'
	} else {
		notification = 'Submit Post'
	}

	const form = useForm({
		initialValues: {
			post_image: '',
			caption: '',
		},
	})

	const handleSave = () => {
		try {
			if (form.values?.post_image && form.values?.caption) {
				setLoading((prev) => (prev = true))
				setTimeout(async () => {
					let token = Cookies.get('token')

					let result = await axios.get(`${API_URL}/api/users/keep`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})

					let formData = new FormData()
					formData.append(
						'data',
						JSON.stringify({
							caption: form.values?.caption,
							id_user: result.data.users?.id,
						})
					)
					formData.append('post_image', form.values?.post_image)

					let newPost = await axios.post(`${API_URL}/api/posts`, formData, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})

					if (!newPost?.data?.success) {
						setTimeout(() => {
							setLoading((prev) => (prev = false))
							setSuccess((prev) => (prev = false))
						}, 1000)
						setTimeout(() => {
							setSuccess((prev) => (prev = null))
						}, 3000)
						return
					}

					let post = await axios.get(`${API_URL}/api/posts/details?id_post=${newPost?.data?.id}`)

					if (post?.data?.success) {
						setTimeout(() => {
							pathname === '/home' ? router.replace('#top') : router.push('/home')
							dispatch(addPost(post?.data?.posts[0]))
							setLoading((prev) => (prev = false))
							setSuccess((prev) => (prev = true))
						}, 1000)
						setTimeout(() => {
							setSuccess((prev) => (prev = null))
							setOpened((prev) => (prev = false))
							setFileName((prev) => (prev = ''))
							form.reset()
						}, 3000)
						return
					}
				}, 1000)
			} else {
				return
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			{/* -------- START PLUS ICON -------- */}
			<ActionIcon
				component="button"
				className="col-2"
				style={classes.theme}
				onClick={() => {
					setOpened((prev) => (prev = true))
				}}
			>
				<AiOutlinePlus size={iconSize} />
			</ActionIcon>
			{/* -------- END PLUS ICON -------- */}

			{/* -------- START MODAL-------- */}
			<Modal
				className="ms-1"
				size={'md'}
				centered
				opened={opened}
				onClose={() => {
					setOpened((prev) => (prev = false))
					setFileName((prev) => (prev = ''))
					form.setFieldValue('caption', '')
				}}
			>
				<div className="container" style={{ maxWidth: '300px' }}>
					<Text className=" fw-bold mb-5 text-center" style={{ marginTop: '-3vh' }}>
						Create a new post
					</Text>

					{/* -------- START INPUT FILE -------- */}
					<div className="text-center">
						<Card shadow={'sm'} withBorder>
							<div className="wrapper">
								<input
									required
									type="file"
									id="file-input"
									onChange={(input) => {
										const file = input.target?.files[0]
										form.setFieldValue('post_image', file)
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
										<small className="ms-1 fw-bold">Choose Image</small>
									)}
								</label>
							</div>
						</Card>
					</div>
					{/* -------- END INPUT FILE -------- */}

					{/* -------- START INPUT CAPTION -------- */}
					<>
						<Textarea
							required
							size="xs"
							minRows={4}
							className="mt-2"
							placeholder="What happened ?"
							value={form.values.caption}
							variant="default"
							maxLength={300}
							onChange={(event) => {
								let value = event.currentTarget?.value
								if (value.length <= 300) {
									form.setFieldValue('caption', value)
									setCaptionCount(value.length)
								}
							}}
						/>
						<div className="container text-end">
							<small style={{ fontSize: '0.7rem' }}>{captionCount}/300</small>
						</div>
					</>
					{/* -------- END INPUT CAPTION -------- */}

					{/* -------- START BUTTON -------- */}
					<div className="mt-4 mb-4 text-center">
						<Button
							style={{ width: '100%' }}
							variant="default"
							size="xs"
							onClick={() => {
								handleSave()
							}}
						>
							{loading && success === null ? <Loader size={14} color="gray" /> : notification}
						</Button>
					</div>
					{/* -------- END BUTTON -------- */}
				</div>
			</Modal>
			{/* -------- END MODAL -------- */}
		</div>
	)
}
