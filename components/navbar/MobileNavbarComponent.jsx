import React from 'react'
import { createStyles, Avatar, Indicator, ActionIcon, Menu, Group } from '@mantine/core'
import { MdHomeFilled, MdSearch } from 'react-icons/md'
import { AiFillHeart } from 'react-icons/ai'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CreatePostComponent from '../post/CreatePostComponent'
import { useSelector } from 'react-redux'
import { API_URL } from '../../helper/helper'

const useStyles = createStyles((theme) => ({
	a: {
		color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
		':hover': {
			color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
		},
	},
}))

export default function MobileNavbarComponent() {
	// HOOKS
	const { classes, theme } = useStyles()
	const { pathname } = useRouter()
	const { status, profile_picture } = useSelector((state) => state.user)

	// VAR
	const mobile = 'd-lg-none'
	const avatarBgColor = theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
	const allowedPage = ['/home', '/explore', '/liked', '/profile', '/post/[id_post]/user/[username]']
	const isAllowed = allowedPage.includes(pathname)

	return (
		<>
			{isAllowed && (
				<nav
					className={`justify-content-between align-items-center fixed-bottom ${mobile}`}
					style={{
						backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : 'white',
						// height: "6vh",
						padding: '1.5vh',
						zIndex: '2',
					}}
				>
					<div className="container">
						<Group position="apart">
							{/* HOME ICON */}
							<Link href="/home" passHref>
								<ActionIcon component="button" style={classes.theme}>
									<MdHomeFilled size={25} />
								</ActionIcon>
							</Link>

							{/* EXPLORE ICON */}
							<Link href="/explore" passHref>
								<ActionIcon component="button" style={classes.theme}>
									<MdSearch size={25} />
								</ActionIcon>
							</Link>

							{/* CREATE A POST ICON */}
							<CreatePostComponent />

							{/* LIKED ICON */}
							<Link href="/liked" passHref>
								<ActionIcon component="button" style={classes.theme}>
									<AiFillHeart size={22} />
								</ActionIcon>
							</Link>

							{/* PROFILE */}
							{/* ------- START MENU -------- */}
							<Menu
								style={{ zIndex: '3' }}
								withArrow
								size={'xs'}
								control={
									<ActionIcon component="button" style={classes.theme}>
										<Indicator inline size={7} offset={2} position="bottom-end" color={status === 'verified' ? 'teal' : 'red'}>
											<Avatar
												src={profile_picture ? (profile_picture?.includes('http') ? profile_picture : `${API_URL}/${profile_picture}`) : ''}
												radius="xl"
												size={20}
												style={{
													border: '1px solid rgb(166,167,171, 0.3)',
													backgroundColor: avatarBgColor,
												}}
											/>
										</Indicator>
									</ActionIcon>
								}
							>
								{/* PROFILE */}
								<Menu.Item>
									<Link href="/profile" passHref>
										<p className="m-auto text-muted">Profile</p>
									</Link>
								</Menu.Item>

								{/* SIGN OUT */}
								<Menu.Item>
									<Link href="/" passHref>
										<p className="m-auto text-muted">Sign Out</p>
									</Link>
								</Menu.Item>
							</Menu>
							{/* ------- END MENU -------- */}
						</Group>
					</div>
				</nav>
			)}
		</>
	)
}
