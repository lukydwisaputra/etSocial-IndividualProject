import React from 'react'
import { createStyles, Paper, Text, Title, Button } from '@mantine/core'

const useStyles = createStyles((theme) => ({
	card: {
		height: 400,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		backgroundColor: 'rgb(26,27,30, 0.6)',
		backgroundBlendMode: 'multiply',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},

	title: {
		fontFamily: `Greycliff CF ${theme.fontFamily}`,
		fontWeight: 700,
		color: theme.white,
		lineHeight: 1.2,
		fontSize: '0.8rem',
		marginTop: theme.spacing.xs,
	},

	category: {
		color: theme.white,
		opacity: 0.7,
		fontWeight: 700,
		fontSize: '0.65rem',
		textTransform: 'uppercase',
	},
}))

export function ArticleComponent({ props }) {
	// HOOKS
	const { classes } = useStyles()

	// VAR
	let { category, image, title, url } = props

	return (
		<Paper shadow="sm" p="md" radius="md" sx={{ backgroundImage: `url(${image})`, maxHeight: '150px' }} className={classes.card}>
			<Text className={classes.category} size="xs">
				{category}
			</Text>

			<Title order={3} className={classes.title}>
				{title}
			</Title>
			
			<Button component="a" target="_blank" variant="light" color="dark" size="xs" href={url}>
				Read article
			</Button>
		</Paper>
	)
}
