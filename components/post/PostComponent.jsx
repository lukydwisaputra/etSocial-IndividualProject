import React, { useEffect, useState } from 'react'
import { Card, Image, Text, Menu, Group, useMantineTheme, Avatar, ActionIcon, Spoiler, Skeleton, TextInput, Textarea, Loader, Modal, Button } from '@mantine/core'
import { AiFillHeart, AiOutlineHeart, AiOutlineEdit, AiOutlineDelete, AiOutlineShareAlt } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import { IoMdSend } from 'react-icons/io'
import Link from 'next/link'
import { API_URL } from '../../helper/helper'
import moment from 'moment'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setPost, resetPost } from '../../slices/postSlice'
import { useForm } from '@mantine/hooks'

export default function PostComponent({ postIndex }) {
	// HOOKS
	const [openConfirmation, setOpenConfirmation] = useState(false)
	const [deleted, setDeleted] = useState({ isDeleted: null, isLoading: false })
	const [edited, setEdited] = useState({ isOpen: false, isEdited: null, isLoading: false, captionCount: 0 })
	const [comment, setComment] = useState(false)
	const [loading, setLoading] = useState(true)
	const [commentValue, setCommentValue] = useState('')
	const [sendComment, setSendComment] = useState(false)
	let { id_user, username, id_post, caption, post_image, created_at, likes, comments, profile_picture } = useSelector((state) => state.post[postIndex])
	const theme = useMantineTheme()
	const { id } = useSelector((state) => state.user)
	const dispatch = useDispatch()

	// VAR
	const spoilerLimit = 50
	const iconSize = 22
	const border = `0.25px solid ${theme.colorScheme === 'dark' ? 'rgb(255,255,255, 0.3)' : theme.colors.gray[2]}`
	const avatarBgColor = theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
	const secondaryColor = theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]
	const likeButton = likes.findIndex((val) => val.id_user === id) < 0 ? false : true
	const devider = <hr className="my-2" style={{ borderBottom: 'none', borderTop: border }} />

	const form = useForm({
		initialValues: {
			caption: '',
		},
	})

	const handleLikeButton = async () => {
		try {
			if (!likeButton) {
				// console.log('like')
				await axios.post(`${API_URL}/api/likes`, {
					id_post: id_post,
					id_user: id,
				})
			} else {
				// console.log('unlike')
				let index = likes.findIndex((val) => val.id_user === id)
				await axios.delete(`${API_URL}/api/likes/${likes[index].id}`)
			}

			let post = await axios.get(`${API_URL}/api/posts/details`)
			if (post?.data?.success) {
				dispatch(setPost(post.data.posts))
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleAddComment = async () => {
		if (!sendComment && commentValue !== '') {
			try {
				await axios.post(`${API_URL}/api/comments`, { id_user: id, id_post, comment: commentValue })
				let post = await axios.get(`${API_URL}/api/posts/details`)
				if (post?.data?.success) {
					setTimeout(() => {
						dispatch(setPost(post.data.posts))
						setSendComment((prev) => (prev = false))
						setCommentValue((prev) => (prev = ''))
						// Close comment input while submitted
						setComment((prev) => (prev = false))
					}, 1500)
				}
			} catch (error) {
				setSendComment((prev) => (prev = false))
				setCommentValue((prev) => (prev = ''))
				console.log(error)
			}
		}
	}

	const handleDeletePost = async () => {
		try {
			setDeleted((prev) => ({ ...prev, isLoading: true }))
			setTimeout(async () => {
				let deletePost = await axios.delete(`${API_URL}/api/posts/${id_post}`)

				if (deletePost?.data?.success) {
					// also delete all comments and likes inside deleted post
					await axios.delete(`${API_URL}/api/comments/id_post/${id_post}`)
					await axios.delete(`${API_URL}/api/likes/id_post/${id_post}`)

					setDeleted((prev) => ({ ...prev, isDeleted: true }))
					setDeleted((prev) => ({ ...prev, isLoading: false }))
					setOpenConfirmation((prev) => (prev = false))
				} else {
					setDeleted((prev) => ({ ...prev, isDeleted: false }))
					return
				}

				let post = await axios.get(`${API_URL}/api/posts/details`)
				if (post?.data?.success) {
					dispatch(setPost(post.data.posts))
				}

				if (post?.data?.posts?.length === 0) {
					dispatch(resetPost())
				}
			}, 3000)
		} catch (error) {
			setDeleted((prev) => ({ ...prev, isDeleted: false }))
			console.log(error)
		}
	}

	const displayComments = () => {
		let result = comments.map((val, idx) => {
			if (idx < 2) {
				return (
					<Group key={idx}>
						<Text className="fw-bold" style={{ fontSize: '12px', fontWeight: 900, cursor: 'pointer' }}>
							{val.username} <span className="fw-normal">{val.comment}</span>
						</Text>
					</Group>
				)
			}
		})

		return result.reverse()
	}

	const addComment = (
		<div>
			<TextInput
				value={commentValue}
				size="xs"
				placeholder="comment"
				rightSection={
					sendComment ? (
						<Loader size={10} color={'gray'} />
					) : (
						<IoMdSend
							className="me-2"
							size={15}
							style={{ cursor: 'pointer' }}
							onClick={() => {
								setSendComment(true)
								handleAddComment()
							}}
						/>
					)
				}
				onChange={(e) => {
					setCommentValue((prev) => (prev = e.target.value))
				}}
			/>
		</div>
	)

	const handleEditCaption = () => {
		try {
			setEdited((prev) => ({ ...prev, isLoading: true }))
			setTimeout(async () => {
				let result = await axios.patch(`${API_URL}/api/posts/${id_post}`, {
					caption: form.values.caption,
				})
				if (result?.data?.success) {
					setEdited((prev) => ({ ...prev, isOpen: false }))
					setEdited((prev) => ({ ...prev, isLoading: false }))
					setEdited((prev) => ({ ...prev, isEdited: null }))
					form.setFieldValue('caption', '')
				} else {
					setEdited((prev) => ({ ...prev, isEdited: false }))
				}
				let post = await axios.get(`${API_URL}/api/posts/details`)
				if (post?.data?.success) {
					dispatch(setPost(post.data.posts))
				}
			}, 1500)
		} catch (error) {
			console.log(error)
			setEdited((prev) => ({ ...prev, isEdited: false }))
			setEdited((prev) => ({ ...prev, isOpen: false }))
			setEdited((prev) => ({ ...prev, isLoading: false }))
		}
	}

	useEffect(() => {
		if (loading) {
			setTimeout(() => {
				setLoading((prev) => (prev = false))
			}, 1500)
		}
	})

	return (
		<>
			<div style={{ marginTop: '1vh' }}>
				<div className="row">
					<Skeleton visible={loading} style={{ zIndex: '0' }}>
						<Card shadow={'lg'} withBorder radius={'md'}>
							<Card.Section>
								{/* ----- START POST HEADER ----- */}
								<Group className="mx-3 my-2" position="apart">
									<Group style={{ cursor: 'pointer' }}>
										<Avatar
											decoding={'true'}
											className="ms-1"
											radius="xl"
											size={18}
											style={{ backgroundColor: avatarBgColor }}
											src={profile_picture ? profile_picture?.includes('http') ? profile_picture : `${API_URL}/${profile_picture}` : ''}
										/>
										<Link href="/profile" passHref>
											<Text size="sm" >{username}</Text>
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
												<Menu.Item component="button" onClick={() => setEdited((prev) => ({ ...prev, isOpen: true }))}>
													<Group>
														<AiOutlineEdit className="text-muted" />
														<p className="m-auto text-muted">Edit Caption</p>
													</Group>
												</Menu.Item>
												<Menu.Item component="button" onClick={() => setOpenConfirmation((prev) => (prev = true))}>
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

								{/* --- START DELETE CONFIRMATION --- */}
								<Group position="center">
									<Modal
										size={'sm'}
										opened={openConfirmation}
										onClose={() => setOpenConfirmation((prev) => (prev = false))}
										centered
										title={
											<Text size="sm" className="fw-bold">
												CONFIRM DELETION
											</Text>
										}
									>
										{devider}
										<Text size="sm">
											Are you sure you want to
											<span className="fw-bold"> DELETE </span>
											this post?
										</Text>
										<Text style={{ fontSize: '11px' }} className="mt-2">
											🚨 You <span className="fw-bold"> CAN NOT </span> restore your data after deletion.
										</Text>
										<br />
										<Group position="left" className="mt-2">
											<Button
												variant={'light'}
												size="xs"
												color={`red`}
												onClick={() => {
													handleDeletePost()
												}}
											>
												{deleted.isLoading ? <Loader size={'xs'} color={'gray'} /> : deleted.isDeleted === false ? '❌ Error: try again ?' : 'Just delete it, please!'}
											</Button>
											<Button variant={'light'} size="xs" color={`gray`} onClick={() => setOpenConfirmation((prev) => (prev = false))}>
												Cancel
											</Button>
										</Group>
									</Modal>
								</Group>
								{/* --- END DELETE CONFIRMATION --- */}

								{/* --- START EDIT CAPTION --- */}
								<Modal
									title={
										<Text size="sm" className="fw-bold">
											EDIT CAPTION
										</Text>
									}
									className="ms-1"
									size={'md'}
									centered
									opened={edited.isOpen}
									onClose={() => {
										setEdited((prev) => ({ ...prev, isOpen: false }))
										form.setFieldValue('caption', '')
									}}
								>
									{devider}
									<Textarea
										required
										size="xs"
										minRows={4}
										className="mt-2"
										placeholder={caption}
										value={form.values.caption}
										variant="default"
										maxLength={300}
										onChange={(event) => {
											let value = event.currentTarget?.value
											form.setFieldValue('caption', value)
											setEdited((prev) => ({ ...prev, captionCount: value.length }))
										}}
									/>
									<div className="container text-end">
										<small style={{ fontSize: '0.7rem' }}>{edited.captionCount}/300</small>
									</div>
									<Button
										className="mt-2"
										style={{ width: '100%' }}
										variant="default"
										size="xs"
										onClick={() => {
											handleEditCaption()
										}}
									>
										{edited.isLoading && edited.isEdited === null ? <Loader size={14} color="gray" /> : edited.isEdited === false ? 'Error: try again?' : 'Save Edit'}
									</Button>
								</Modal>
								{/* --- END EDIT CAPTION  --- */}

								{/* POST IMAGE */}
								<Image priority={'true'} decoding={'true'} className="text-center" src={post_image ? post_image?.includes('http') ? post_image : `${API_URL}/${post_image}` : ''} alt="etSocial-post"></Image>
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
										{likeButton ? (
											<AiFillHeart
												size={iconSize}
												color={'rgb(235,72,72)'}
												onClick={async () => {
													handleLikeButton()
												}}
											/>
										) : (
											<AiOutlineHeart
												size={iconSize}
												color={secondaryColor}
												onClick={async () => {
													handleLikeButton()
												}}
											/>
										)}
									</ActionIcon>
									<ActionIcon className="float-end" radius="sm" size={30} style={{ marginLeft: '-10px' }}>
										<BiComment
											size={iconSize - 1}
											color={secondaryColor}
											onClick={async () => {
												setComment((prev) => (prev = !comment))
											}}
										/>
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
								{likes?.length >= 3 && (
									<>
										<Avatar
											style={{
												backgroundColor: avatarBgColor,
												border: `1.5px solid ${avatarBgColor}`,
											}}
											radius="xl"
											size={20}
											src={likes[0]?.profile_picture ? likes[0]?.profile_picture.includes('http') ? likes[0]?.profile_picture : `${API_URL}/${likes[0]?.profile_picture}` : ''}
										/>
										<Avatar
											style={{
												marginLeft: '-17px',
												backgroundColor: avatarBgColor,
												border: `1px solid ${avatarBgColor}`,
											}}
											radius="xl"
											size={20}
											src={likes[1]?.profile_picture ? likes[1]?.profile_picture.includes('http') ? likes[1]?.profile_picture : `${API_URL}/${likes[1]?.profile_picture}` : ''}
										/>
										<Avatar
											style={{
												marginLeft: '-17px',
												backgroundColor: avatarBgColor,
												border: `1px solid ${avatarBgColor}`,
											}}
											radius="xl"
											size={20}
											src={likes[2]?.profile_picture ? likes[2]?.profile_picture.includes('http') ? likes[1]?.profile_picture : `${API_URL}/${likes[2]?.profile_picture}` : ''}
										/>
									</>
								)}

								{likes?.length >= 3 && (
									<Text size="sm">
										Liked by
										{likeToggle && <span className="fw-bold"> you and </span>}
										{likes?.length} others
									</Text>
								)}

								{!likeButton && likes?.length > 0 && <small>Liked by {likes?.length} others</small>}

								{likeButton && likes?.length - 1 > 0 && (
									<Text size="sm">
										Liked by
										{likeButton && <span className="fw-bold"> you</span>} and {likes?.length - 1} others
									</Text>
								)}

								{likeButton && likes?.length - 1 === 0 && (
									<Text size="sm">
										Liked by<span className="fw-bold"> you</span>
									</Text>
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
									{caption && caption.length > spoilerLimit && (
										!caption.includes(' ') ?
										<Text size="sm" className="fw-bold" component="a" style={{ cursor: 'pointer' }}>
											@{username}{' '}
										</Text>
										:
										// maxHeight: 20 for every line of caption
										// hideLabel="... hide"
										<Spoiler maxHeight={20} showLabel="...more" size={'xs'}>
											<Text size="sm" className="fw-bold" component="a" style={{ cursor: 'pointer' }}>
												@{username}{' '}
											</Text>
											<span size="sm" style={{ textAlign: 'justify' }}>
												{caption}
											</span>
										</Spoiler>
									)}
									{caption && caption.length <= spoilerLimit && (
											!caption.includes(' ') && caption.length >= 20 ?
											<>
												<Text size="sm" className="fw-bold" component="a" style={{ cursor: 'pointer' }}>
													@{username}{' '}
												</Text><br />
												<Text style={{fontSize: '10px'}}>
													<span className='text-danger'>* </span>
													Please edit your caption and add some spacing.
												</Text>
											</>
											:
											<>
												<Text size="sm" className="fw-bold" component="a" style={{ cursor: 'pointer' }}>
													@{username}{' '}
												</Text>
												<span size="sm">{caption}</span>
											</>
									)}
								</div>
							</Text>
							{/* ----- END CAPTION ----- */}

							{comments?.length > 0 && devider}

							{/* ----- START COMMENTS ----- */}
							<div className="text-secondary mb-3 mx-1">
								{comments?.length > 2 && <Text style={{ fontSize: '11px' }}>View all {comments.length} comments</Text>}
							
								{
									comments.length > 0 && displayComments()
									// <Paper className='py-2 mt-2' withBorder>
									// </Paper>
								}
							</div>
							{/* {addComment} */}
							{comment && addComment}
							{/* ----- END COMMENTS ----- */}

							{/* ----- START TIME POSTED ----- */}
							<div className="mt-1">
								<Text size="xs" className="text-muted mx-1 mt-2" style={{ fontSize: '11px' }}>
									{moment(created_at).fromNow()}
								</Text>
							</div>
							{/* ----- END TIME POSTED ----- */}
						</Card>
					</Skeleton>
				</div>
			</div>
		</>
	)
}
