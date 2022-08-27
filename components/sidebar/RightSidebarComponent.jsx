import React, { useEffect, useState } from 'react'
import { Text, createStyles, Skeleton } from '@mantine/core'
import { useRouter } from 'next/router'
import { ArticleComponent } from './articles/ArticleComponent'
import { NewsComponent } from './news/NewsComponent'
import { BannerComponent } from './banner/BannerComponent'
import axios from 'axios'
import { API_URL } from '../../helper/helper'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../slices/userSlice'
import { getDetail } from '../../slices/detailSlice'
import ProfileComponent from '../profile/ProfileComponent'
import ScrollableCommentsDetail from '../post/ScrollableCommentsDetail'
import { resetDetail } from '../../slices/detailSlice'

const useStyles = createStyles((theme) => ({
	a: {
		color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
		':hover': {
			color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
		},
	},
}))

export default function RightSidebarComponent() {
	// HOOKS
	let user = useSelector(getUser)
	let postDetail = useSelector(getDetail)
	const [loading, setLoading] = useState(true)
	const [articles1, setArticles1] = useState({})
	const [news1, setNews1] = useState({})
	const [news2, setNews2] = useState({})
	const { theme } = useStyles()
	const { pathname, asPath } = useRouter()
	const router = useRouter()
	const dispatch = useDispatch()

	// VAR
	const allowedPage = ['/home', '/explore', '/liked']
	const isAllowed = allowedPage.includes(pathname)
	const border = '1px solid rgb(166,167,171, 0.2)'
	const isVerified = user?.status === 'verified'

	const getArticles = async () => {
		try {
			let result = await axios.get(`${API_URL}/api/articles`, {
				headers: {
					'Bypass-Tunnel-Reminder': 'ok'
				}
			})
			if (result.data.success) {
				let _articles = result.data.articles
				let _articles1 = _articles[Math.floor(Math.random() * _articles.length)]
				setArticles1(_articles1)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const getNews = async () => {
		try {
			let result = await axios.get(`${API_URL}/api/news`, {
				headers: {
					'Bypass-Tunnel-Reminder': 'ok'
				}
			})
			if (result.data.success) {
				let _news = result.data.news
				let _news1 = _news[Math.floor(Math.random() * _news.length)]
				let _news2 = _news[Math.floor(Math.random() * _news.length)]
				while (_news1.id === _news2.id) {
					_news2 = _news[Math.floor(Math.random() * _news.length)]
				}
				setNews1((prev) => (prev = _news1))
				setNews2((prev) => (prev = _news2))

				setTimeout(() => {
					setLoading((prev) => (prev = false))
				}, 1000)
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getArticles()
		getNews()

		setTimeout(() => {
			setLoading((prev) => (prev = false))
		}, 1000)
	}, [])

	let content
	if (JSON.stringify(postDetail) === '{}') {
		content = (
			<>
				{pathname === `/profile` && (
					<div
						className="sticky-top d-none d-sm-none d-md-none d-lg-block"
						style={{
							backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : 'white',
							zIndex: '5',
						}}
					>
						<div className="row" style={{ height: '6vh', borderBottom: border }}>
							<div className="col-12 m-auto">
								<div className="container">
									<Text className="fs-6 fw-bold ms-1"> @{user.username}</Text>
								</div>
							</div>
						</div>
						<div className="container" style={{ marginTop: '1vh', marginBottom: '1vh' }}>
							<div className="row mt-4">
								<ProfileComponent />
							</div>
						</div>
					</div>
				)}
				{isAllowed && (
					<div
						className="sticky-top d-none d-sm-none d-md-none d-lg-block"
						style={{
							backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : 'white',
							zIndex: '5',
						}}
					>
						{/* -------- START BANNER -------*/}
						<>
							<div className="row" style={{ height: '6vh', borderBottom: border }}>
								<div className="col-12 m-auto">
									<div className="container">
										<Text className="fs-6 fw-bold ms-1">What&apos;s new today?</Text>
									</div>
								</div>
							</div>
							<div className="row mt-4">
								<div className="col-12">
									<div className="container">
										<Skeleton visible={loading}>
											<BannerComponent />
										</Skeleton>
									</div>
								</div>
							</div>
						</>
						{/* -------- END BANNER ------- */}

						{!isVerified ? (
							''
						) : (
							<>
								{/* -------- START ARTICLE ------- */}
								<div className="row d-none d-sm-none d-md-none d-lg-block">
									<div className="col-12 m-auto">
										<div className="container">
											<Text className="fs-6 my-3 ms-1 fw-bold">Curated Articles</Text>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-12">
										<div className="container">
											<Skeleton visible={loading}>
												<ArticleComponent props={articles1} />
											</Skeleton>
										</div>
									</div>
								</div>
								{/* -------- END ARTICLE ------- */}
								{/* -------- START NEWS ------- */}
								<div className="row d-none d-sm-none d-md-none d-lg-block">
									<div className="col-12 m-auto">
										<div className="container">
											<Text className="fs-6 my-3 ms-1 fw-bold">Latest News</Text>
										</div>
									</div>
								</div>

								<div className="row d-none d-sm-none d-md-none d-lg-block">
									<div className="col-12">
										<div className="container">
											<Skeleton visible={loading}>
												<NewsComponent props={news1} />
											</Skeleton>
										</div>
									</div>
								</div>
								<div className="row my-3 d-none d-sm-none d-md-none d-lg-block">
									<div className="col-12">
										<div className="container">
											<Skeleton visible={loading}>
												<NewsComponent props={news2} />
											</Skeleton>
										</div>
									</div>
								</div>
								{/* -------- END NEWS ------- */}
							</>
						)}
					</div>
				)}
			</>
		)
	} else {
		if (pathname.includes('/post') && pathname.includes('/user')) {
			content = <ScrollableCommentsDetail />
		} else {
			content = <div></div>
		}
	}

	return <>{content}</>
}
