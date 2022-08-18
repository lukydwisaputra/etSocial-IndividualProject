import React, { useEffect } from 'react'
import MenubarComponent from '../../../../../components/menubar/MenubarComponent'
import Head from 'next/head'
import { API_URL } from '../../../../../helper/helper'
import { useSelector, useDispatch } from 'react-redux'
import { setDetail, getDetail } from '../../../../../slices/detailSlice'
import axios from 'axios'
import PostDetailComponent from '../../../../../components/post/PostDetailComponent'
import MobilePostDetailComponent from '../../../../../components/post/MobilePostDetailComponent'
import { useRouter } from 'next/router'

export default function PostPage(props) {
	// HOOKS
	const dispatch = useDispatch()
	let post = useSelector(getDetail)
	const { pathname } = useRouter()

	// VAR
	const HOST = 'http://127.0.0.1:3000'

	let currentUrl = HOST + pathname
	let quote = 'Check Out' + props?.post[0]?.username + "'s Post !"
	let title = 'étSocial | ' + props?.post[0]?.username + "'s Post"
	let image = API_URL + '/' + props?.post[0]?.post_image
	let description = props?.post[0]?.caption
	let hashtag = 'étSocial'

	useEffect(() => {
		if (JSON.stringify(post) === '{}') {
			post = props?.posts
		}
		dispatch(setDetail(post))
	}, [])

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta charset="utf-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="csrf_token" content="" />
				<meta property="type" content="website" />
				<meta property="url" content={currentUrl} />
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
				<meta name="msapplication-TileColor" content="#ffffff" />
				<meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
				<meta name="theme-color" content="rgb(26,27,30)" />
				<meta name="_token" content="" />
				<meta name="robots" content="noodp" />
				<meta property="title" content={title} />
				<meta property="quote" content={quote} />
				<meta name="description" content={description} />
				<meta property="image" content={image} />
				<meta property="og:locale" content="en_US" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={title} />
				<meta property="og:quote" content={quote} />
				<meta property="og:hashtag" content={hashtag} />
				<meta property="og:image" content={image} />
				<meta content="image/*" property="og:image:type" />
				<meta property="og:url" content={currentUrl} />
				<meta property="og:site_name" content="étSocial" />
				<meta property="og:description" content={description} />
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
					<div className={`justify-content-center align-items-center d-flex d-sm-flex d-md-flex d-lg-none m-0 p-0`} style={{ minHeight: '100vh' }}>
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
			user: dataUser.users
		},
	}
}
