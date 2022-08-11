import React, { useEffect, useState } from 'react'
import { Card, Image, Text, Menu, Group, useMantineTheme, Avatar, ActionIcon, Spoiler } from '@mantine/core'
import { AiFillHeart, AiOutlineHeart, AiOutlineEdit, AiOutlineDelete, AiOutlineShareAlt } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import Link from 'next/link'
import { API_URL } from '../../helper/helper'
import moment from 'moment'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function PostComponent({ postDetails }) {
	// HOOKS
	const [likeToggle, setLikeToggle] = useState(false)
	const [countLikes, setCountLikes] = useState(postDetails.likes.length)
	const [like, setLike] = useState({})
	const theme = useMantineTheme()
	const {id, username, email, status, name, bio} = useSelector((state) => state.user)

	// VAR
	let { id_user, id_post, caption, post_image, created_at, likes, comments, profile_picture } = postDetails
	const avatarBgColor = theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
	const secondaryColor = theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]
	const iconSize = 22

	const isLiked = async () => {
		try {
			let res = await fetch(`${API_URL}/api/likes?id_user=${id}&id_post=${id_post}`)
			let dataLikes = await res.json()
			if (dataLikes.likes?.length > 0) {
				setLike(dataLikes.likes[0])
				setLikeToggle(true)
			} else {
				setLikeToggle(false)
			}
		} catch (error) {
			console.log(error)
			return false
		}
	}

	const getLikes = async () => {
		let res = await fetch(`${API_URL}/api/likes?id_post=${id_post}`)
		let dataLikes = await res.json()
		if (dataLikes.likes?.length > 0) {
			setCountLikes(dataLikes.likes?.length)
		}
	}

	useEffect(() => {
		isLiked()
		getLikes()
	}, [])

	const handleToggle = async () => {
		setLikeToggle(!likeToggle)

		if (likeToggle === true) {
			await handleUnlike()
			await isLiked()
			setCountLikes(countLikes - 1)
		} else if (likeToggle === false) {
			await handleLike()
			await isLiked()
			setCountLikes(countLikes + 1)
		}
	}

	const handleLike = async () => {
		// console.log('like')
		try {
			await axios.post(`${API_URL}/api/likes`, {
				id_user: id,
				id_post,
			})
		} catch (error) {
			console.log(error)
			return false
		}
	}

	const handleUnlike = async () => {
		// console.log('unlike')
		try {
			await axios.delete(`${API_URL}/api/likes/${like.id}`)
		} catch (error) {
			console.log(error)
			return false
		}
	}

	return (
		<>
			<div style={{ marginBottom: '1vh', marginTop: '1vh' }}>
				{/* <div className='container'> */}
				<div className="row">
					<Card shadow={'lg'} withBorder radius={'md'}>
						<Card.Section>
							{/* ----- START POST HEADER ----- */}
							<Group className="mx-3 my-2" position="apart">
								<Group style={{ cursor: 'pointer' }}>
									<Avatar
										className="ms-1"
										radius="xl"
										size={20}
										style={{ backgroundColor: avatarBgColor }}
										src={profile_picture.includes('http') ? profile_picture : `${API_URL}/${profile_picture}`}
									/>
									<Link href="/profile" passHref>
										<Text size="sm">{username}</Text>
									</Link>
								</Group>

								{/* --- START POST MENU --- */}
								<Menu radius={'md'} shadow={'lg'} size={'sm'} placement="end" withArrow>
									<Menu.Item component="button">
										<Group>
											<AiOutlineShareAlt className="text-muted" />
											<p className="m-auto text-muted">Share Post</p>
										</Group>
									</Menu.Item>

									{/* USER CANNOT EDIT OR DELETE OTHERS POSTS */}
									{id_user === id && (
										<>
											<Menu.Item component="button">
												<Group>
													<AiOutlineEdit className="text-muted" />
													<p className="m-auto text-muted">Edit Caption</p>
												</Group>
											</Menu.Item>
											<Menu.Item component="button">
												<Group>
													<AiOutlineDelete className="text-muted" />
													<p className="m-auto text-muted">Delete Post</p>
												</Group>
											</Menu.Item>
										</>
									)}
								</Menu>
								{/* --- END POST MENU --- */}

							</Group>
							{/* ----- END POST HEADER ----- */}

							{/* POST IMAGE */}
							<Image className="text-center" src={post_image.includes('http') ? post_image : `${API_URL}/${post_image}`} alt="etSocial-post"></Image>
						
						</Card.Section>
						
						{/* ----- START LIKES & COMMENTS BUTTON ----- */}
						<Group
							position="apart"
							className="mt-3 mx-1"
							spacing="xs"
							size="sm"
							style={{
								color: secondaryColor,
								lineHeight: 1.5,
								marginBottom: 5,
								marginTop: theme.spacing.sm,
							}}
						>
							<Group>
								<ActionIcon radius="sm" size={30}>
									{likeToggle ? (
										<AiFillHeart
											size={iconSize}
											color={'rgb(235,72,72)'}
											onClick={async () => {
												handleToggle()
											}}
										/>
									) : (
										<AiOutlineHeart
											size={iconSize}
											color={secondaryColor}
											onClick={async () => {
												handleToggle()
											}}
										/>
									)}
								</ActionIcon>
								<ActionIcon className="float-end" radius="sm" size={30} style={{ marginLeft: '-10px' }}>
									<BiComment size={iconSize - 1} color={secondaryColor} />
								</ActionIcon>
							</Group>
						</Group>
						{/* ----- END LIKES & COMMENTS BUTTON ----- */}
						
						{/* ----- START LIKES COUNTER ----- */}
						<Group
							className="mb-1 mx-1 mb-3 ms-1"
							spacing="xs"
							size="sm"
							style={{
								color: secondaryColor,
								lineHeight: 1.5,
							}}
						>
							{countLikes >= 3 && (
								<>
									<Avatar style={{ backgroundColor: avatarBgColor }} radius="xl" size={25} src={likes[0].profile_picture} />
									<Avatar
										style={{
											marginLeft: '-20px',
											backgroundColor: avatarBgColor,
										}}
										radius="xl"
										size={25}
										src={likes[1].profile_picture}
									/>
									<Avatar
										style={{
											marginLeft: '-20px',
											backgroundColor: avatarBgColor,
										}}
										radius="xl"
										size={25}
										src={likes[2].profile_picture}
									/>
								</>
							)}

							{countLikes >= 3 && (
								<small>
									Liked by
									{likeToggle && <span className="fw-bold"> you and </span>}
									{countLikes} others
								</small>
							)}

							{!likeToggle && countLikes > 0 && (
								<small>
									Liked by {countLikes} others
								</small>
							)}

							{likeToggle && countLikes - 1 > 0 && (
								<small>
									Liked by
									{likeToggle && <span className="fw-bold"> you</span>}
									{" "}and {countLikes - 1} others
								</small>
							)}

							{likeToggle && countLikes - 1 === 0 && (
								<small>
									Liked by<span className="fw-bold"> you</span>
								</small>
							)}
						</Group>
						{/* ----- END LIKES COUNTER ----- */}
						
						{/* ----- START CAPTION ----- */}
						<Text
							className="mx-1"
							size="sm"
							style={{
								color: secondaryColor,
								lineHeight: 1.5,
								marginBottom: 5,
							}}
						>
							<div>
								{/* 20 for every line of caption */}
								<Text size="sm" className="fw-bold" component="a">
									@{username}{' '}
								</Text>

								{caption && caption.length > 85 && (
									<Spoiler maxHeight={20} showLabel="... more" hideLabel="... hide" size={'xs'}>
										<span size="sm">{caption}</span>
									</Spoiler>
								)}
								{caption && caption.length <= 85 && (
									<span size="sm">{caption}</span>
								)}
							</div>
						</Text>
						{/* ----- END CAPTION ----- */}
						
						{/* ----- START COMMENTS ----- */}
						<div className="mx-1 text-secondary">
							{comments.length >= 5 && <small>View all comments</small>}
							{/* comment */}
							<Group className="ms-2">
								<Text size="xs" component="a" className="fw-bold">
									another_people
								</Text>
								<Text style={{ marginLeft: '-12px' }} size="xs">
									nice view 👀
								</Text>
							</Group>
						</div>
						{/* ----- START COMMENTS ----- */}

						{/* ----- START TIME POSTED ----- */}
						<div className="mt-2">
							<small className="text-muted mx-1 mt-2">{moment(created_at).fromNow()}</small>
						</div>
						{/* ----- END TIME POSTED ----- */}
					</Card>
				</div>
			</div>
		</>
	)
}
