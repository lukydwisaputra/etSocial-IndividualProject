import React from "react";
import { createStyles, Avatar, Indicator, ActionIcon, Tooltip, Text, Menu } from "@mantine/core";
import { MdHomeFilled, MdBookmark, MdSearch } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import { ToggleThemeComponent } from "../navbar/ToggleThemeComponent";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
	a: {
		color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[6],
		":hover": {
			color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[6],
		},
	},
}));

function LeftSidebarComponent() {
	const { classes, theme } = useStyles();
	const buttonStyle = "col-2";
	const rowStyle = "row mt-5";
	const borderStyle = "rgb(166,167,171, 0.2)";
	const avatarBgColor = theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2];
	const { pathname } = useRouter();
	const allowedPage = ["/home", "/explore", "/saved", "/profile"];
	// ganti jadi kalau user beneran udah login
	const isAllowed = allowedPage.includes(pathname);

	return (
		<nav style={{ height: "100%", zIndex: "5" }}>
			{isAllowed ? (
				<div>
					<div style={{ position: "fixed", top: "1.5%" }}>
						<hr className={rowStyle} style={{ border: "none", borderTop: borderStyle }} />
						{/* Logo */}
						<div className={rowStyle}>
							<Link href="/home" passHref>
								<Text component="a" className="fs-1 fw-bold">
									ét
								</Text>
							</Link>
						</div>
						<hr className={rowStyle} style={{ border: "none", borderTop: borderStyle }} />

						<div>
							{/* Home */}
							<div className={rowStyle}>
								<Tooltip size="sm" position="right" withArrow transition="pop" label="Home">
									<Link href="/home" passHref>
										<ActionIcon
											component="button"
											className={buttonStyle}
											style={classes.theme}
										>
											<MdHomeFilled className="" size={25} />
										</ActionIcon>
									</Link>
								</Tooltip>
							</div>
							{/* Explore */}
							<div className={rowStyle}>
								<Tooltip position="right" withArrow transition="pop" label="Explore">
									<Link href="/explore" passHref>
										<ActionIcon
											component="button"
											className={buttonStyle}
											style={classes.theme}
										>
											<MdSearch size={25} />
										</ActionIcon>
									</Link>
								</Tooltip>
							</div>
							{/* Bookmarks */}
							<div className={rowStyle}>
								<Tooltip position="right" withArrow transition="pop" label="Saved">
									<Link href="/saved" passHref>
										<ActionIcon
											component="button"
											className={buttonStyle}
											style={classes.theme}
										>
											<MdBookmark size={22} />
										</ActionIcon>
									</Link>
								</Tooltip>
							</div>
							{/* Theme Toggle */}
							<div className={rowStyle}>
								<Tooltip position="right" withArrow transition="pop" label="Try me!">
									<ToggleThemeComponent />
								</Tooltip>
							</div>
							<hr className={rowStyle} style={{ borderTop: borderStyle }} />
							{/* Create a Post */}
							<div className={rowStyle}>
								<Tooltip position="right" withArrow transition="pop" label="Create a Post">
									<ActionIcon
										component="button"
										className={buttonStyle}
										style={classes.theme}
									>
										<AiOutlinePlus size={25} />
									</ActionIcon>
								</Tooltip>
							</div>
						</div>
					</div>
					<div style={{ position: "fixed", bottom: "2.5%" }}>
						{/* Profile */}
						<div className={rowStyle}>
							<Menu
								withArrow
								size={'xs'}
								control={
									<Tooltip position="right" withArrow transition="pop" label="Profile">
										<ActionIcon
											component="button"
											className={buttonStyle}
											style={classes.theme}
										>
											<Indicator inline size={10} offset={0} position="bottom-end" color="green">
												<Avatar
													src={
														"https://avatars.dicebear.com/api/identicon/your-custom-seed.svg?r=50&scale=84&flip=1&colors[]=amber&colors[]=blue&colors[]=blueGrey&colors[]=green&colors[]=grey&colors[]=lightGreen&colors[]=lime&colors[]=lightBlue&colors[]=indigo&colors[]=deepOrange&colorLevel=200"
													}
													radius="xl"
													size={30}
													style={{
														border: `1px solid ${
															theme.colorScheme === "dark" ? "white" : theme.colors.dark[7]
														}}`,
														backgroundColor: avatarBgColor,
													}}
												/>
											</Indicator>
										</ActionIcon>
									</Tooltip>
								}
							>
								<Menu.Item>
									<Link href="/profile" passHref>
										<p className='m-auto text-muted'>Profile</p>
									</Link>
								</Menu.Item>

								<Menu.Item>
									<Link href="/" passHref>
										<p className='m-auto text-muted'>Sign Out</p>
									</Link>
								</Menu.Item>
							</Menu>

						</div>
					</div>
				</div>
			) : (
				<div style={{ position: "fixed", top: "1.5%" }}>
					<hr className={rowStyle} style={{ border: "none", borderTop: borderStyle }} />
					{/* Logo */}
					<div className={rowStyle}>
						<Link href="/home" passHref>
							<Text component="a" className="fs-1 fw-bold">
								ét
							</Text>
						</Link>
					</div>
					<hr className={rowStyle} style={{ border: "none", borderTop: borderStyle }} />
					{/* Theme Toggle */}
					<div className={rowStyle}>
						<Tooltip position="right" withArrow transition="pop" label="Try me!">
							<ToggleThemeComponent />
						</Tooltip>
					</div>
				</div>
			)}
		</nav>
	);
}

export default LeftSidebarComponent;
