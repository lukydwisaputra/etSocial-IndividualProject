import React, { useEffect } from 'react'
import MenubarComponent from '../../../../../components/menubar/MenubarComponent'
import Head from 'next/head'
import { API_URL } from '../../../../../helper/helper'
import { useSelector, useDispatch } from 'react-redux'
import { setDetail, getDetail } from '../../../../../slices/detailSlice'
import axios from 'axios'
import PostDetailComponent from '../../../../../components/post/PostDetailComponent'
import MobilePostDetailComponent from '../../../../../components/post/MobilePostDetailComponent'

export default function PostPage(props) {
	// HOOKS
	const dispatch = useDispatch()
	let post = useSelector(getDetail)

	useEffect(() => {
		if (JSON.stringify(post) === '{}') {
			post = props?.posts
		}
		dispatch(setDetail(post))
	}, [])

	return (
		<>
			<Head>
				<title>étSocial | Homé</title>
				<link rel="icon" />
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
			</Head>

			<MenubarComponent title={'Post'} id={'top'} />
			{post ? (
				<>
					{/* <div
						className={`justify-content-center align-items-center d-flex`}
						style={{ minHeight: '85vh' }}
					>
						<div className="container">
							<MobilePostDetailComponent post={props.post} />
						</div>
					</div> */}
					<div className={`justify-content-center align-items-center p-3 d-none d-sm-none d-md-none d-lg-flex`} style={{ minHeight: '90vh' }}>
						<div className="container">
							<PostDetailComponent post={props.post} />
						</div>
					</div>
					<div className={`justify-content-center align-items-center d-flex d-sm-flex d-md-flex d-lg-none m-0 p-0`} style={{ minHeight: '100vh'}}>
						<div className="container">
							<MobilePostDetailComponent post={props.post} />
						</div>
					</div>
				</>
			) : (
				<></>
			)}
		</>
	)
}

export async function getServerSideProps(context) {
	let params = context.params
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
				Authorization: `Bearer ${token}`,
			},
		}),
		axios.get(`${API_URL}/api/posts/details?id_post=${params.id_post}&username=${params.username}`),
	])

	let dataUser = users?.data
	let dataFeed = feeds?.data

	return {
		props: {
			post: dataFeed.posts,
			user: dataUser.users,
		},
	}
}
