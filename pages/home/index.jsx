import React, { useEffect, useState, useId } from 'react'
import PostComponent from '../../components/post/PostComponent'
import MenubarComponent from '../../components/menubar/MenubarComponent'
import Head from 'next/head'
import { API_URL } from '../../helper/helper'
import { useSelector, useDispatch } from 'react-redux'
import { setPost, getAllPost } from '../../slices/postSlice'

export default function HomePage(props) {
	// HOOKS
	let post = useSelector(getAllPost)
	const dispatch = useDispatch()
	let id = useId()

	const renderedPost = () => {
		if (JSON.stringify(post) === '[]') {
			post = props.posts
		} 
		dispatch(setPost(post))

		return post.map((val, idx) => {
			return (
				<div key={`${id}post-${idx}`}>
					<PostComponent postIndex={idx} />
				</div>
			)
		})
	}

	return (
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
	)
}

export async function getServerSideProps(context) {
	let token = context.req?.cookies?.token
	if (!token) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	let users = await fetch(`${API_URL}/api/users/keep`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	let dataUser = await users.json()
	
	if (dataUser?.users?.status === 'unverified') {
		return {
			redirect: {
				destination: '/home/unverified',
				permanent: false,
			},
		}
	}
	
	let feeds = await fetch(`${API_URL}/api/posts/feeds`)
	let dataFeed = await feeds.json()
	return {
		props: {
			posts: dataFeed?.posts?.length > 0 ? dataFeed?.posts : []
		}
	}
}
