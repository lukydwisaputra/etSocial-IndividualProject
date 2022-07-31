import React from "react";
import { createStyles, Avatar, Indicator, ActionIcon, Tooltip, Text, Menu } from "@mantine/core";
import { MdHomeFilled, MdBookmark, MdSearch } from "react-icons/md";
import { AiOutlinePlus, AiFillHeart } from "react-icons/ai";
import Link from "next/link";
import { ToggleThemeComponent } from "../navbar/ToggleThemeComponent";
import { useRouter } from "next/router";
import CreatePostComponent from "../post/CreatePostComponent";

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
	const rowStyle = "row mt-4";
	const borderStyle = "rgb(166,167,171, 0.2)";
	const avatarBgColor = theme.colorScheme === "dark" ? 'white' : 'rgb(26,27,30,0.7)';
	const border = `1px solid ${avatarBgColor}`;
	const { pathname } = useRouter();
	const allowedPage = ["/home", "/explore", "/liked", "/profile"];
	const iconSize = 17;
	const isAllowed = allowedPage.includes(pathname);

	return (
		<nav style={{zIndex: "5", marginTop: '6vh' }}>
			{isAllowed ? (
				<div>
					<div style={{ position: "fixed" }}>
						<hr className="mb-4" style={{ borderBottom: 'none', borderTop: border, marginTop: 0 }} />
						{/* Logo */}
						<div className={rowStyle}>
							<Link href="/home" passHref>
								<Text component="a" className="fs-3" style={{fontWeight: '500'}}>
									ét
								</Text>
							</Link>
						</div>
						<hr className="mt-4" style={{ borderBottom: 'none', borderTop: border }} />

						<div>
							{/* Home */}
							<div className={rowStyle}>
								<Tooltip position="right" withArrow transition="pop" label="Homé" size="xs">
									<Link href="/home" passHref>
										<ActionIcon
											component="button"
											className={buttonStyle}
											style={classes.theme}
										>
											<MdHomeFilled className="" size={iconSize} />
										</ActionIcon>
									</Link>
								</Tooltip>
							</div>
							{/* Explore */}
							<div className={rowStyle}>
								<Tooltip position="right" withArrow transition="pop" label="Exploré" size='xs'>
									<Link href="/explore" passHref>
										<ActionIcon
											component="button"
											className={buttonStyle}
											style={classes.theme}
										>
											<MdSearch size={iconSize} />
										</ActionIcon>
									</Link>
								</Tooltip>
							</div>
							{/* Bookmarks */}
							<div className={rowStyle}>
								<Tooltip position="right" withArrow transition="pop" label="Likéd" size='xs'>
									<Link href="/liked" passHref>
										<ActionIcon
											component="button"
											className={buttonStyle}
											style={classes.theme}
										>
											<AiFillHeart size={iconSize - 2} />
										</ActionIcon>
									</Link>
								</Tooltip>
							</div>
							{/* Theme Toggle */}
							<div className={rowStyle}>
								<Tooltip position="right" withArrow transition="pop" label="Try mé!" size='xs'>
									<ToggleThemeComponent />
								</Tooltip>
							</div>
							<hr className={rowStyle} style={{ borderTop: borderStyle }} />
							{/* Create a Post */}
							<div className={rowStyle}>
								<CreatePostComponent />
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
									<Tooltip position="right" withArrow transition="pop" label="Profilé" size='xs'>
										<ActionIcon
											component="button"
											className={buttonStyle}
											style={classes.theme}
										>
											<Indicator inline size={5} offset={-7.5} position="bottom-center" color="red">
												<Avatar
													src={
														"https://avatars.dicebear.com/api/identicon/your-custom-seed.svg?r=50&scale=84&flip=1&colors[]=amber&colors[]=blue&colors[]=blueGrey&colors[]=green&colors[]=grey&colors[]=lightGreen&colors[]=lime&colors[]=lightBlue&colors[]=indigo&colors[]=deepOrange&colorLevel=200"
													}
													radius="xl"
													size={22}
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
										<p className='m-auto text-muted'>Profilé</p>
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
				<div style={{ position: "fixed"}}>
					<hr className="mb-4" style={{ borderBottom: 'none', borderTop: border, marginTop: 0 }} />
					{/* Logo */}
					<div className={rowStyle}>
						<Link href="/home" passHref>
							<Text component="a" className="fs-3" style={{fontWeight: '500'}}>
								ét
							</Text>
						</Link>
					</div>
					<hr className="mt-4" style={{ borderBottom: 'none', borderTop: border }} />
					{/* Theme Toggle */}
					<div className={rowStyle}>
						<Tooltip position="right" withArrow transition="pop" label="Try me!" size='xs'>
							<ToggleThemeComponent />
						</Tooltip>
					</div>
				</div>
			)}
		</nav>
	);
}

export default LeftSidebarComponent;
