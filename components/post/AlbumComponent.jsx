import React from 'react'
import { createStyles, Paper } from '@mantine/core'
import { API_URL } from '../../helper/helper'
import Link from 'next/link'

const useStyles = createStyles((theme) => ({
	card: {
		height: 440,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		margin: 'auto',
	},

	title: {
		fontFamily: `Greycliff CF ${theme.fontFamily}`,
		fontWeight: 700,
		color: theme.white,
		lineHeight: 1.2,
		fontSize: 20,
		marginTop: theme.spacing.xs,
	},

	category: {
		color: theme.white,
		opacity: 0.7,
		fontWeight: 700,
		textTransform: 'uppercase',
	},
}))

// IMAGE AND URL
export default function AlbumComponent({ image, userPost }) {
	// HOOKS
	const { classes } = useStyles()

	// VAR
	const desktop = 'd-none d-sm-none d-md-block d-lg-block'
	const mobile = 'd-md-none d-lg-none'

	return (
		<>
			{/* DESKTOP LIKED ALBUM DISPLAY */}
			<Link href={`/post/${userPost?.id_post}/user/${userPost?.username}`} passHref>
				<Paper shadow="md" p="md" sx={{ cursor: 'pointer', backgroundImage: image ? `url(${API_URL}/${image})` : '', maxHeight: '17.5vh', maxWidth: '35vw' }} className={`${classes.card} ${desktop}`}></Paper>
			</Link>

			{/* MOBILE LIKED ALBUM DISPLAY */}
			<Link href={`/post/${userPost?.id_post}/user/${userPost?.username}`} passHref>
				<Paper shadow="md" p="md" sx={{ cursor: 'pointer', backgroundImage: image ? `url(${API_URL}/${image})` : '', maxHeight: '12.5vh', maxWidth: '35vw' }} className={`${classes.card} ${mobile}`}></Paper>
			</Link>
		</>
	)
}
