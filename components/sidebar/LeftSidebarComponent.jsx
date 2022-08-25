import React, { useEffect, useState } from 'react'
import { createStyles, Avatar, Indicator, ActionIcon, Tooltip, Text, Menu } from '@mantine/core'
import { MdHomeFilled, MdSearch } from 'react-icons/md'
import { AiFillHeart } from 'react-icons/ai'
import Link from 'next/link'
import { ToggleThemeComponent } from '../navbar/ToggleThemeComponent'
import { useRouter } from 'next/router'
import CreatePostComponent from '../post/CreatePostComponent'
import Cookies from 'js-cookie'
import { API_URL } from '../../helper/helper'
import { useSelector } from 'react-redux'
import { getUser } from '../../slices/userSlice'

const useStyles = createStyles((theme) => ({
	a: {
		color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
		':hover': {
			color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
		},
	},
}))

export default function LeftSidebarComponent() {
	// HOOKS
	const router = useRouter()
	const { classes, theme } = useStyles()
	const { pathname } = useRouter()
	const { status, profile_picture } = useSelector(getUser)
	const user = useSelector(getUser)
	const token = Cookies.get('token')

	// VAR
	const buttonStyle = 'col-2'
	const rowStyle = 'row mt-4'
	const avatarBgColor = theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
	const border = `1px solid ${theme.colorScheme === 'dark' ? 'white' : theme.colors.gray[2]}`
	const allowedPage = ['/home', '/explore', '/liked', '/profile/user/[username]', '/about', '/post/[id_post]/user/[username]']
	const iconSize = 17
	const isAllowed = allowedPage.includes(pathname)

	// -------- START ICONS --------
	// LOGO
	const logoIcon = (
		<div className={rowStyle}>
			<Text className="fs-3" style={{ fontWeight: '500' }} onClick={() => router.push('/about')}>
				ét
			</Text>
		</div>
	)

	// HOME
	const homeIcon = (
		<div className={rowStyle}>
			<Tooltip position="right" withArrow transition="pop" label="Homé" size="xs">
				<Link href="/home" passHref>
					<ActionIcon className={buttonStyle} style={classes.theme}>
						<MdHomeFilled className="" size={iconSize} />
					</ActionIcon>
				</Link>
			</Tooltip>
		</div>
	)

	// EXPLORE
	const exploreIcon = (
		<div className={rowStyle}>
			<Tooltip position="right" withArrow transition="pop" label="Exploré" size="xs">
				<Link href="/explore" passHref>
					<ActionIcon className={buttonStyle} style={classes.theme}>
						<MdSearch size={iconSize} />
					</ActionIcon>
				</Link>
			</Tooltip>
		</div>
	)

	// LIKED
	const likeIcon = (
		<div className={rowStyle}>
			<Tooltip position="right" withArrow transition="pop" label="Likéd" size="xs">
				<Link href="/liked" passHref>
					<ActionIcon className={buttonStyle} style={classes.theme}>
						<AiFillHeart size={iconSize - 2} />
					</ActionIcon>
				</Link>
			</Tooltip>
		</div>
	)

	// THEME
	const themeIcon = (
		<div className={rowStyle}>
			<Tooltip position="right" withArrow transition="pop" label="Try mé!" size="xs">
				<ToggleThemeComponent />
			</Tooltip>
		</div>
	)

	// NEW POST
	const newPostIcon = (
		<div className={rowStyle}>
			<CreatePostComponent />
		</div>
	)

	// PROFILE
	const profileIcon = (
		<div className={rowStyle}>
			<Menu
				withArrow
				size={'xs'}
				control={
					<Tooltip position="right" withArrow transition="pop" label="Profilé" size="xs">
						<ActionIcon className={buttonStyle} style={classes.theme}>
							<Indicator inline size={5} offset={-7.5} position="bottom-center" color={status === 'verified' ? 'teal' : 'red'}>
								<Avatar
									src={`${API_URL}/${profile_picture}`}
									// src={profile_picture ? (profile_picture?.includes('http') ? profile_picture : `${API_URL}/${profile_picture}`) : ''}
									radius={100}
									size={25}
									style={{
										border: '1px solid rgb(166,167,171, 0.3)',
										backgroundColor: avatarBgColor,
										objectFit: 'cover',
									}}
								/>
							</Indicator>
						</ActionIcon>
					</Tooltip>
				}
			>
				<Menu.Item onClick={() => router.push(`/profile/user/${user?.username}`)}>
					<p className="m-auto text-muted">Profilé</p>
				</Menu.Item>

				<Menu.Item
					onClick={() => {
						router.push('/')
						Cookies.remove('token')
						Cookies.remove('etSocial_ui_theme')
					}}
				>
					<p className="m-auto text-muted">Sign Out</p>
				</Menu.Item>
			</Menu>
		</div>
	)
	// -------- END ICONS --------

	// DEVIDER
	const devider = <hr className="mt-4" style={{ borderBottom: 'none', borderTop: border }} />

	return (
		<nav style={{ zIndex: '5', marginTop: '6vh' }}>
			{isAllowed && user.status === 'verified' && token ? (
				// ------- START MAIN PAGE --------
				<>
					<div style={{ position: 'fixed' }}>
						<hr className="mb-4" style={{ borderBottom: 'none', borderTop: border, marginTop: 0 }} />
						{logoIcon}
						{devider}
						{homeIcon}
						{exploreIcon}
						{likeIcon}
						{themeIcon}
						{devider}
						{newPostIcon}
					</div>
					<div style={{ position: 'fixed', bottom: '2.5%' }}>{profileIcon}</div>
				</>
			) : (
				// ------- END MAIN PAGE --------
				// ------- START LANDING PAGE --------
				<div style={{ position: 'fixed' }}>
					<hr className="mb-4" style={{ borderBottom: 'none', borderTop: border, marginTop: 0 }} />
					{/* Logo */}
					{logoIcon}
					{devider}
					{themeIcon}
					{/* {user ? Cookies.get('token') && <div style={{ position: 'fixed', bottom: '2.5%' }}>{profileIcon}</div> : ''} */}
				</div>
				// ------- END LANDING PAGE --------
			)}
		</nav>
	)
}
