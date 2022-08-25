import React, { useEffect, useState } from 'react'
import { Card, Image, Text, Group, useMantineTheme, Avatar, Spoiler, Skeleton } from '@mantine/core'
import { API_URL, HOST, SHARE_API_URL } from '../../../helper/helper'
import moment from 'moment'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setDetail, getDetail } from '../../../slices/detailSlice'
import { useRouter } from 'next/router'
import MenubarComponent from '../../../components/menubar/MenubarComponent'
import Head from 'next/head'

export default function PostDetailComponent({ post }) {
	// HOOKS
	let postDetail = useSelector(getDetail)
	const [loading, setLoading] = useState(true)
	const theme = useMantineTheme()
	const dispatch = useDispatch()
	const router = useRouter()

	useEffect(() => {
		dispatch(setDetail({ ...post[0], viewAll: true }))
	}, [])

	// VAR
	const spoilerLimit = 50
	const avatarBgColor = theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
	const secondaryColor = theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]
	let username = post[0].username
	let currentUrl = `${HOST}/post/${post[0]?.id_post}`
	let quote = 'Check out ' + username + "'s post!"
	let title = 'étSocial'
	let image = SHARE_API_URL + '/' + post[0]?.post_image
	let description = post[0]?.caption
	let hashtag = 'étSocial'

	console.log({ currentUrl, quote, title, image, description, hashtag })
	console.log(postDetail)

	useEffect(() => {
		if (loading) {
			setTimeout(() => {
				setLoading((prev) => (prev = false))
			}, 1000)
		}
	}, [])

	return (
		<>
			<Head>
				{/* PRIMARY */}
				<title>étSocial</title>
				<meta name="description" content={description} />

				{/* FACEBOOK */}
				<meta property="og:url" content={currentUrl} />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:image" content={image} />

				{/* TWITTER */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content={currentUrl} />
				<meta property="twitter:title" content={title} />
				<meta property="twitter:description" content={description} />
				<meta property="twitter:image" content={image} />
			</Head>

			{JSON.stringify(postDetail) !== '' && (
				<>
					<MenubarComponent title={`${postDetail?.username}'s post`} />
					<div className={`justify-content-center align-items-center p-3 d-none d-sm-none d-md-none d-lg-flex`} style={{ minHeight: '85vh' }}>
						<div className="container">
							<div className="row">
								<Skeleton visible={loading} style={{ zIndex: '0' }} radius={'md'}>
									<Card shadow={'lg'} withBorder={theme.colorScheme === 'light'} radius={'md'}>
										<Card.Section>
											{/* ----- START POST HEADER ----- */}
											<Group className="mx-3 my-2" position="apart">
												<Group>
													<Avatar
														onClick={() => router.push('/authentication')}
														decoding={'true'}
														className="ms-1"
														radius="xl"
														size={18}
														style={{ backgroundColor: avatarBgColor, cursor: 'pointer' }}
														src={postDetail?.profile_picture ? (postDetail?.profile_picture?.includes('http') ? postDetail?.profile_picture : `${API_URL}/${postDetail?.profile_picture}`) : ''}
													/>
													<Text style={{ cursor: 'pointer', marginLeft: '-5px' }} onClick={() => router.push('/authentication')} size="xs" className="fw-bold my-2">
														{postDetail?.username}
													</Text>
												</Group>
											</Group>
											{/* ----- END POST HEADER ----- */}

											{/* POST IMAGE */}
											<Image
												priority={'true'}
												decoding={'true'}
												className="text-center"
												src={postDetail?.post_image ? (postDetail?.post_image?.includes('http') ? postDetail?.post_image : `${API_URL}/${postDetail?.post_image}`) : ''}
												alt="etSocial-post"
											></Image>
										</Card.Section>

										{/* ----- START LIKES COUNTER ----- */}
										<Group
											className="mb-1 mx-1 mb-2 ms-1 mt-3"
											spacing="xs"
											size="sm"
											style={{
												color: secondaryColor,
												lineHeight: 1.5,
											}}
										>
											{postDetail?.likes?.length > 0 && <Text size="xs">Liked by {postDetail?.likes?.length} others</Text>}
										</Group>
										{/* ----- END LIKES COUNTER ----- */}

										{/* ----- START CAPTION ----- */}
										<Text
											className="mx-1"
											size="sm"
											style={{
												// color: secondaryColor,
												lineHeight: 1.5,
												marginBottom: 5,
											}}
										>
											<div>
												{postDetail?.caption &&
													postDetail?.caption?.length > spoilerLimit &&
													(!postDetail?.caption?.includes(' ') ? (
														<Text size="xs" className="fw-bold">
															<span style={{ cursor: 'pointer' }} onClick={() => router.push('/authentication')}>
																{postDetail?.username}{' '}
															</span>
														</Text>
													) : (
														// maxHeight: 20 for every line of caption
														// hideLabel="... hide"
														<Spoiler maxHeight={20} showLabel="...more" size={'xs'}>
															<Text size="xs" className="fw-bold">
																<span style={{ cursor: 'pointer' }} onClick={() => router.push('/authentication')}>
																	{postDetail?.username}{' '}
																</span>
																<span className="fw-normal" style={{ textAlign: 'justify' }}>
																	{postDetail?.caption}
																</span>
															</Text>
														</Spoiler>
													))}
												{postDetail?.caption &&
													postDetail?.caption.length <= spoilerLimit &&
													(!postDetail?.caption.includes(' ') && postDetail?.caption.length >= 20 ? (
														<>
															<Text size="xs" className="fw-bold">
																<span style={{ cursor: 'pointer' }} onClick={() => router.push('/authentication')}>
																	{postDetail?.username}{' '}
																</span>
															</Text>
															<br />
															{/* <Text style={{ fontSize: '10px' }}>
																<span className="text-danger">* </span>
																Please edit your caption and add some spacing.
															</Text> */}
														</>
													) : (
														<>
															<Text size="xs" className="fw-bold">
																<span style={{ cursor: 'pointer' }} onClick={() => router.push('/authentication')}>
																	{postDetail?.username}{' '}
																</span>
																<span size={'xs'} className="fw-normal" style={{ textAlign: 'justify' }}>
																	{postDetail?.caption}
																</span>
															</Text>
														</>
													))}
											</div>
										</Text>
										{/* ----- END CAPTION ----- */}

										{/* ----- START TIME POSTED ----- */}
										<div className="mt-1">
											<Text size="xs" className="text-muted mx-1 mt-2" style={{ fontSize: '11px' }}>
												{moment(postDetail?.created_at).fromNow()}
											</Text>
										</div>
										{/* ----- END TIME POSTED ----- */}
									</Card>
								</Skeleton>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	)
}

export async function getServerSideProps(context) {
	let params = context.params

	let feeds = await axios.get(`${API_URL}/api/posts/details?id_post=${params.id_post}`)
	let dataFeed = feeds?.data

	console.log(dataFeed.posts)

	return {
		props: {
			post: dataFeed.posts,
		},
	}
}
