import React, { useState } from "react";
import {
	createStyles,
	Paper,
	Title,
	Text,
	TextInput,
	Button,
	Container,
	Group,
	Autocomplete,
} from "@mantine/core";
import { AiOutlineMail } from "react-icons/ai";
import MenubarComponent from "../../components/menubar/MenubarComponent";
import Head from "next/head";
import axios from "axios";
import { API_URL } from "../../helper/helper";

const useStyles = createStyles((theme) => ({
	controls: {
		[theme.fn.smallerThan("xs")]: {
			flexDirection: "column-reverse",
		},
	},

	control: {
		[theme.fn.smallerThan("xs")]: {
			width: "100%",
			textAlign: "center",
		},
	},
}));

export default function ForgotPassword(props) {
	const border = `1px solid rgb(166,167,171, 0.2)`;
	const { classes } = useStyles();
	const [value, setValue] = useState("");
	const data =
		value.trim().length > 0 && !value.includes("@")
			? ["gmail.com", "outlook.com", "yahoo.com"].map((provider) => `${value}@${provider}`)
			: [];
	// console.log(value);
	return (
		<>
			<Head>
				<title>étSocial | Récovery</title>
				<link rel="icon" href="/favicon.ico" />
				{/* <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" /> */}
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1"
				></meta>
			</Head>
			<MenubarComponent title={"Récovery"} />
			<div
				className="d-flex justify-content-center align-items-center p-0"
				style={{ minHeight: "70vh", marginTop: "5vh" }}
			>
				<Container size={"sm"} my={30} style={{ maxWidth: "500px" }}>
					<Title className="fs-4" align="center">
						Oops..
					</Title>
					<Title className="fs-4" align="center">
						Forgot your password?
					</Title>
					<Text
						className="mt-2"
						color="dimmed"
						size="sm"
						align="center"
						style={{ marginBottom: "5vh" }}
					>
						Don&apos;t worry, just type your email and get a recovery link
					</Text>

					<Paper shadow="xs" p={30} radius="md" mt="xl" style={{ border: border }}>
						<Autocomplete
							required
							icon={<AiOutlineMail size={14} />}
							label="Email"
							onChange={setValue}
							placeholder="email"
							data={data}
							error={
								value === "" ? (
									""
								) : value.includes("@" && ".") ? (
									""
								) : (
									<small style={{ textAlign: "center" }}>
										please check your email format
									</small>
								)
							}
						/>
						<Group mt="lg" className={classes.controls}>
							<Button
								size="xs"
								variant="light"
								color="gray"
								type="submit"
								className="d-flex"
								onClick={() => {}}
							>
								Send recovery link
							</Button>
						</Group>
					</Paper>
				</Container>
			</div>
		</>
	);
}

// export const getServerSideProps = async (context) => {
//     try {
//         // console.log('Data Context Request', context);
// 		// let { avatar, username, images, caption, comments, postingTime} = props;
//         let results = await axios.get(`${API_URL}/api/posts?id=1`)
//         return {
//             props: {
//                 posts: results.data.posts
//             }
//         }

//     } catch(error) {
// 		console.log(error)
// 		return error;
// 	}
// }
