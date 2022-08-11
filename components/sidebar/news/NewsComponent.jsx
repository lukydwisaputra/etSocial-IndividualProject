import React from 'react'
import { createStyles, Card, Text, Group } from '@mantine/core'
import Link from 'next/link'

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
	},

	title: {
		fontWeight: 600,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		lineHeight: 1.2,
		fontSize: '0.8rem',
	},

	body: {
		padding: theme.spacing.sm,
	},
}))

export function NewsComponent({ props }) {
	// HOOKS
	const { classes } = useStyles()
	
	// VAR
	let { author, category, media, title, url } = props

	return (
		<Card withBorder radius="sm" p={0} className={classes.card} shadow={'sm'}>
			<Group noWrap spacing={0}>

				<div className={classes.body}>
					<Text
						transform="uppercase"
						color="dimmed"
						weight={600}
						style={{ fontSize: '0.65rem' }}
					>
						{category}
					</Text>

					<Link href={url ? url : ""} passHref>
						<Text style={{cursor: 'pointer'}} className={` my-2 ${classes.title}`}>{title}</Text>
					</Link>

					<Group noWrap spacing="xs">
						<Text className="text-secondary" style={{ fontSize: '0.7rem' }}>
							{author} - published in {media}
						</Text>
					</Group>
				</div>

			</Group>
		</Card>
	)
}
