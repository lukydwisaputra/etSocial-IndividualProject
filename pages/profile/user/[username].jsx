import React, { useId, useEffect, useState } from 'react'
import ProfileComponent from '../../../components/profile/ProfileComponent'
import AlbumComponent from '../../../components/post/AlbumComponent'
import MenubarComponent from '../../../components/menubar/MenubarComponent'
import { API_URL } from '../../../helper/helper'
import axios from 'axios'
import { Skeleton } from '@mantine/core'

export default function ProfilePage(props) {
	// HOOKS
	const [userPosts, setUserPosts] = useState([])
	const [loading, setLoading] = useState(true)
	let id = useId()

	// VAR
	let contentClasses = 'col-4 p-1'

	const rederedUserPost = () => {
		return userPosts?.map((userPost, idx) => {
			return (
				<div key={id + idx} className={contentClasses}>
					<Skeleton visible={loading}>
						<AlbumComponent image={userPost?.post_image} userPost={userPost} />
					</Skeleton>
				</div>
			)
		})
	}

	useEffect(() => {
		setUserPosts((prev) => (prev = props?.posts))
		setTimeout(() => {
			setLoading((prev) => (prev = false))
		}, 1000)
	}, [props?.posts])

	return (
		<>
			<MenubarComponent title={`${props?.posts[0]?.username}'s profilé`} />
			<div className="container d-lg-none" style={{ marginBottom: '1vh' }}>
				<div className="row">
					<ProfileComponent />
				</div>
			</div>
			{props?.posts && (
				<div className="container" style={{ marginBottom: '1vh' }}>
					<div className="row">{rederedUserPost()}</div>
				</div>
			)}
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

		let feeds = await axios.get(`${API_URL}/api/posts/details?username=${context.params.username}`)
		let dataFeed = feeds?.data

		if (dataUser.users.status !== 'verified') {
			return {
				redirect: {
					destination: '/home',
					permanent: false,
				},
			}
		}

		return {
			props: {
				posts: dataFeed?.posts?.length > 0 ? dataFeed?.posts : [],
				users: dataUser?.users,
			},
		}
		
	} catch (error) {
		return {
			props: {},
		}
	}
}
