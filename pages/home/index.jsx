import React, { useEffect, useState } from "react";
import PostComponent from "../../components/post/PostComponent";
import MenubarComponent from "../../components/menubar/MenubarComponent";
import Head from "next/head";
import { API_URL } from "../../helper/helper";
import axios from "axios";
import moment from "moment";

export default function HomePage(props) {
	// const {caption, created_at, id, id_user, psot_image} = props;

	// const test = async () => {
	// 	try {
	// 		let res = await axios.get(`${API_URL}/api/posts?id=1`)
	// 		console.log(res.data.posts)
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }



	return (
		<>
			<Head>
				<title>étSocial | Homé</title>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1"
				></meta>
			</Head>

			<MenubarComponent title={"Homé"} />
			<div className="container">
				<PostComponent props={props.posts[0]} />
				{/* <PostComponent images="https://images.unsplash.com/photo-1658012324918-f8b3bcbe05b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80" />
				<PostComponent images="https://images.unsplash.com/photo-1657998623466-e8afbb692cac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" />
				<PostComponent images="https://images.unsplash.com/photo-1657664043009-c4975cb4eed3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" />
				<PostComponent images="https://images.unsplash.com/photo-1657995740874-0fbe84e232d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2OXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" /> */}
			</div>
		</>
	);
}

export const getServerSideProps = async (context) => {
	try {
		// let { avatar, username, images, caption, comments, postingTime} = props;
		
		// console.log('Data Context Request', context);
		let _posts = await axios.get(`${API_URL}/api/posts?id=1`);
		let posts = _posts.data.posts;
		// let time = moment(posts[0].created_at).fromNow();
		// let time2 = moment(Date.now()).fromNow();
		// console.log(time);
		// console.log(time2);

		console.log(posts)
		return {
			props: {
				posts,
			},
		};
	} catch (error) {
		console.log(error);
		return error;
	}
};
