import React, { useEffect, useState, useId } from 'react'
import { Card, Image, Text, Menu, Group, useMantineTheme, Avatar, ActionIcon, Spoiler, Skeleton, Paper, Textarea, Loader, Modal, Button } from '@mantine/core'
import { AiFillHeart, AiOutlineHeart, AiOutlineEdit, AiOutlineDelete, AiOutlineShareAlt } from 'react-icons/ai'
import { API_URL } from '../../helper/helper'
import moment from 'moment'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setPost, resetPost, getAllPost } from '../../slices/postSlice'
import { setDetail, getDetail } from '../../slices/detailSlice'
import { useForm } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { IoMdSend } from 'react-icons/io'
import { BiComment } from 'react-icons/bi'

export default function MobilePostDetailComponent({ post }) {
	// HOOKS
   let posts = useSelector(getAllPost)
	let postDetail = useSelector(getDetail)
	const [openConfirmation, setOpenConfirmation] = useState(false)
   const [sendComment, setSendComment] = useState(false)
   const [commentValue, setCommentValue] = useState('')
	const [deleted, setDeleted] = useState({ isDeleted: null, isLoading: false })
	const [edited, setEdited] = useState({ isOpen: false, isEdited: null, isLoading: false, captionCount: 0 })
	const [loading, setLoading] = useState(true)
	const theme = useMantineTheme()
	const { id } = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const router = useRouter()
   const [commentLimit, setCommentLimit] = useState(5)
   const uniqueId = useId()
   const [comment, setComment] = useState(false)

	// VAR
	const spoilerLimit = 50
	const iconSize = 22
	const border = `0.25px solid ${theme.colorScheme === 'dark' ? 'rgb(255,255,255, 0.3)' : theme.colors.gray[2]}`
	const avatarBgColor = theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
	const secondaryColor = theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]
	const likeButton = postDetail?.likes?.findIndex((val) => val.id_user === id) < 0 ? false : true
	const devider = <hr className="my-1" style={{ borderBottom: 'none', borderTop: border }} />
   const postIndex = posts.findIndex((val) => val.id_post === postDetail.id_post)
	let comments = posts[postIndex]?.comments

	useEffect(() => {
		dispatch(setDetail({ ...post[0], viewAll: true }))
	}, [])

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
					id_post: postDetail.id_post,
					id_user: id,
				})
			} else {
				// console.log('unlike')
				let index = postDetail?.likes?.findIndex((val) => val.id_user === id)
				await axios.delete(`${API_URL}/api/likes/${postDetail?.likes[index].id}`)
			}

			let res = await axios.get(`${API_URL}/api/posts/details?id_post=${postDetail?.id_post}`)
			if (res?.data?.success) {
				dispatch(setDetail(res.data.posts[0]))
			}
			let posts = await axios.get(`${API_URL}/api/posts/details`)
			if (posts?.data?.success) {
				dispatch(setPost(posts.data.posts))
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleDeletePost = async () => {
		try {
			setDeleted((prev) => ({ ...prev, isLoading: true }))
			setTimeout(async () => {
				let deletePost = await axios.delete(`${API_URL}/api/posts/${postDetail?.id_post}`)

				if (deletePost?.data?.success) {
					// also delete all comments and likes inside deleted post
					await axios.delete(`${API_URL}/api/comments/id_post/${postDetail?.id_post}`)
					await axios.delete(`${API_URL}/api/likes/id_post/${postDetail?.id_post}`)

					setDeleted((prev) => ({ ...prev, isDeleted: true }))
					setDeleted((prev) => ({ ...prev, isLoading: false }))
					setOpenConfirmation((prev) => (prev = false))
				} else {
					setDeleted((prev) => ({ ...prev, isDeleted: false }))
					return
				}

				let post = await axios.get(`${API_URL}/api/posts/details?id_post=${postDetail?.id_post}`)
				if (post?.data?.success) {
					dispatch(setDetail(post.data.posts))
				}
				let posts = await axios.get(`${API_URL}/api/posts/details`)
				if (posts?.data?.success) {
					dispatch(setPost(posts.data.posts))
					router.push('/home')
				}
				if (post?.data?.posts?.length === 0) {
					dispatch(resetPost())
					router.push('/home')
				}
			}, 3000)
		} catch (error) {
			console.log(error)
			setDeleted((prev) => ({ ...prev, isDeleted: false }))
		}
	}

	const handleEditCaption = () => {
		try {
			setEdited((prev) => ({ ...prev, isLoading: true }))
			setTimeout(async () => {
				let result = await axios.patch(`${API_URL}/api/posts/${postDetail?.id_post}`, {
					caption: form.values.caption,
				})
				if (result?.data?.success) {
					setEdited((prev) => ({ ...prev, isOpen: false }))
					setEdited((prev) => ({ ...prev, isLoading: false }))
					setEdited((prev) => ({ ...prev, isEdited: null }))
					form.setFieldValue('caption', '')
				} else {
					setEdited((prev) => ({ ...prev, isEdited: false }))
					setEdited((prev) => ({ ...prev, isLoading: false }))
				}
				let post = await axios.get(`${API_URL}/api/posts/details?id_post=${postDetail?.id_post}`)
				if (post?.data?.success) {
					dispatch(setDetail(post.data.posts[0]))
				}
				let posts = await axios.get(`${API_URL}/api/posts/details`)
				if (posts?.data?.success) {
					dispatch(setPost(posts.data.posts))
				}
			}, 1500)
		} catch (error) {
			console.log(error)
			setEdited((prev) => ({ ...prev, isEdited: false }))
			setEdited((prev) => ({ ...prev, isOpen: false }))
			setEdited((prev) => ({ ...prev, isLoading: false }))
		}
	}

   const handleAddComment = async () => {
      if (!sendComment && commentValue !== '') {
         try {
            await axios.post(`${API_URL}/api/comments`, { id_user: id, id_post: postDetail.id_post, comment: commentValue })
            let post = await axios.get(`${API_URL}/api/posts/details`)
            if (post?.data?.success) {
					setTimeout(() => {
						dispatch(setPost(post.data.posts))
                  setSendComment((prev) => (prev = false))
                  setCommentValue((prev) => (prev = ''))
               }, 1500)
            }

				let res = await axios.get(`${API_URL}/api/posts/details?id_post=${postDetail?.id_post}`)
				if (res?.data?.success) {
					setTimeout(() => {
						dispatch(setDetail(res.data.posts[0]))
					}, 1500)
				}
         } catch (error) {
            console.log(error)
            setSendComment((prev) => (prev = false))
            setCommentValue((prev) => (prev = ''))
         }
      }
   }

   const addComment = (
      <div className='mt-3'>
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

   const displayComments = () => {
      let counter = 0
		let result = postDetail?.comments?.map((val, idx) => {
         if (idx < commentLimit) {
            counter ++
            return (
               <div key={uniqueId + idx + 'container'} className={'mx-1'}>
                  <Group key={uniqueId + idx + 'group'}>
                     <Text className="fw-bold" style={{ fontSize: '12px', fontWeight: 900 }}>
                        <span style={{ cursor: 'pointer' }} onClick={() => router.push('/profile')}>
                           {val.username}{' '}
                        </span>
                        <span className="fw-normal">{val.comment} </span>
                        {/* <span className="text-muted fw-normal" style={{ fontSize: '9px' }}>
                           - {moment(val?.created_at).fromNow()}
                        </span> */}
                     </Text>
                  </Group>

                  {/* ----- START TIME POSTED ----- */}
                  <div key={uniqueId + idx + 'time-comment'}>
                     <Text className="text-muted" style={{ fontSize: '9px' }}>
                        - {moment(val?.created_at).fromNow()}
                     </Text>
                  </div>
                  {/* ----- END TIME POSTED ----- */}
                  {devider}
               </div>
            )
         } else {
            return
         }
      })

      // result?.reverse()

      if (counter < postDetail?.comments?.length) {
         result.push(
            <Text key={uniqueId + 'load-more'} className="mb-2 mx-1 text-muted">
               <span
                  style={{ fontSize: '11px', cursor: 'pointer' }}
                  onClick={() => {
                     setCommentLimit((prev) => prev + 5)
                  }}
               >
                  see more...
               </span>
            </Text>
         )
      }

		return result
	}

	useEffect(() => {
		if (loading) {
			setTimeout(() => {
				setLoading((prev) => (prev = false))
			}, 1000)
		}
	})

	let content
	if (JSON.stringify(postDetail) === '') {
		content = <></>
	} else {
		content = (
			<>
            <div className="row">
               <Skeleton visible={loading} style={{ zIndex: '0' }} radius={'md'}>
                  <Card shadow={'lg'} withBorder={theme.colorScheme === 'light'} radius={'md'}>
                     <Card.Section>
                        {/* ----- START POST HEADER ----- */}
                        <Group className="mx-3 my-2" position="apart">
                           <Group>
                              <Avatar
                                 onClick={() => router.push('/profile')}
                                 decoding={'true'}
                                 className="ms-1"
                                 radius="xl"
                                 size={18}
                                 style={{ backgroundColor: avatarBgColor, cursor: 'pointer' }}
                                 src={postDetail?.profile_picture ? (postDetail?.profile_picture?.includes('http') ? postDetail?.profile_picture : `${API_URL}/${postDetail?.profile_picture}`) : ''}
                              />
                              <Text style={{ cursor: 'pointer', marginLeft: '-5px' }} onClick={() => router.push('/profile')} size="xs" className="fw-bold">
                                 {postDetail?.username}
                              </Text>
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
                              {postDetail?.id_user === id && (
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
                              setEdited((prev) => ({ ...prev, isLoading: false }))
                           }}
                        >
                           {devider}
                           <Textarea
                              required
                              size="xs"
                              minRows={4}
                              className="mt-2"
                              placeholder={postDetail?.caption}
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
                        <Image
                           priority={'true'}
                           decoding={'true'}
                           className="text-center"
                           src={postDetail?.post_image ? (postDetail?.post_image?.includes('http') ? postDetail?.post_image : `${API_URL}/${postDetail?.post_image}`) : ''}
                           alt="etSocial-post"
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
                        {postDetail?.likes?.length >= 3 && (
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

                        {postDetail?.likes?.length >= 3 && (
                           <Text size="xs">
                              Liked by
                              {likeToggle && <span className="fw-bold"> you and </span>}
                              {likes?.length} others
                           </Text>
                        )}

                        {!likeButton && postDetail?.likes?.length > 0 && <Text size="xs">Liked by {postDetail?.likes?.length} others</Text>}

                        {likeButton && postDetail?.likes?.length - 1 > 0 && (
                           <Text size="xs">
                              Liked by
                              {likeButton && <span className="fw-bold"> you</span>} and {postDetail?.likes?.length - 1} others
                           </Text>
                        )}

                        {likeButton && postDetail?.likes?.length - 1 === 0 && (
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
                           {postDetail?.caption &&
                              postDetail?.caption?.length > spoilerLimit &&
                              (!postDetail?.caption?.includes(' ') ? (
                                 <Text size="xs" className="fw-bold">
                                    <span style={{ cursor: 'pointer' }} onClick={() => router.push('/profile')}>
                                       {postDetail?.username}{' '}
                                    </span>
                                 </Text>
                              ) : (
                                 // maxHeight: 20 for every line of caption
                                 // hideLabel="... hide"
                                 <Spoiler maxHeight={20} showLabel="...more" size={'xs'}>
                                    <Text size="xs" className="fw-bold">
                                       <span style={{ cursor: 'pointer' }} onClick={() => router.push('/profile')}>
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
                                       <span style={{ cursor: 'pointer' }} onClick={() => router.push('/profile')}>
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
                                       <span style={{ cursor: 'pointer' }} onClick={() => router.push('/profile')}>
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

                     {/* <ScrollArea className='mt-2' type="always" style={{ height: '15vh' }} offsetScrollbars scrollbarSize={2} scrollHideDelay={0}>
                     </ScrollArea> */}
                     <div>
                        <Card className='p-2 mt-2'>
                           <Text key={uniqueId + 'load-more'} className="mb-2 text-muted fw-bold">
                              <span style={{ fontSize: '11px' }}>Comments</span>
                           </Text>
                           {displayComments()}
                           {comments?.length === 0 && (
                              <Text key={uniqueId + 'load-more'} className="mb-2 text-muted">
                                 <span style={{ fontSize: '11px' }}>no comments for this post</span>
                              </Text>
                           )}
                           {comment && addComment}
                        </Card>
                     </div>

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
			</>
		)
	}

	return <>{content}</>
}
