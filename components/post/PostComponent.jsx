import React, { useEffect, useState } from 'react'
import { Card, Image, Text, Menu, Group, useMantineTheme, Avatar, ActionIcon, Spoiler, Skeleton, CopyButton, Textarea, Loader, Modal, Button } from '@mantine/core'
import { AiFillHeart, AiOutlineHeart, AiOutlineEdit, AiOutlineDelete, AiOutlineShareAlt } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import { IoMdSend } from 'react-icons/io'
import { API_URL, HOST } from '../../helper/helper'
import moment from 'moment'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setPost, resetPost } from '../../slices/postSlice'
import { setDetail } from '../../slices/detailSlice'
import { useForm } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon } from 'react-share'
import { useClipboard } from '@mantine/hooks'
import { IconCopy, IconCheck } from '@tabler/icons'

export default function PostComponent({ postIndex, link }) {
	// HOOKS
	const [openShare, setOpenShare] = useState(false)
	const [openConfirmation, setOpenConfirmation] = useState(false)
	const [deleted, setDeleted] = useState({ isDeleted: null, isLoading: false })
	const [edited, setEdited] = useState({ isOpen: false, isEdited: null, isLoading: false, captionCount: 0 })
	const [comment, setComment] = useState(false)
	const [loading, setLoading] = useState(true)
	const [commentValue, setCommentValue] = useState('')
	const [sendComment, setSendComment] = useState(false)
	let { id_user, username, id_post, caption, post_image, created_at, likes, comments, profile_picture } = useSelector((state) => state.post[postIndex])
	let postDetail = useSelector((state) => state.post[postIndex])
	const theme = useMantineTheme()
	const { id } = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const router = useRouter()
	const clipboard = useClipboard({ timeout: 1000 })

	// VAR
	const spoilerLimit = 50
	const commentLimit = 2
	const iconSize = 22
	const border = `0.25px solid ${theme.colorScheme === 'dark' ? 'rgb(255,255,255, 0.3)' : theme.colors.gray[2]}`
	const avatarBgColor = theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
	const secondaryColor = theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]
	const likeButton = likes.findIndex((val) => val.id_user === id) < 0 ? false : true
	const devider = <hr className="my-2" style={{ borderBottom: 'none', borderTop: border }} />
	const sharedUrl = `${HOST}/post/${id_post}`

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
				console.log(error)
				setSendComment((prev) => (prev = false))
				setCommentValue((prev) => (prev = ''))
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
			console.log(error)
			setDeleted((prev) => ({ ...prev, isDeleted: false }))
		}
	}

	const displayComments = () => {
		let result = comments.map((val, idx) => {
			if (idx < commentLimit) {
				return (
					<div key={idx + 'container'}>
						<Group key={idx + 'group'}>
							<Text className="fw-bold" style={{ fontSize: '12px', fontWeight: 900 }}>
								<span>
									{val.username}{' '}
								</span>
								<span className="fw-normal">{val.comment} </span>
								{/* <span className="text-muted fw-normal" style={{ fontSize: '9px' }}>
									- {moment(val?.created_at).fromNow()}
								</span> */}
							</Text>
						</Group>

						{/* ----- START TIME POSTED ----- */}
						<div key={idx + 'time-comment'}>
							<Text className="text-muted" style={{ fontSize: '9px' }}>
								- {moment(val?.created_at).fromNow()}
							</Text>
						</div>
						{/* ----- END TIME POSTED ----- */}
					</div>
				)
			}
		})

		return result.reverse()
	}

	const addComment = (
		<div>
			<Textarea
				maxLength={300}
				value={commentValue}
				size="xs"
				placeholder="Comment"
				rightSection={
					sendComment ? (
						<Loader size={10} color={'gray'} />
					) : (
						<IoMdSend
							className="me-2"
							size={15}
							style={{ cursor: 'pointer' }}
							onClick={() => {
								if (commentValue.length <= 20 || commentValue.includes(' ')) {
									setSendComment(true)
									handleAddComment()
								}
							}}
						/>
					)
				}
				onChange={(e) => {
					if (e.target.value.length <= 300) {
						setCommentValue((prev) => (prev = e.target.value))
					}
				}}
				error={commentValue.length > 20 && !commentValue?.includes(' ') ? <small>* please add some space</small> : ''}
			/>
			<Text className="text-end mx-1 mt-1" style={{ fontSize: '10px' }}>
				{commentValue.length}/300
			</Text>
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
			}, 1000)
		}
	})

	return (
		<>
			<div style={{ marginTop: '1vh' }}>
				<div className="row">
					<Skeleton visible={loading} style={{ zIndex: '0' }} radius={'md'}>
						<Card shadow={'lg'} withBorder={theme.colorScheme === 'light'} radius={'md'}>
							<Card.Section>
								{/* ----- START POST HEADER ----- */}
								<Group className="mx-3 my-2" position="apart">
									<Group>
										<Avatar
											decoding={'true'}
											className="ms-1"
											radius="xl"
											size={18}
											style={{ backgroundColor: avatarBgColor}}
											src={profile_picture ? (profile_picture?.includes('http') ? profile_picture : `${API_URL}/${profile_picture}`) : ''}
										/>
										<Text style={{ marginLeft: '-5px' }} size="xs" className="fw-bold">
											{username}
										</Text>
									</Group>

									{/* --- START POST MENU --- */}
									<Menu radius={'md'} shadow={'lg'} size={'sm'} placement="end" withArrow>
										<Menu.Item component="button" onClick={() => setOpenShare((prev) => (prev = true))}>
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

								{/* --- START SHARE POST --- */}
								<Modal
									title={
										<Text size="sm" className="fw-bold">
											Share {username}&apos;s post
										</Text>
									}
									className="ms-1"
									size={'sm'}
									centered
									opened={openShare}
									onClose={() => {
										setOpenShare((prev) => (prev = false))
									}}
								>
									{devider}
									<Group position="apart" className="container my-4" style={{ width: '200px' }}>
										<FacebookShareButton quote={`Check out ${username}'s post!`} url={sharedUrl}>
											<FacebookIcon size={30} />
										</FacebookShareButton>

										<TwitterShareButton title={`Check out ${username}'s post!`} hashtags={['étSocial']} url={sharedUrl}>
											<TwitterIcon size={30} />
										</TwitterShareButton>

										<WhatsappShareButton title={`Check out ${username}'s post!`} url={sharedUrl}>
											<WhatsappIcon size={30} />
										</WhatsappShareButton>

										<ActionIcon size={30} style={{ border: `1.5px solid ${clipboard.copied ? 'rgb(162,197,227)' : secondaryColor}`, borderRadius: '0' }} onClick={() => clipboard.copy(sharedUrl)}>
											{!clipboard.copied ? <IconCopy size="15" color={secondaryColor} /> : <IconCheck size="15" color={'rgb(162,197,227)'} />}
										</ActionIcon>
									</Group>
								</Modal>
								{/* --- END SHARE POST  --- */}

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

								{/* POST IMAGE */}
								<Image
									style={{ cursor: 'pointer' }}
									priority={'true'}
									decoding={'true'}
									className="text-center"
									src={post_image ? (post_image?.includes('http') ? post_image : `${API_URL}/${post_image}`) : ''}
									alt="etSocial-post"
									onClick={() => {
										router.push(`/post/${id_post}/user/${username}`)
										dispatch(setDetail({ ...postDetail, viewAll: true }))
									}}
								></Image>
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
													await handleLikeButton()
												}}
											/>
										) : (
											<AiOutlineHeart
												size={iconSize}
												color={secondaryColor}
												onClick={async () => {
													await handleLikeButton()
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
								className="mb-1 mx-1 mb-2 ms-1"
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
											size={17}
											src={likes[0]?.profile_picture ? (likes[0]?.profile_picture.includes('http') ? likes[0]?.profile_picture : `${API_URL}/${likes[0]?.profile_picture}`) : ''}
										/>
										<Avatar
											style={{
												marginLeft: '-17px',
												backgroundColor: avatarBgColor,
												border: `1px solid ${avatarBgColor}`,
											}}
											radius="xl"
											size={17}
											src={likes[1]?.profile_picture ? (likes[1]?.profile_picture.includes('http') ? likes[1]?.profile_picture : `${API_URL}/${likes[1]?.profile_picture}`) : ''}
										/>
										<Avatar
											style={{
												marginLeft: '-17px',
												marginRight: '-5px',
												backgroundColor: avatarBgColor,
												border: `1px solid ${avatarBgColor}`,
											}}
											radius="xl"
											size={17}
											src={likes[2]?.profile_picture ? (likes[2]?.profile_picture.includes('http') ? likes[1]?.profile_picture : `${API_URL}/${likes[2]?.profile_picture}`) : ''}
										/>
									</>
								)}

								{likes?.length >= 3 && (
									<Text size="xs">
										Liked by
										{likeToggle && <span className="fw-bold"> you and </span>}
										{likes?.length} others
									</Text>
								)}

								{!likeButton && likes?.length > 0 && <Text size="xs">Liked by {likes?.length} others</Text>}

								{likeButton && likes?.length - 1 > 0 && (
									<Text size="xs">
										Liked by
										{likeButton && <span className="fw-bold"> you</span>} and {likes?.length - 1} others
									</Text>
								)}

								{likeButton && likes?.length - 1 === 0 && (
									<Text size="xs">
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
									// color: secondaryColor,
									lineHeight: 1.5,
									marginBottom: 5,
								}}
							>
								<div>
									{caption &&
										caption.length > spoilerLimit &&
										(!caption.includes(' ') ? (
											<Text size="xs" className="fw-bold">
												<span>
													{username}{' '}
												</span>
											</Text>
										) : (
											// maxHeight: 20 for every line of caption
											// hideLabel="... hide"
											<Spoiler maxHeight={20} showLabel="...more" size={'xs'}>
												<Text size="xs" className="fw-bold">
													<span>
														{username}{' '}
													</span>
													<span className="fw-normal" style={{ textAlign: 'justify' }}>
														{caption}
													</span>
												</Text>
											</Spoiler>
										))}
									{caption &&
										caption.length <= spoilerLimit &&
										(!caption.includes(' ') && caption.length >= 20 ? (
											<>
												<Text size="xs" className="fw-bold">
													<span>
														{username}{' '}
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
													<span>
														{username}{' '}
													</span>
													<span size={'xs'} className="fw-normal" style={{ textAlign: 'justify' }}>
														{caption}
													</span>
												</Text>
											</>
										))}
								</div>
							</Text>
							{/* ----- END CAPTION ----- */}

							{comments?.length > 0 && devider}

							{/* ----- START COMMENTS ----- */}
							<div className="mb-3 mx-1">
								{comments?.length > commentLimit && (
									<Text className="mb-2">
										<span
											style={{ fontSize: '11px', cursor: 'pointer' }}
											onClick={() => {
												router.push(`/post/${id_post}/user/${username}`)
												// dispatch(setDetail({...postDetail, viewAll: true}))
											}}
										>
											View all {comments.length} comments
										</span>
									</Text>
								)}

								{comments.length > 0 && displayComments()}
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
