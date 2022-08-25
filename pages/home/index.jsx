import React, { useEffect, useState, useId } from 'react'
import PostComponent from '../../components/post/PostComponent'
import MenubarComponent from '../../components/menubar/MenubarComponent'
import Head from 'next/head'
import { API_URL } from '../../helper/helper'
import { useSelector, useDispatch } from 'react-redux'
import { setPost, getAllPost } from '../../slices/postSlice'
import UnverifiedComponent from '../../components/profile/UnverifiedComponent'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Loader } from '@mantine/core'

const initialPostAmount = 2

export default function HomePage(props) {
	// HOOKS
	const dispatch = useDispatch()
	let id = useId()
	let post = useSelector(getAllPost)
	const [offset, setOffset] = useState(initialPostAmount)
	const [hasMore, setHasMore] = useState(true)
	const [loading, setLoading] = useState(false)

	const dispatchPost = () => {
		if (JSON.stringify(post) === '[]') {
			post = props?.posts
		}
		dispatch(setPost(post))
	}

	useEffect(() => {
		dispatchPost()
	})

	const totalPosts = async () => {
		try {
			let res = await axios.get(`${API_URL}/api/posts/count`, {
				headers: {
					'Bypass-Tunnel-Reminder': 'ok'
				}
			})
			if (!res.data.success) {
				return
			}
			return res.data?.totalPost
		} catch (error) {
			console.log(error)
			return
		}
	}

	const fetchMoreData = async () => {
		const totalPost = await totalPosts()
		if (post.length >= totalPost) {
			setHasMore((prev) => (prev = false))
			return
		}

		try {
			if (post.length + initialPostAmount !== offset && !loading) {
				setLoading((prev) => (prev = true))
				setTimeout(async () => {
					setOffset((prev) => (prev = post.length))
					let res = await axios.get(`${API_URL}/api/posts?limit=${initialPostAmount}&offset=${post.length}`, {
						headers: {
							'Bypass-Tunnel-Reminder': 'ok'
						}
					})
					let newPosts = res.data?.posts
					dispatch(setPost([...post, ...newPosts]))
				}, 1500)

				setTimeout(() => {
					setLoading((prev) => (prev = false))
				}, 3000)
			}
		} catch (error) {
			console.log(error)
			setLoading((prev) => (prev = false))
		}
	}

	const renderedPost = () => {
		return post.map((val, idx) => {
			return (
				<div key={`${id}post-${idx}`}>
					<PostComponent postIndex={idx} />
				</div>
			)
		})
	}

	const loader = loading && (
		<div className="container">
			<div className="text-center mt-3">
				<Loader color={'gray'} size={'xs'} />
			</div>
		</div>
	)

	return (
		<>
			{props.users?.status !== 'verified' ? (
				<UnverifiedComponent />
			) : (
				<>
					<Head>
						<title>étSocial | Homé</title>
						<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
					</Head>

					<MenubarComponent title={'Homé'} id={'top'} />
					<div className="container" style={{ marginBottom: '2.5vh' }}>
						<InfiniteScroll style={{ overfowX: 'hidden' }} scrollThreshold={'100%'} dataLength={async () => await totalPosts()} next={!loading && fetchMoreData} hasMore={hasMore}></InfiniteScroll>
						{renderedPost()}
						{loader}
					</div>
				</>
			)}
		</>
	)
}

export async function getServerSideProps(context) {
	let token = context.req?.cookies?.token
	if (!token) {
		return {
			redirect: {
				destination: '/authentication',
				permanent: false,
			},
		}
	}

	let [users, feeds] = await Promise.all([
		axios.get(`${API_URL}/api/users/keep`, {
			headers: {
				'Authorization': `Bearer ${token}`,
				'Bypass-Tunnel-Reminder': 'ok'
			},
		}),
		axios.get(`${API_URL}/api/posts?limit=${initialPostAmount}&offset=0`, {
			headers: {
				'Bypass-Tunnel-Reminder': 'ok'
			}
		}),
	])

	let dataUser = users?.data
	let dataFeed = feeds?.data

	return {
		props: {
			posts: dataFeed?.posts?.length > 0 ? dataFeed?.posts : [],
			users: dataUser?.users,
		},
	}
}
