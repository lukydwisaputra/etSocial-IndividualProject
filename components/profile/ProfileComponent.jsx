import React, { useState } from "react";
import {
	Avatar,
	Text,
	Button,
	Paper,
	Group,
	Menu,
	ActionIcon,
	Modal,
	useMantineTheme,
	TextInput,
	Textarea,
} from "@mantine/core";
import {
	AiFillHeart,
	AiOutlineHeart,
	AiOutlineEdit,
	AiOutlineDelete,
	AiOutlineShareAlt,
} from "react-icons/ai";
import { useForm } from "@mantine/hooks";
import { At } from "tabler-icons-react";
import EditProfileComponent from "./EditProfileComponent";

export default function UserInfoAction() {
	const theme = useMantineTheme();
	const [value, setValue] = useState("");
	const avatarBgColor = theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2];

	const form = useForm({
		initialValues: {
			name: "",
			username: "",
			bio: "",
		},
	});

	let users = {
		name: "Luky Dwi Saputra",
		username: "lukydwisaputra",
		email: "lukydwisaputra@mail.com",
		bio: "Make It Anyway 🐙"
	}
	let { name, username, email, bio } = users;

	return (
		<Paper
			radius="md"
			withBorder
			p="lg"
			sx={(theme) => ({
				backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
			})}
		>
			{/* Criteria: Fullname, Bio, Username, Email, Profile Picture */}
			<div className="container">
				<div align="right">
					<ActionIcon variant="transparent">
						<EditProfileComponent form={form} users={users}/>
					</ActionIcon>
				</div>
			</div>
			<Avatar
				style={{ 
					border: "1px solid rgb(166,167,171, 0.3)", 
					marginTop: "-2vh",
					border: `1px solid ${
						theme.colorScheme === "dark" ? "white" : theme.colors.dark[7]
					}}`,
					backgroundColor: avatarBgColor
				}}
				src={
					"https://avatars.dicebear.com/api/identicon/your-custom-seed.svg?r=50&scale=84&flip=1&colors[]=amber&colors[]=blue&colors[]=blueGrey&colors[]=green&colors[]=grey&colors[]=lightGreen&colors[]=lime&colors[]=lightBlue&colors[]=indigo&colors[]=deepOrange&colorLevel=200"
				}
				size={60}
				radius={100}
				mx="auto"
			/>
			<Text align="center" size="sm" weight={500} className="mt-4">
				{name} • <span className="fw-light">@{username}</span>
			</Text>
			<Text align="center" color="dimmed" size="xs">
				{email}
			</Text>
			<Text align="center" size="xs" weight={500} className="mt-2">
				Bio:
			</Text>
			<Text align="center" color="dimmed" size="xs">
				{bio}
			</Text>
		</Paper>
	);
}
