import React, { useState, useEffect } from 'react'
import { createStyles, Paper, Title, Text, Loader, Button, Container, Group, Autocomplete, Notification } from '@mantine/core'
import { AiOutlineMail } from 'react-icons/ai'
import MenubarComponent from '../../components/menubar/MenubarComponent'
import Head from 'next/head'
import axios from 'axios'
import { API_URL, COOKIES_EXP } from '../../helper/helper'
import { IconCheck, IconX } from '@tabler/icons'
import Cookies from 'js-cookie'

const useStyles = createStyles((theme) => ({
	controls: {
		[theme.fn.smallerThan('xs')]: {
			flexDirection: 'column-reverse',
		},
	},

	control: {
		[theme.fn.smallerThan('xs')]: {
			width: '100%',
			textAlign: 'center',
		},
	},
}))

export default function ForgotPassword(props) {
	// HOOKS
	const { classes } = useStyles()
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(null)

	// VAR
	const border = `1px solid rgb(166,167,171, 0.2)`
	const data = email.trim().length > 0 && !email.includes('@') ? ['gmail.com', 'outlook.com', 'yahoo.com'].map((provider) => `${email}@${provider}`) : []
	// console.log(value);

	const handleSendMail = () => {
		try {
			setLoading((prev) => (prev = true))
			setTimeout(async () => {
				let res = await axios.post(`${API_URL}/api/users/recovery`, { email })
				if (res.data?.success) {
					setTimeout(() => {
						setLoading((prev) => (prev = false))
						setSuccess((prev) => (prev = true))
						Cookies.set('token', res.data?.token, { expires: COOKIES_EXP })
					}, 1500)
				} else {
					setTimeout(() => {
						setLoading((prev) => (prev = false))
						setSuccess((prev) => (prev = false))
					}, 1500)
				}
			}, 1000)
		} catch (error) {
			console.log(error)
			setTimeout(() => {
				setLoading((prev) => (prev = false))
				setSuccess((prev) => (prev = false))
			}, 1500)
		}
	}

	useEffect(() => {
		if (success !== null) {
			setTimeout(() => {
				setSuccess((prev) => (prev = null))
			}, 5000)
		}
	})

	let notification
	if (success === true) {
		notification = (
			<Notification size={15} icon={<IconCheck size={15} />} color="teal" title="RECOVERY MAIL SENT!" onClose={() => setResend((prev) => (prev = null))} className="mt-3">
				<small>Please check email to recover your password.</small>
			</Notification>
		)
	} else if (success === false) {
		notification = (
			<Notification icon={<IconX size={15} />} color="red" title="FAILED TO SENT RECOVERY EMAIL!" className="mt-3" onClose={() => setResend((prev) => (prev = null))}>
				<small>oops, something wrong happened!</small>
			</Notification>
		)
	}

	return (
		<>
			<Head>
				<title>étSocial | Récovery</title>
				{/* <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" /> */}
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
			</Head>
			<MenubarComponent title={'Récovery'} />

			{notification}
			<div className="d-flex justify-content-center align-items-center p-0" style={{ minHeight: '70vh' }}>
				<Container size={'sm'} my={30} style={{ maxWidth: '500px' }}>
					<Title className="fs-4" align="center">
						Oops..
					</Title>
					<Title className="fs-4" align="center">
						Forgot your password?
					</Title>
					<Text className="mt-2" color="dimmed" size="sm" align="center" style={{ marginBottom: '5vh' }}>
						Don&apos;t worry, just type your email and get a recovery link
					</Text>

					<Paper shadow="xs" p={30} radius="md" mt="xl" style={{ border: border }}>
						<Autocomplete
							required
							icon={<AiOutlineMail size={14} />}
							label="Email"
							onChange={setEmail}
							placeholder="email"
							data={data}
							error={email === '' ? '' : email.includes('@' && '.') ? '' : <small style={{ textAlign: 'center' }}>please check your email format</small>}
						/>
						<Group mt="lg" className={classes.controls}>
							<Button
								size="xs"
								variant="light"
								color="gray"
								type="submit"
								className="d-flex"
								onClick={() => {
									handleSendMail()
								}}
							>
								{loading ? <Loader size={14} color="gray" /> : 'Send recovery link'}
							</Button>
						</Group>
					</Paper>
				</Container>
			</div>
		</>
	)
}

export async function getServerSideProps(context) {
	try {
		let token = context.req?.cookies?.token

		let users = await axios.get(`${API_URL}/api/users/keep`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		let dataUser = users?.data

		if (dataUser.users.status !== 'verified') {
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
	} catch (error) {
		return {
			props: {},
		}
	}
}
