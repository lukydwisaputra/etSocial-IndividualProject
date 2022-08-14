import React from 'react'
import { createStyles, Text, Title, Button, Card } from '@mantine/core'

const useStyles = createStyles((theme) => ({
	card: {
		height: 400,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		backgroundColor: 'rgb(26,27,30, 0.5)',
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
		// marginTop: theme.spacing.xs,
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
		<Card shadow="sm" p="md" radius="md" sx={{ backgroundImage: image ? `url(${image})` : '', maxHeight: '150px' }} className={classes.card}>
			<div>
				<Text className={classes.category} size="xs">
					{category}
				</Text>
				<Title order={3} className={`${classes.title} mt-2`}>
					{title}
				</Title>
			</div>

			<Button href={url} target="_blank" component="button" variant="light" color="dark" size="xs">
				Read article
			</Button>
		</Card>
	)
}
