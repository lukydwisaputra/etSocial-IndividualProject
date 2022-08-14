import React from 'react'
import { createStyles, Text, ActionIcon } from '@mantine/core'
import { ToggleThemeComponent } from './ToggleThemeComponent'
import { useRouter } from 'next/router'
import { IoIosArrowBack } from 'react-icons/io'
import { getUser } from '../../slices/userSlice'
import { useSelector } from 'react-redux'

const UseStyles = createStyles((theme) => ({
	a: {
		color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
		':hover': {
			color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
		},
	},
}))

export default function HeaderComponent() {
	// HOOKS
	const { pathname } = useRouter()
	const { classes, theme } = UseStyles()
	const router = useRouter()
	const user = useSelector(getUser)

	// VAR
	const isHome = pathname.includes('home')
	let title = pathname.split('/').join('')
	const isLandingPage = pathname === '/' ? 'd-none' : ''

	switch (title) {
		case 'explore':
			title = 'Exploré'
			break
		case 'liked':
			title = 'Likéd'
			break
		case 'about':
			title = 'About'
			break
		case 'authentication':
			title = 'Authéntication'
			break
		case 'recovery':
			title = 'Récovery'
			break
		case 'profile':
			title = `@${user.username}`
			break
		default:
			title = ''
			break
	}

	return (
		<>
			{isHome ? (
				<header
					className="justify-content-between align-items-center fixed-top d-lg-none"
					style={{
						backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : 'white',
						padding: '1.25vh',
						borderBottom: '1 px solid gray',
					}}
				>
					<div className="container m-auto">
						<div className="row justify-content-between align-items-center">
							<div className="col-3 col-sm-3 col-md-3 col-lg-1">
								<Text href="/" className={`${classes.a} fs-3 m-auto`} style={{ fontWeight: '500' }}>
									étSocial
								</Text>
							</div>
							<div className={`col-6 col-sm-6 col-md-6 col-lg-7 m-auto`}></div>
							<div className="col-3 col-sm-3 col-md-3 col-lg-4">
								<div className="float-end">
									<ToggleThemeComponent />
								</div>
							</div>
						</div>
					</div>
				</header>
			) : (
				<header
					className="justify-content-between align-items-center fixed-top d-lg-none"
					style={{
						backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : 'white',
						padding: '1.5vh',
						borderBottom: '1 px solid gray',
						zIndex: '1',
					}}
				>
					<div className="container m-auto">
						<div className="row justify-content-between align-items-center">
							<div className="col-3 col-sm-3 col-md-3 col-lg-1">
								<ActionIcon className={isLandingPage} onClick={() => router.back()}>
									<IoIosArrowBack size={20} />
								</ActionIcon>
							</div>
							<div className={`col-6 col-sm-6 col-md-6 col-lg-7 m-auto`}>
								{/* <SearchComponent /> */}
								<Text href="/" className={`${classes.a} fs-6 m-auto text-center`} style={{ fontWeight: '600' }}>
									{title}
								</Text>
							</div>
							<div className="col-3 col-sm-3 col-md-3 col-lg-4">
								<div className="float-end">
									<ToggleThemeComponent />
								</div>
							</div>
						</div>
					</div>
				</header>
			)}
		</>
	)
}
