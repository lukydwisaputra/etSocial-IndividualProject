import React, { useEffect, useState } from 'react'
import PostComponent from '../../components/post/PostComponent'
import MenubarComponent from '../../components/menubar/MenubarComponent'
import Head from 'next/head'
import { API_URL } from '../../helper/helper'

export default function HomePage(props) {
	// use selector untuk ambil reducer
	const printPost = () => {
		// conditional: jika reducer masih kosong maka pakainya props.post untuk mapnya
		// jika reducer sudah ada isinya, maka reducer yg di map
		return props.posts.map((val, idx) => {
			return (
				<div key={idx}>
					<PostComponent postDetails={props.posts[idx]} user={props.user} />
				</div>
			)
		})
	}

	useEffect(() => {
		printPost()
	}, [])

	return (
		<>
			<Head>
				<title>étSocial | Homé</title>
				<link rel="icon" />
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
			</Head>

			<MenubarComponent title={'Homé'} />
			<div className="container" style={{ marginBottom: '2.5vh' }}>
				{printPost()}
			</div>
		</>
	)
}

export async function getServerSideProps(context) {
	let token = context.req.cookies?.token
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
	
	if (dataUser.users.status === 'unverified') {
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
			posts: dataFeed.posts,
			user: dataUser.users,
		},
	}
}
