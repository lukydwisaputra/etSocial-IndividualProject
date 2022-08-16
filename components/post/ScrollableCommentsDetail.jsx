import React, { useEffect, useState, useId } from 'react'
import { Text, createStyles, Skeleton, Group, ActionIcon, ScrollArea, Card, Textarea, Loader } from '@mantine/core'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../slices/userSlice'
import { getDetail } from '../../slices/detailSlice'
import { AiOutlineClose } from 'react-icons/ai'
import moment from 'moment'
import { resetDetail, setDetail } from '../../slices/detailSlice'
import { getAllPost } from '../../slices/postSlice'
import InfiniteScroll from 'react-infinite-scroll-component'
import { IoMdSend } from 'react-icons/io'
import axios from 'axios'
import { API_URL } from '../../helper/helper'
import { setPost } from '../../slices/postSlice'
import { useRouter } from 'next/router'

const useStyles = createStyles((theme) => ({
	a: {
		color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
		':hover': {
			color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
		},
	},
}))

export default function ScrollableCommentsComponent() {
	// HOOKS
	let user = useSelector(getUser)
	const [commentValue, setCommentValue] = useState('')
	const [sendComment, setSendComment] = useState(false)
	let posts = useSelector(getAllPost)
	let postDetail = useSelector(getDetail)
	const [loading, setLoading] = useState(true)
	const [commentLimit, setCommentLimit] = useState(5)
	const { theme } = useStyles()
	const dispatch = useDispatch()
   const { id } = useSelector(getUser)
   const router = useRouter()
	const {pathname} = useRouter()
   const uniqueId = useId()

	// VAR
	const border = '1px solid rgb(166,167,171, 0.2)'
	const postIndex = posts.findIndex((val) => val.id_post === postDetail.id_post)
	let comments = posts[postIndex]?.comments
	const devider = <hr className="my-2" style={{ borderBottom: 'none', borderTop: border }} />
	
	useEffect(() => {
		if (!pathname.includes('/post')) {
			dispatch(resetDetail())
		}
	})

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

	const displayComments = () => {
      let counter = 0
		let result = postDetail?.comments?.map((val, idx) => {
		if (idx < commentLimit) {
			counter ++
			return (
				<div key={uniqueId + idx + 'container'}>
					<Group key={uniqueId + idx + 'group'}>
						<Text className="fw-bold" style={{ fontSize: '11px', fontWeight: 900 }}>
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
					{devider}
					{/* ----- END TIME POSTED ----- */}
				</div>
			)
		} else {
			return
		}
	})

	if (counter < postDetail?.comments?.length) {
		result.push(
			<Text key={uniqueId + 'load-more'} className="mb-2 text-muted">
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

	return (
		<>
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
							<Group>
								<Text className="fs-6 fw-bold">Comments</Text>
							</Group>
						</div>
					</div>
				</div>
				{/* <div className="row">
					<div className="col-12 m-auto">
						<div className="container">
							<Text size="xs" className="fs-6 fw-bold ms-1 my-3">
								{postDetail.username}'s post
							</Text>
						</div>
					</div>
				</div> */}
				
				<div className="row">
					<div className="col-12 m-auto">
						<div
							className={`d-flex justify-content-center align-items-center px-2`}
							style={{ minHeight: '90vh' }}
						>
							<div className="container">
								<Card shadow="xs" p="md" radius={'md'}>
									<ScrollArea type="always" style={{ height: '60vh' }} offsetScrollbars scrollbarSize={2} scrollHideDelay={0}>
										{displayComments()}
									</ScrollArea>
									<div className='mt-3'>
										{
											comments?.length === 0 && (
												<Text key={uniqueId + 'load-more'} className="mb-2 text-muted">
													<span
														style={{ fontSize: '11px'}}
													>
														no comments for this post
													</span>
												</Text>
											)
										}
										{addComment}
									</div>
								</Card>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
