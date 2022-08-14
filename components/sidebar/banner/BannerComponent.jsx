import React from 'react'
import { createStyles, Paper, Text } from '@mantine/core'
import { useSelector } from 'react-redux'

const useStyles = createStyles((theme) => ({
	card: {
		position: 'relative',
		overflow: 'hidden',
		padding: theme.spacing.xs,
		paddingLeft: theme.spacing.md * 2,

		'&::before': {
			content: '""',
			position: 'absolute',
			top: 0,
			bottom: 0,
			left: 0,
			width: 6,
			backgroundImage: theme.fn.linearGradient(50, 'aqua', 'teal'),
		},
	},
}))

export function BannerComponent() {
	// HOOKS
	const { classes } = useStyles()

	// VAR
	const username = useSelector((state) => state.user.username)

	return (
		<Paper withBorder radius="md" className={`ms-1 ${classes.card}`} shadow={'sm'}>
			<Text size="sm" weight={600}>
				Howdy, {username}!
			</Text>
			<Text size="xs" mt="xs" color="dimmed">
				Welcome to <span className="fw-bold"> étSocial </span> | Have a good time 🤞🏼
			</Text>
		</Paper>
	)
}
