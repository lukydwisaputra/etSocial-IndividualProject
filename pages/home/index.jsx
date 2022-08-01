import React from "react";
import PostComponent from "../../components/post/PostComponent";
import MenubarComponent from "../../components/menubar/MenubarComponent";
import Head from "next/head";

export default function HomePage() {
	const userId = localStorage.getItem('etSocial_user');
	console.log(userId)

	return (
		<>
			<Head>
				<title>étSocial | Homé</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
			</Head>
			
			<MenubarComponent title={"Homé"} />
			<div className="container">
				<PostComponent image="https://assets-global.website-files.com/625d2a5ca1316da92392fd13/627eb131b6ff711fc57fb2c7_coordinated-palette.jpg" />
				<PostComponent image="https://images.unsplash.com/photo-1658012324918-f8b3bcbe05b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80" />
				<PostComponent image="https://images.unsplash.com/photo-1657998623466-e8afbb692cac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" />
				<PostComponent image="https://images.unsplash.com/photo-1657664043009-c4975cb4eed3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" />
				<PostComponent image="https://images.unsplash.com/photo-1657995740874-0fbe84e232d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2OXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" />
			</div>

		</>
	);
}
