import React, { useEffect, useState, useId } from 'react'
import PostComponent from '../../components/post/PostComponent'
import MenubarComponent from '../../components/menubar/MenubarComponent'
import Head from 'next/head'
import { API_URL } from '../../helper/helper'
import { useSelector, useDispatch } from 'react-redux'
import { setPost, getAllPost } from '../../slices/postSlice'
import UnverifiedComponent from '../../components/profile/UnverifiedComponent'
import axios from 'axios'

export default function HomePage(props) {
	// HOOKS
	const dispatch = useDispatch()
	let id = useId()
	let post = useSelector(getAllPost)

	const renderedPost = () => {
		return post.map((val, idx) => {
			return (
				<div key={`${id}post-${idx}`}>
					<PostComponent postIndex={idx} />
				</div>
			)
		})
	}

	useEffect(() => {
		if (JSON.stringify(post) === '[]') {
			post = props?.posts
		}
		dispatch(setPost(post))
	}, [])

	return (
		<>
			{props.users?.status !== 'verified' ? (
				<UnverifiedComponent />
			) : (
				<>
					<Head>
						<title>étSocial | Homé</title>
						<link rel="icon" />
						<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
					</Head>

					<MenubarComponent title={'Homé'} id={'top'} />
					<div className="container" style={{ marginBottom: '2.5vh' }}>
						{renderedPost()}
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
				Authorization: `Bearer ${token}`,
			},
		}),
		axios.get(`${API_URL}/api/posts/details`),
	])

	let dataUser = users?.data
	let dataFeed = feeds?.data

	console.log(dataUser?.users)

	return {
		props: {
			posts: dataFeed?.posts?.length > 0 ? dataFeed?.posts : [],
			users: dataUser?.users,
		},
	}
}
