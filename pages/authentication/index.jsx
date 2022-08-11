import React, { useState, useId } from 'react'
import { useForm, useToggle, upperFirst } from '@mantine/hooks'
import { AiOutlineMail, AiOutlineClose, AiOutlineCheck } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { PasswordComponent } from '../../components/form/PasswordComponent'
import { At } from 'tabler-icons-react'
import Link from 'next/link'
import MenubarComponent from '../../components/menubar/MenubarComponent'
import {
	TextInput,
	PasswordInput,
	Text,
	Paper,
	Group,
	Button,
	Anchor,
	useMantineTheme,
	Loader,
	Notification,
} from '@mantine/core'
import Head from 'next/head'
import axios from 'axios'
import { API_URL, COOKIES_EXP } from '../../helper/helper'
import { IconCheck, IconX } from '@tabler/icons'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { userLogin } from '../../slices/userSlice'

export default function AuthenticationForm({ data }) {
	// HOOKS
	const dispatch = useDispatch()
	const router = useRouter()
	const [type, toggle] = useToggle('login', ['login', 'register'])
	const theme = useMantineTheme()
	let id = useId()
	const [state, setState] = useState({
		isTakenEmail: null,
		isValidEmail: null,
		isTakenUsername: null,
		isMatchPassword: false,
		isStrengthPassword: false,
		isUploading: false,
		isSuccess: null,
		isCredentialsOk: null,
	})
	
	// VAR
	let {
		isTakenEmail,
		isValidEmail,
		isTakenUsername,
		isMatchPassword,
		isStrengthPassword,
		isUploading,
		isSuccess,
		isCredentialsOk,
	} = state
	let isNotError = !isTakenEmail && isValidEmail && !isTakenUsername && isMatchPassword && isStrengthPassword
	const btnColor = theme.colorScheme === 'dark' ? 'light' : 'dark'
	const border = `1px solid rgb(166,167,171, 0.2)`
	const form = useForm({
		initialValues: {
			// register
			username: '',
			email: '',
			password: '',
			secondPassword: '',
			// login
			userOrEmailLogin: '',
			passwordLogin: '',
		},

		validationRules: {
			email: (val) => /^\S+@\S+$/.test(val),
			password: (val) => val.length >= 8,
			userOrEmailLogin: (val) => /^\S+@\S+$/.test(val),
			secondPassword: (val) => val === form.values.password,
		},
	})
	const requirements = [
		{ re: /[0-9]/, label: 'Includes number' },
		{ re: /[A-Z]/, label: 'Includes uppercase letter' },
		{ re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
	]

	const onLogin = (formValues) => {
		try {
			let credentials = formValues.userOrEmailLogin
			let password = formValues.passwordLogin
			if (credentials && password) {
				setState((prev) => ({ ...prev, isUploading: true }))
				setTimeout(async() => {
					let result = await axios.post(`${API_URL}/api/users/login`, {
						credentials,
						password,
					})
	
					if (result.data?.success) {
						dispatch(userLogin(result.data.users))
						Cookies.set('token', result.data.token, { expires: COOKIES_EXP })

						setTimeout(() => {
							setState((prev) => ({ ...prev, isUploading: false }))
							setState((prev) => ({ ...prev, isCredentialsOk: true }))
							router.push('/home')
						}, 750)
						return
					} 

					setTimeout(() => {
						setState((prev) => ({ ...prev, isUploading: false }))
						setState((prev) => ({ ...prev, isCredentialsOk: false }))
					}, 1000)
					setTimeout(() => {
						setState((prev) => ({ ...prev, isUploading: false }))
						setState((prev) => ({ ...prev, isCredentialsOk: null }))
					}, 5000)

				}, 1000);
			}
		} catch (error) {
			console.log(error)
			setTimeout(() => {
				setState((prev) => ({ ...prev, isUploading: false }))
				setState((prev) => ({ ...prev, isCredentialsOk: false }))
			}, 1000)
			setTimeout(() => {
				setState((prev) => ({ ...prev, isUploading: false }))
				setState((prev) => ({ ...prev, isCredentialsOk: null }))
			}, 5000)
		}
	}

	const onRegister = async (formValues) => {
		let username = formValues.username
		let email = formValues.email
		let password = formValues.password
		let secondPassword = formValues.secondPassword

		if (username && email && password && isNotError && password === secondPassword) {
			try {
				setState((prev) => ({ ...prev, isUploading: true }))
				setTimeout(async () => {
					let result = await axios.post(`${API_URL}/api/users/register`, {
						username,
						email,
						password,
					})

					if (await result.data.success) {
						// activate notification
						setTimeout(() => {
							setState((prev) => ({ ...prev, isUploading: false }))
							setState((prev) => ({ ...prev, isSuccess: true }))
							form.reset()

							Cookies.set('token', result.data.token, { expires: COOKIES_EXP })
						}, 500)

						// hide notification
						setTimeout(() => {
							setState((prev) => ({ ...prev, isSuccess: null }))
						}, 5000)
					} else {
						// activate notification
						setTimeout(() => {
							setState((prev) => ({ ...prev, isUploading: false }))
							setState((prev) => ({ ...prev, isSuccess: false }))
						}, 500)

						// hide notification
						setTimeout(() => {
							setState((prev) => ({ ...prev, isSuccess: null }))
						}, 5000)
					}
				}, 1000)
			} catch (error) {
				console.log(error)
				setState((prev) => ({ ...prev, isUploading: false }))
				setState((prev) => ({ ...prev, isSuccess: false }))
			}
		}
	}

	const passwordComponentValue = (password) => {
		form.setFieldValue('password', password)

		if (password === form.values.secondPassword) {
			setState((prev) => ({ ...prev, isMatchPassword: true }))
		} else {
			setState((prev) => ({ ...prev, isMatchPassword: false }))
		}

		let multiplier = password.length >= 8 ? 0 : 1

		requirements.forEach((requirement) => {
			if (!requirement.re.test(password)) {
				multiplier += 1
			}
		})

		let strength = Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10)

		if (strength === 100) {
			setState((prev) => ({ ...prev, isStrengthPassword: true }))
		} else {
			setState((prev) => ({ ...prev, isStrengthPassword: false }))
		}
	}

	const resetNotification = () => {
		setState((prev) => ({ ...prev, isSuccess: null }))
		setState((prev) => ({ ...prev, isCredentialsOk: null }))
	}

	return (
		<>
			<Head>
				<title>étSocial | Authéntication</title>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1"
				></meta>
			</Head>

			<MenubarComponent title={'Authéntication'} />

			{isSuccess === true && isUploading === false && type === 'register' && (
				<Notification
					size={15}
					icon={<IconCheck size={15} />}
					color="teal"
					title="REGISTRATION SUCCESS"
					onClose={() => setState((prev) => ({ ...prev, isSuccess: null }))}
					className="mt-3"
				>
					<small>Please check email to verify your account.</small>
				</Notification>
			)}
			{isSuccess === false && isUploading === false && type === 'register' && (
				<Notification
					icon={<IconX size={15} />}
					color="red"
					title="REGISTRATION FAILED"
					className="mt-3"
					onClose={() => setState((prev) => ({ ...prev, isSuccess: null }))}
				>
					<small>oops, something wrong happened!</small>
				</Notification>
			)}
			{isCredentialsOk === false && isUploading === false &&
				form.values.userOrEmailLogin !== '' &&
				form.values.passwordLogin !== '' &&
				type === 'login' && (
				<Notification
					icon={<IconX size={15} />}
					color="red"
					title="LOGIN FAILED"
					className="mt-3"
					onClose={() => setState((prev) => ({ ...prev, isCredentialsOk: null }))}
				>
					<small>Your credentials did not match or not registered</small>
				</Notification>
			)}
			<div
				className={`d-flex justify-content-center align-items-center p-0`}
				style={{ minHeight: '75vh' }}
			>
				<div className="container" style={{ maxWidth: '600px' }}>
					<div>
						<Text weight={700} className="fs-4 mb-25 text-center">
							{type === 'login'
								? 'Welcome back to étSocial!'
								: 'Welcome to étSocial!'}
						</Text>
					</div>
					<div style={{ marginBottom: '2.5vh' }}>
						<Text className="mt-2 mb-4" color="dimmed" size="sm" align="center">
							{type === 'login'
								? 'Keep create, discover and connect with the global community'
								: 'Start create, discover and connect with the global community'}
						</Text>
					</div>

					<Paper radius="md" p="xl" shadow="sm" style={{ border: border }}>
						<Text size="sm" weight={700} className="mb-4 text-center">
							{type.toUpperCase() + ' FORM'}
						</Text>

						<form onSubmit={form.onSubmit(() => {})}>
							<Group direction="column" grow>
								{type === 'register' ? (
									<>
										<TextInput
											id={`username-${id}`}
											required
											icon={<At size={14} />}
											rightSection={
												form.values.username === '' ? (
													''
												) : !isTakenUsername &&
												  form.values.username !== '' ? (
													<AiOutlineCheck size={14} color={'teal'} />
												) : (
													<AiOutlineClose size={14} color={'red'} />
												)
											}
											placeholder="username"
											value={form.values.username.toLowerCase()}
											onChange={async (event) => {
												resetNotification()
												let username = event.currentTarget.value
												form.setFieldValue('username', username)

												setTimeout(async () => {
													try {
														let res = await axios.get(
															`${API_URL}/api/users?username=${username.toLowerCase()}`
														)
														if (res.data.success && username !== '') {
															setState((prev) => ({
																...prev,
																isTakenUsername: true,
															}))
														} else {
															setState((prev) => ({
																...prev,
																isTakenUsername: false,
															}))
														}
													} catch (error) {
														setState((prev) => ({
															...prev,
															isTakenUsername: false,
														}))
													}
												}, 500)
											}}
											error={
												form.values.username === ''
													? ''
													: isTakenUsername && (
															<div className="row">
																<small className="text-danger">
																	username has been taken
																</small>
															</div>
													  )
											}
										/>

										<TextInput
											id={`email-${id}`}
											required
											icon={<AiOutlineMail size={14} />}
											rightSection={
												form.values.email === '' ? (
													''
												) : !isTakenEmail &&
												  form.values.email !== '' &&
												  form.values.email.includes('@') &&
												  form.values.email.includes('.') ? (
													<AiOutlineCheck size={14} color={'teal'} />
												) : (
													<AiOutlineClose size={14} color={'red'} />
												)
											}
											placeholder="email"
											value={form.values.email}
											onChange={async (event) => {
												resetNotification()
												let email = event.currentTarget.value
												form.setFieldValue('email', email)
												setTimeout(async () => {
													try {
														let res = await axios.get(
															`${API_URL}/api/users?email=${email.toLowerCase()}`
														)

														if (res.data.success && email !== '') {
															setState((prev) => ({
																...prev,
																isTakenEmail: true,
															}))
														} else {
															setState((prev) => ({
																...prev,
																isTakenEmail: false,
															}))
														}
													} catch (error) {
														setState((prev) => ({
															...prev,
															isTakenEmail: false,
														}))
													}
												}, 500)

												if (
													email !== '' &&
													email.includes('@') &&
													email.includes('.')
												) {
													setState((prev) => ({
														...prev,
														isValidEmail: true,
													}))
												} else {
													setState((prev) => ({
														...prev,
														isValidEmail: false,
													}))
												}
											}}
											error={
												form.values.email !== '' &&
												isTakenEmail && (
													<div className="row">
														<small className="text-danger">
															email has been taken
														</small>
													</div>
												)
											}
										/>
										{!isValidEmail && form.values.email !== '' && (
											<div className="row">
												<small>
													<span className="text-danger">*</span> email
													must contains @ (at) and . (dot)
												</small>
											</div>
										)}

										<PasswordComponent
											getValue={passwordComponentValue}
											inputValue={form.values.password}
											resetNotification={resetNotification}
										/>

										{!isStrengthPassword && form.values.password !== '' && (
											<div className="row">
												<small>
													<span className="text-danger">*</span> please
													make your password stronger
												</small>
											</div>
										)}

										<PasswordInput
											id={`secondPassword-${id}`}
											icon={<RiLockPasswordLine size={14} />}
											required
											placeholder="repeat password"
											value={form.values.secondPassword}
											onChange={(event) => {
												resetNotification()
												let secondPassword = event.currentTarget.value
												form.setFieldValue('secondPassword', secondPassword)
												if (secondPassword === form.values.password) {
													setState((prev) => ({
														...prev,
														isMatchPassword: true,
													}))
												} else {
													setState((prev) => ({
														...prev,
														isMatchPassword: false,
													}))
												}
											}}
											error={
												!isMatchPassword &&
												form.values.secondPassword !== '' && (
													<small>password did not match</small>
												)
											}
										/>
									</>
								) : (
									<>
										<TextInput
											id={`userOrEmailLogin-${id}`}
											value={form.values.userOrEmailLogin}
											required
											icon={<At size={14} />}
											placeholder="username or email"
											onChange={(event) => {
												resetNotification()
												form.setFieldValue(
													'userOrEmailLogin',
													event.currentTarget.value
												)
											}}
										/>

										<PasswordInput
											id={`passwordLogin-${id}`}
											icon={<RiLockPasswordLine size={14} />}
											required
											placeholder="password"
											onChange={(event) => {
												form.setFieldValue(
													'passwordLogin',
													event.currentTarget.value
												)
												resetNotification()
											}}
										/>
										<Link href="/recovery" passHref>
											<Anchor
												className="text-muted"
												component="a"
												size="xs"
												style={{ textAlign: 'left', width: '40%' }}
											>
												Forgot password?
											</Anchor>
										</Link>
									</>
								)}
							</Group>

							<Group position="apart" mt="xl">
								<Anchor
									className="text-muted fw-bold"
									component="a"
									color={btnColor}
									onClick={() => {
										setState((prev) => ({ ...prev, isUploading: null }))
										setState((prev) => ({ ...prev, isCredentialsOk: null }))
										form.reset()
										toggle()
									}}
									size="xs"
								>
									{type === 'register'
										? 'Have an account? Login'
										: "Don't have an account? Register"}
								</Anchor>

								<Button
									size={'xs'}
									variant="light"
									color="gray"
									type="submit"
									disabled={isUploading}
									onClick={async () => {
										if (type === 'login') {
											onLogin(form.values)
										} else if (type === 'register') {
											if (isNotError) {
												onRegister(form.values)
											} else {
												setState((prev) => ({ ...prev, isSuccess: false }))
											}
										}
									}}
								>
									{isUploading ? (
										<Loader size={14} color="gray" />
									) : (
										upperFirst(type)
									)}
								</Button>
							</Group>
						</form>
					</Paper>
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps(context) {
	let token = context.req.cookies?.token

	let result = await axios.get(`${API_URL}/api/users/keep`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	if (result.data.success) {
		Cookies.set('token', result.data.token, { expires: COOKIES_EXP })
		return {
			redirect: {
				destination: '/home',
				permanent: false,
			},
		}
	}

	return {
		props: {},
	}
}
