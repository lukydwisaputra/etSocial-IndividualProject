import { useState, useEffect } from 'react'
import { Text, Loader, Container, Title, Paper, Group, Autocomplete, Button, createStyles, Notification } from '@mantine/core'
import { useRouter } from 'next/router'
import axios from 'axios'
import { API_URL } from '../../helper/helper'
import { AiOutlineMail } from 'react-icons/ai'
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

export default function UnverifiedComponent() {
	// HOOKS
	const [uploading, setUploading] = useState(null)
	const [value, setValue] = useState('')
	const [resend, setResend] = useState(null)
	const router = useRouter()
	const { classes } = useStyles()

	// VAR
	const { token } = router.query
	const border = `1px solid rgb(166,167,171, 0.2)`
	const data = value.trim().length > 0 && !value.includes('@') ? ['gmail.com', 'outlook.com', 'yahoo.com'].map((provider) => `${value}@${provider}`) : []

	const sendVerification = (email, token) => {
		setTimeout(async () => {
			try {
				setUploading((prev) => (prev = true))
				let res = await axios.post(`${API_URL}/api/users/resend`, { email, token })

				if (await res.data?.success) {
					setResend((prev) => (prev = true))
					const in60Minutes = 1 / 24
					Cookies.set('token', res.data.token, { expires: in60Minutes })

					setTimeout(() => {
						setResend((prev) => (prev = null))
					}, 5000)

					setUploading((prev) => (prev = null))
				} else if ((await res.data?.success) === false) {
					setUploading((prev) => (prev = null))
					setResend((prev) => (prev = false))

					setTimeout(() => {
						setResend((prev) => (prev = null))
					}, 5000)
				}
			} catch (error) {
				console.log('error', error)
				setUploading((prev) => (prev = null))
				setResend((prev) => (prev = false))
			}
		}, 1000)
	}

	let notification
	if (resend) {
		notification = (
			<Notification size={15} icon={<IconCheck size={15} />} color="teal" title="VERIFICATION SENT" onClose={() => setResend((prev) => (prev = null))} className="mt-3">
				<small>Please check email to verify your account.</small>
			</Notification>
		)
	} else if (resend === false) {
		notification = (
			<Notification icon={<IconX size={15} />} color="red" title="VERIFICATION FAILED TO SENT" className="mt-3" onClose={() => setResend((prev) => (prev = null))}>
				<small>oops, something wrong happened!</small>
			</Notification>
		)
	}

	return (
		<div>
			{notification}
            <div className="d-flex justify-content-center align-items-center p-0" style={{ minHeight: '60vh' }}>
                <Container size={'sm'} my={30} style={{ maxWidth: '500px' }}>
                    <Title className="fs-4" align="center">
                        You&apos;re not verified yet 😟
                    </Title>
                    <Text className="mt-2" color="dimmed" size="sm" align="center" style={{ marginBottom: '5vh' }}>
                        Didn&apos;t receive a verification mail? or got a problem with previous verification link? fill the form below!
                    </Text>

                    <Paper shadow="xs" p={30} radius="md" mt="xl" style={{ border: border, minWidth: '350px' }}>
                        {/* EMAIL FIELD */}
                        <Autocomplete
                            required
                            icon={<AiOutlineMail size={14} />}
                            label="Email"
                            onChange={setValue}
                            placeholder="email"
                            data={data}
                            value={value}
                            error={value === '' ? '' : value.includes('@' && '.') ? '' : <small style={{ textAlign: 'center' }}>please check your email format</small>}
                        />
                        <Group mt="lg" className={classes.controls}>
                            <Button
                                size="xs"
                                variant="light"
                                color="gray"
                                type="submit"
                                className="d-flex"
                                onClick={() => {
                                    if (value !== '') {
                                        // setValue('')
                                        setUploading((prev) => (prev = true))
                                        sendVerification(value, token)
                                    }
                                }}
                            >
                                {uploading ? <Loader size={14} color="gray" /> : 'Send verification link'}
                            </Button>
                        </Group>
                    </Paper>
					<div className="mt-2">
						<Text className="mt- text-muted" size="sm" align="center" style={{ fontSize: '10px' }}>
							<span className="text-danger">*</span> Please use the latest verification link sent through your email.
						</Text>
					</div>
                </Container>
            </div>
		</div>
	)
}
