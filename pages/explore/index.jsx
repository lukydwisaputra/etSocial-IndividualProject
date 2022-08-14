import React from 'react'
import MenubarComponent from '../../components/menubar/MenubarComponent'
import axios from 'axios'
import { API_URL } from '../../helper/helper'

export default function ExplorePage(props) {
	const desktop = 'd-none d-sm-none d-md-none d-lg-block'
	return (
		<>
			<div className={desktop}>
				<MenubarComponent title={'Exploré'} />
			</div>
		</>
	)
}

export async function getServerSideProps(context) {
	try {
		let token = context.req?.cookies?.token
		if (!token) {
			return {
				redirect: {
					destination: '/authentication',
					permanent: false,
				},
			}
		}

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
