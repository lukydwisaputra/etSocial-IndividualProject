import React, {useEffect} from "react";
import {
	Card,
	Image,
	Text,
	Menu,
	Button,
	Group,
	useMantineTheme,
	Avatar,
	ActionIcon,
	Spoiler,
} from "@mantine/core";
import {
	AiFillHeart,
	AiOutlineHeart,
	AiOutlineEdit,
	AiOutlineDelete,
	AiOutlineShareAlt,
} from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import Link from "next/link";

export default function PostComponent({props}) {
	// let { avatar, username, images, caption, comments, postingTime} = props;
	let { id, id_user, post_image, caption, comments, created_at} = props;

	useEffect(() => {
		console.log(id)
	}, [props])

	const theme = useMantineTheme();
	const iconSize = 22;

	const secondaryColor =
		theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];
	const avatarBgColor = theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2];

	return (
		<>
			<div style={{ marginBottom: "1vh", marginTop: "1vh" }}>
				{/* <div className='container'> */}
				<div className="row">
					<Card shadow={"xs"}>
						<Card.Section>
							<Group className="mx-3 my-2" position="apart">
								<Link href="/profile" passHref>
									<Group style={{ cursor: "pointer" }}>
										<Avatar
											className="ms-1"
											radius="xl"
											size={20}
											style={{ backgroundColor: avatarBgColor }}
											// src={avatar}
										/>
										{/* <Text size="sm">{username}</Text> */}
									</Group>
								</Link>
								<Menu radius={"md"} shadow={"lg"} size={"sm"} placement="end" withArrow>
									<Menu.Item component="button">
										<Group>
											<AiOutlineShareAlt className="text-muted" />
											<p className="m-auto text-muted">Share Post</p>
										</Group>
									</Menu.Item>
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
								</Menu>
							</Group>
							<Image className="text-center" src={post_image} alt="etSocial-post"></Image>
						</Card.Section>

						<Group
							position="apart"
							className="my-3 mx-1"
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
									<AiOutlineHeart size={iconSize} color={secondaryColor} />
								</ActionIcon>
								<ActionIcon
									className="float-end"
									radius="sm"
									size={30}
									style={{ marginLeft: "-10px" }}
								>
									<BiComment size={iconSize - 1} color={secondaryColor} />
								</ActionIcon>
							</Group>
						</Group>

						<Group
							className="my-3 mx-1"
							spacing="xs"
							size="sm"
							style={{
								color: secondaryColor,
								lineHeight: 1.5,
								marginBottom: 5,
								marginTop: theme.spacing.sm,
							}}
						>
							<Avatar
								style={{ backgroundColor: avatarBgColor }}
								radius="xl"
								size={25}
								src={""}
							/>
							<Avatar
								style={{ marginLeft: "-20px", backgroundColor: avatarBgColor }}
								radius="xl"
								size={25}
								src={""}
							/>
							<Avatar
								style={{ marginLeft: "-20px", backgroundColor: avatarBgColor }}
								radius="xl"
								size={25}
								src={""}
							/>
							<small>
								liked by 
								{/* You and kalau user like */}
								<span className="fw-bold"> you</span> and 
								232.256 others
							</small>
						</Group>

						<Text
							className="mx-1"
							size="sm"
							style={{
								color: secondaryColor,
								lineHeight: 1.5,
								marginBottom: 5,
								marginTop: theme.spacing.sm,
							}}
						>
							<div>
								{/* 20 for every line of caption */}
								{
									caption && caption.length > 85 &&
									<Spoiler maxHeight={20} showLabel="... more" hideLabel='... hide' size={"xs"}>
										<Text size="sm" className="fw-bold" component="a">
											@lukydwisaputra{" "}
										</Text>
										<span size="sm">
											Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ipsum vitae tempora quia mollitia eveniet voluptate amet libero maiores quaerat.
											{/* {caption} */}
										</span>
									</Spoiler>
								}
								{
									caption && caption.length <= 85 &&
									<>
										<Text size="sm" className="fw-bold" component="a">
											@lukydwisaputra{" "}
										</Text>
										<span size="sm">
											{/* {caption} */}
											Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi veniam quidem ducimus voluptates ipsum officiis excepturi provident totam fugiat ex!
										</span>
									</>
								}
								{/* If caption > 85 characters spoiler active */}
								{/* <Text size="sm" className="fw-bold" component="a">
									@lukydwisaputra{" "}
								</Text>
								<span size="sm">
									With Fjord Tours you can explore more of the magical fjord landscapes
									with tours and activities on and around the fjords of Norway.
								</span> */}
							</div>
						</Text>
						{/* <Anchor href="/" target="_blank" style={{fontColor: theme.colors.gray[1]}}> */}
						{/* <div className="mx-1 text-secondary">
							<Text size="xs" component="a">
								View all {comments} comments
							</Text> */}
							{/* <small>View all 1.233 comments</small> */}
							{/* comment */}
							{/* <Group className="ms-2">
								<Text size="xs" component="a" className="fw-bold">another_people</Text>
								<Text style={{marginLeft: '-12px'}} size="xs">nice view 👀</Text>
							</Group>
						</div>
						<div className="mt-2">
							<small className="text-muted mx-1 mt-2">{postingTime}</small>
						</div> */}
					</Card>
				</div>
			</div>
		</>
	);
}
