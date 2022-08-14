import React, { useState, useEffect } from 'react'
import { Avatar, Text, Paper, ActionIcon, useMantineTheme, Divider } from '@mantine/core'
import { useForm } from '@mantine/hooks'
import EditProfileComponent from './EditProfileComponent'
import { useSelector } from 'react-redux'
import { getUser } from '../../slices/userSlice'
import { API_URL } from '../../helper/helper'

export default function UserInfoAction() {
	// HOOKS
	const theme = useMantineTheme()
	const { username, email, name, bio, profile_picture } = useSelector(getUser)

	// VAR
	const avatarBgColor = theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]

	const form = useForm({
		initialValues: {
			profile_picture: '',
			name: name,
			username: username,
			bio: bio,
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
						<EditProfileComponent form={form} />
					</ActionIcon>
				</div>
			</div>

			{/* PROFILE PICTURE */}
			<Avatar
				priority={'true'}
				decoding={'true'}
				style={{
					marginTop: '-2vh',
					border: '1px solid rgb(166,167,171, 0.3)',
					backgroundColor: avatarBgColor,
				}}
				src={profile_picture ? (profile_picture?.includes('http') ? profile_picture : `${API_URL}/${profile_picture}`) : ''}
				size={60}
				radius={100}
				mx="auto"
			/>

			{/* NAME & USERNAME */}
			<Text align="center" size="sm" weight={500} className="mt-4 px-2 fw-bold">
				{name} <br />
			</Text>

			{/* EMAIL */}
			<Text className="mt-1" align="center" color="dimmed" size="xs">
				{email}
			</Text>

			{/* BIO */}
			<>
				<div className="container">
					<Divider className="my-3" size={'xs'} my="xs" variant="dashed" color={theme.colorScheme === 'dark' ? 'rgb(255,255,255,0.2)' : theme.colors.gray[2]} />
					<Text className="px-5" align="center" color="" size="xs">
						{bio}
					</Text>
				</div>
			</>
		</Paper>
	)
}
