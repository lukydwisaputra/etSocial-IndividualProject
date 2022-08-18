import React, { useState, useId, useEffect } from 'react'
import { useForm } from '@mantine/hooks'
import { RiLockPasswordLine } from 'react-icons/ri'
import { PasswordComponent } from '../../../components/form/PasswordComponent'
import MenubarComponent from '../../../components/menubar/MenubarComponent'
import { PasswordInput, Text, Paper, Group, Button, useMantineTheme, Loader, Notification } from '@mantine/core'
import Head from 'next/head'
import axios from 'axios'
import { API_URL } from '../../../helper/helper'
import { IconCheck, IconX } from '@tabler/icons'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

export default function AuthenticationForm(props) {
	// HOOKS
	const router = useRouter()
	const theme = useMantineTheme()
	let id = useId()
	const [state, setState] = useState({
		isMatchPassword: false,
		isStrengthPassword: false,
		isUploading: false,
		isSuccess: null,
	})
	const [isInvalid, setIsInvalid] = useState(props.invalidated)

	// VAR
	let { isMatchPassword, isStrengthPassword, isUploading, isSuccess } = state

	let isNotError = isMatchPassword && isStrengthPassword
	const border = `1px solid rgb(166,167,171, 0.2)`
	const form = useForm({
		initialValues: {
			password: '',
			secondPassword: '',
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

	useEffect(() => {
		if (isSuccess !== null) {
			setTimeout(() => {
				setState((prev) => ({ ...prev, isSuccess: null }))
			}, 5000)
		}
	})

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

	let invalidatedNotif
	if (isInvalid) {
		invalidatedNotif = (
			<Notification icon={<IconX size={15} />} color="red" title="Please make a new reset password request!" className="mt-3" onClose={() => setResend((prev) => (prev = null))}>
				<small>Invalid URL!</small>
			</Notification>
		)
		setTimeout(() => {
			router.push('/recovery')
		}, 3500)
		setTimeout(() => {
			setIsInvalid((prev) => (prev = false))
		}, 5000)
	}

	let notification
	if (isSuccess === true) {
		notification = (
			<Notification size={15} icon={<IconCheck size={15} />} color="teal" title="PASSWORD RECOVERY SUCCESS!" onClose={() => setResend((prev) => (prev = null))} className="mt-3">
				<small>Please wait until the login form appear!</small>
			</Notification>
		)
	} else if (isSuccess === false) {
		notification = (
			<Notification icon={<IconX size={15} />} color="red" title="PASSWORD RECOVERY FAILED!" className="mt-3" onClose={() => setResend((prev) => (prev = null))}>
				<small>oops, something wrong happened!</small>
			</Notification>
		)
	}

	const handleResetPassword = async () => {
		if (isNotError) {
			try {
				console.log(router.params)
				setState((prev) => ({
					...prev,
					isUploading: true,
				}))
				setTimeout(async () => {
					let res = await axios.patch(
						`${API_URL}/api/users/reset/password`,
						{ password: form.values.password },
						{
							headers: {
								Authorization: `Bearer ${router.query?.token}`,
							},
						}
					)

					if (res.data?.success) {
						setTimeout(() => {
							setState((prev) => ({
								...prev,
								isSuccess: true,
							}))
							setState((prev) => ({
								...prev,
								isUploading: false,
							}))
							form.reset()
						}, 1500)

						setTimeout(() => {
							Cookies.remove('token')
							router.push('/authentication')
						}, 5000)
					} else {
						setTimeout(() => {
							setState((prev) => ({
								...prev,
								isSuccess: false,
							}))
							setState((prev) => ({
								...prev,
								isUploading: false,
							}))
						}, 1500)
					}
				}, 1000)
			} catch (error) {
				console.log(error)
				setTimeout(() => {
					setState((prev) => ({
						...prev,
						isSuccess: false,
					}))
					setState((prev) => ({
						...prev,
						isUploading: false,
					}))
				}, 1500)
			}
		}
	}

	return (
		<>
			<Head>
				<title>étSocial | Réset Password</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
			</Head>

			<MenubarComponent title={'Réset Password'} />

			{notification}
			{invalidatedNotif}
			{
				!isInvalid && 
				<div className={`d-flex justify-content-center align-items-center p-0`} style={{ minHeight: '75vh' }}>
					<div className="container" style={{ maxWidth: '600px' }}>
						<div>
							<Text weight={700} className="fs-4 mb-25 text-center">
								Password Recovery
							</Text>
						</div>
						<div style={{ marginBottom: '2.5vh' }}>
							<Text className="mt-2 mb-4" color="dimmed" size="sm" align="center">
								Fill form below to reset your password.
							</Text>
						</div>

						<Paper radius="md" p="xl" shadow="sm" style={{ border: border }}>
							<Text size="sm" weight={700} className="mb-4 text-center">
								Reset Password Form
							</Text>

							<form onSubmit={form.onSubmit(() => {})}>
								<Group direction="column" grow>
									<PasswordComponent getValue={passwordComponentValue} inputValue={form.values.password} resetNotification={resetNotification} id={id} />

									{!isStrengthPassword && form.values.password !== '' && (
										<div className="row">
											<small>
												<span className="text-danger">*</span> please make your password stronger
											</small>
										</div>
									)}

									<PasswordInput
										id={`repeat-recovery-${id}`}
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
										error={!isMatchPassword && form.values.secondPassword !== '' && <small>password did not match</small>}
									/>
								</Group>

								<Group position="apart" mt="xl">
									<Button
										size={'xs'}
										variant="light"
										color="gray"
										type="submit"
										disabled={isUploading}
										onClick={async () => {
											handleResetPassword()
										}}
									>
										{isUploading ? <Loader size={14} color="gray" /> : 'Reset Password'}
									</Button>
								</Group>
							</form>
						</Paper>
					</div>
				</div>
			}

		</>
	)
}

export async function getServerSideProps(context) {
	let token = context?.req?.cookies?.token
	let params = context.params?.token

	if (token !== params || !token || !params) {
		return {
			props: {
				invalidated: true,
			},
		}
	}

	return {
		props: {},
	}
}
