import React, { useState, useEffect } from "react";
import { createStyles, Avatar, Indicator, ActionIcon } from "@mantine/core";
import { MdHomeFilled, MdSearch, MdBookmark } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
	a: {
		color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[6],
		":hover": {
			color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[6],
		},
	},
}));

export default function MobileNavbarComponent() {
	const { classes, theme } = useStyles();
	const mobile = "d-lg-none";
	const buttonStyle = "col-2 m-auto";
	const avatarBgColor = theme.colorScheme === 'dark'
		? theme.colors.dark[7]
		: theme.colors.gray[2]
	;

	return (
		<nav
			className={`justify-content-between align-items-center fixed-bottom ${mobile}`}
			style={{
				backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : "white",
				// height: "6vh",
				padding: "1vh",
			}}
		>
			<div className="container text-center">
				<div className="row">
					{/* Home */}
					<Link href="/home" passHref>
						<ActionIcon component="button" className={buttonStyle} style={classes.theme}>
							<MdHomeFilled size={25} />
						</ActionIcon>
					</Link>
					{/* Explore */}
					<Link href="/explore" passHref>
						<ActionIcon component="button" className={buttonStyle} style={classes.theme}>
							<MdSearch size={25} />
						</ActionIcon>
					</Link>
					{/* Create a Post */}
					<Link href="/" passHref>
						<ActionIcon component="button" className="col-3 m-auto" style={classes.theme}>
							<AiOutlinePlus size={25} />
						</ActionIcon>
					</Link>
					{/* Bookmarks */}
					<Link href="/saved" passHref>
						<ActionIcon component="button" className={buttonStyle} style={classes.theme}>
							<MdBookmark size={22} />
						</ActionIcon>
					</Link>
					{/* Profile */}
					<Link href="/" passHref>
						<ActionIcon component="button" className={buttonStyle} style={classes.theme}>
							<Indicator inline size={7} offset={0} position="bottom-end" color="red">
								<Avatar
									src={
										"https://avatars.dicebear.com/api/identicon/your-custom-seed.svg?r=50&scale=84&flip=1&colors[]=amber&colors[]=blue&colors[]=blueGrey&colors[]=green&colors[]=grey&colors[]=lightGreen&colors[]=lime&colors[]=lightBlue&colors[]=indigo&colors[]=deepOrange&colorLevel=200"
									}
									radius="xl"
									size={20}
									style={{
										border: `1px solid ${
											theme.colorScheme === "dark" ? "white" : theme.colors.dark[7]
										}}`,
										backgroundColor: avatarBgColor
									}}
								/>
							</Indicator>
						</ActionIcon>
					</Link>
				</div>
			</div>
		</nav>
	);
}
