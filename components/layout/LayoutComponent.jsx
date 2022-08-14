import React, { useEffect } from 'react'
import styles from '../../styles/Home.module.css'
import HeaderComponent from '../../components/navbar/HeaderComponent'
import MobileNavbarComponent from '../../components/navbar/MobileNavbarComponent'
import LeftSidebarComponent from '../../components/sidebar/LeftSidebarComponent'
import RightSidebarComponent from '../../components/sidebar/RightSidebarComponent'
import { useRouter } from 'next/router'
import axios from 'axios'
import { API_URL, COOKIES_EXP } from '../../helper/helper'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { userLogin } from '../../slices/userSlice'

export default function LayoutComponent({ children }) {
	// HOOKS
	const { pathname } = useRouter()

	// VAR
	const dispatch = useDispatch()
	const border = '1px solid rgb(166,167,171, 0.2)'
	const isRegistrationPage = pathname.includes('/authentication') || pathname.includes('/recovery')

	const keepLogin = async () => {
		let token = Cookies.get('token')
		let result = await axios.get(`${API_URL}/api/users/keep`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (token && result.data?.success && result.data?.users?.status === 'verified') {
			dispatch(userLogin(result.data?.users))
			Cookies.set('token', result.data?.token, { expires: COOKIES_EXP })
		}
	}

	useEffect(() => {
		keepLogin()
	}, [])

	return (
		<div className={styles.container}>
			<HeaderComponent />
			<MobileNavbarComponent />

			{/* ---------- START MOBILE COMPONENT ---------- */}
			<main style={{ marginTop: '7.5vh', marginBottom: '7.5vh' }} className="d-lg-none">
				{/* content for mobile and tablet */}
				{children}
			</main>
			{/* ---------- END MOBILE COMPONENT ---------- */}

			{/* ---------- START DESKTOP COMPONENT ---------- */}
			<main>
				<div className="container d-none d-sm-none d-md-none d-lg-block">
					<div className="row">
						<div className="col-1" style={{ borderRight: border }}>
							<LeftSidebarComponent />
						</div>
						{isRegistrationPage && (
							<>
								<div
									className="col-6"
									style={{
										minHeight: '100vh',
										paddingTop: '7vh',
										paddingRight: '5vh',
										paddingLeft: '5vh',
									}}
								>
									{children} {/* content for desktop */}
								</div>
								<div className="col-4" style={{ borderLeft: border }}>
									<RightSidebarComponent />
								</div>
								<div className="col-1"></div>
							</>
						)}
						{!isRegistrationPage && (
							<>
								<div
									className="col-6"
									style={{
										minHeight: '100vh',
										paddingTop: '7vh',
										paddingRight: '5vh',
										paddingLeft: '5vh',
									}}
								>
									{children} {/* content for desktop */}
								</div>
								<div className="col-5" style={{ borderLeft: border }}>
									<RightSidebarComponent />
								</div>
							</>
						)}
					</div>
				</div>
			</main>
			{/* ---------- END DESKTOP COMPONENT ---------- */}
		</div>
	)
}
