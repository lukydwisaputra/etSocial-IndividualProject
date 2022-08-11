import React, { useState } from 'react'
import { Modal, Text, TextInput, Textarea, Button, Card, useMantineTheme } from '@mantine/core'
import { At } from 'tabler-icons-react'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { AiOutlineEdit } from 'react-icons/ai'

function EditProfileComponent({ form, users }) {
	// HOOKS
	const [fileName, setFileName] = useState('')
	const [opened, setOpened] = useState(false)
	
	// VAR
	let { name, username, bio, profile_picture } = users
	const iconSize = 17

	return (
		<>
			<AiOutlineEdit
				className="text-muted"
				size={15}
				onClick={() => {
					setOpened(true)
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
				onClose={() => setOpened(false)}
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
								const file = input.target.files[0]
								form.setFieldValue('post_image', file)
								let path = input.target.value
								const name = path.split('\\')[path.split('\\').length - 1]
								setFileName((prev) => (prev = name))
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
				<TextInput
					className="mt-2"
					label="Name"
					value={form.values.name}
					variant="default"
					onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
				/>

				{/* USERNAME FIELD */}
				<TextInput
					icon={<At size={14} />}
					className="mt-2"
					label="Username"
					value={form.values.username}
					variant="default"
					onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
				/>

				{/* BIO FIELD */}
				<Textarea
					className="mt-2"
					variant="default"
					value={form.values.bio}
					label="Bio"
					onChange={(event) => form.setFieldValue('bio', event.currentTarget.value)}
				/>

				<div className="mt-4 mb-2 text-center">
					<Button
						style={{ width: '100%' }}
						variant="default"
						size="sm"
						onClick={() => {
							console.log(form.values)
						}}
					>
						Save
					</Button>
				</div>
			</Modal>
		</>
	)
}

export default EditProfileComponent
