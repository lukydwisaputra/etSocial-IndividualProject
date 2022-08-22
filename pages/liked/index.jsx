import React, { useId, useEffect, useState } from 'react'
import AlbumComponent from '../../components/post/AlbumComponent'
import MenubarComponent from '../../components/menubar/MenubarComponent'
import Head from 'next/head'
import axios from 'axios'
import { API_URL } from '../../helper/helper'
import { Skeleton } from '@mantine/core'

export default function SavedPage(props) {
	// HOOKS
	const [likedPosts, setLikedPosts] = useState([])
	const [loading, setLoading] = useState(true)
	let id = useId()

	// VAR
	let contentClasses = 'col-4 p-1'

	const rederedUserPost = () => {
		return likedPosts.map((userPost, idx) => {
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
		setLikedPosts((prev) => (prev = props?.posts))
		setTimeout(() => {
			setLoading((prev) => (prev = false))
		}, 1000)
	}, [props?.posts])

	return (
		<>
			<Head>
				<title>étSocial | Likéd</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
			</Head>
			<MenubarComponent title={'Likéd'} />

			<div className="container">
				<div className="row">{rederedUserPost()}</div>
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

		let likes = await axios.get(`${API_URL}/api/likes?id_user=${dataUser?.users.id}`)
		let dataLikes = likes?.data

		let postsDetails = []
		const getDetailSerialized = async (likes) => {
			await likes?.reduce(async (acc, like) => {
				await acc // wait previous process

				let res = await axios.get(`${API_URL}/api/posts/details?id_post=${like.id_post}`)
				let post = await res?.data?.posts[0]

				postsDetails.push(post)
			}, Promise.resolve())
		}

		await getDetailSerialized(dataLikes?.likes)

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
				posts: postsDetails,
				users: dataUser?.users,
			},
		}
	} catch (error) {
		return {
			props: {},
		}
	}
}
