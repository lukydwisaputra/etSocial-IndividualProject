import React, { useState } from 'react'
import {
	Text,
	Textarea,
	ActionIcon,
	Modal,
	createStyles,
	useMantineTheme,
	Button,
	Card,
} from '@mantine/core'
import { AiOutlinePlus, AiOutlinePaperClip } from 'react-icons/ai'
import { useForm } from '@mantine/hooks'
import axios from 'axios'
import Cookies from 'js-cookie'
import { API_URL } from '../../helper/helper'

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
	const [opened, setOpened] = useState(false)
	const [fileName, setFileName] = useState('')
	const [captionCount, setCaptionCount] = useState(0)
	const { classes } = useStyles()

	// VAR
	const iconSize = 17

	const form = useForm({
		initialValues: {
			post_image: '',
			caption: '',
		},
	})

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
									type="file"
									id="file-input"
									onChange={(input) => {
										const file = input.target.files[0]
										console.log(file)
										form.setFieldValue('post_image', file)
										setFileName((prev) => (prev = file.name))
										console.log(`posts/${file.name}`)
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
							size="xs"
							minRows={4}
							className="mt-2"
							placeholder="caption"
							value={form.values.caption}
							variant="default"
							maxLength={300}
							onChange={(event) => {
								let value = event.currentTarget.value
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
							onClick={async () => {
								try {
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
											caption: form.values.caption,
											id_user: result.data.users?.id,
										})
									)
									formData.append('post_image', form.values.post_image)

									let newPost = await axios.post(
										`${API_URL}/api/posts`,
										formData,
										{
											headers: {
												Authorization: `Bearer ${token}`,
											},
										}
									)

									if (newPost.data.success) {
										setOpened((prev) => (prev = false))
										setFileName((prev) => (prev = ''))
										form.setFieldValue('caption', '')
									}
								} catch (error) {
									console.log(error)
								}
							}}
						>
							Save
						</Button>
					</div>
					{/* -------- END BUTTON -------- */}
				</div>
			</Modal>
			{/* -------- END MODAL -------- */}
		</div>
	)
}
