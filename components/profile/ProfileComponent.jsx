import React, { useState, useEffect } from 'react'
import {
	Avatar,
	Text,
	Paper,
	ActionIcon,
	useMantineTheme,
} from '@mantine/core'
import { useForm } from '@mantine/hooks'
import EditProfileComponent from './EditProfileComponent'
import Cookies from 'js-cookie'
import axios from 'axios'
import { API_URL } from '../../helper/helper'

export default function UserInfoAction() {
	// HOOKS
	const theme = useMantineTheme()
	const [value, setValue] = useState('')
	const [user, setUser] = useState({})

	// VAR
	const avatarBgColor = theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]

	const getUsers = async () => {
		let token = Cookies.get('token')
		let result = await axios.get(`${API_URL}/api/users/keep`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		setUser(result.data.users)
	}

	useEffect(() => {
		getUsers()
	}, [])

	const form = useForm({
		initialValues: {
			name: user.name,
			username: user.username,
			bio: user.bio,
		},
	})

	return (
		<Paper
			radius="md"
			withBorder
			p="lg"
			sx={(theme) => ({
				backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
			})}
		>
			{/* CRITERIA: Fullname, Bio, Username, Email, Profile Picture */}

			<div className="container">
				<div align="right">
					<ActionIcon variant="transparent">
						<EditProfileComponent form={form} users={user} />
					</ActionIcon>
				</div>
			</div>

			{/* PROFILE PICTURE */}
			<Avatar
				style={{
					border: '1px solid rgb(166,167,171, 0.3)',
					marginTop: '-2vh',
					border: '1px solid rgb(166,167,171, 0.3)',
					backgroundColor: avatarBgColor,
				}}
				src={user?.profile_picture}
				size={60}
				radius={100}
				mx="auto"
			/>

			{/* NAME & USERNAME */}
			<Text align="center" size="sm" weight={500} className="mt-4">
				{user?.name} • <span className="fw-light">@{user.username}</span>
			</Text>
			
			{/* EMAIL */}
			<Text align="center" color="dimmed" size="xs">
				{user?.email}
			</Text>
			
			{/* BIO */}
			<>
				<Text align="center" size="xs" weight={500} className="mt-2">
					Bio:
				</Text>
				<Text align="center" color="dimmed" size="xs">
					{user?.bio}
				</Text>
			</>
		</Paper>
	)
}
