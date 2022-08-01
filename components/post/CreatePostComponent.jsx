import React, { useState } from "react";
import {
	Text,
	Textarea,
	ActionIcon,
	Modal,
	createStyles,
	useMantineTheme,
	Button,
} from "@mantine/core";
import { AiOutlinePlus, AiFillHeart } from "react-icons/ai";
import Image from "next/image";
import { useForm } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
	a: {
		color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[6],
		":hover": {
			color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[6],
		},
	},
}));

function CreatePostComponent() {
	const [opened, setOpened] = useState(false);
	const theme = useMantineTheme();
	const { classes } = useStyles();
	const iconSize = 17;
	const buttonStyle = "col-2";

	const form = useForm({
		initialValues: {
			name: "",
			username: "",
			bio: "",
		},
	});

	return (
		<div>
			<ActionIcon
				component="button"
				className={buttonStyle}
				style={classes.theme}
				onClick={() => {
					setOpened((prev) => (prev = true));
				}}
			>
				<AiOutlinePlus size={iconSize} />
			</ActionIcon>
			<Modal
				className="ms-1"
				size={"md"}
				centered
				opened={opened}
				onClose={() => setOpened((prev) => (prev = false))}
			>
				<div className="container" style={{ maxWidth: "300px" }}>
					<Text className=" fw-bold mb-5 text-center" style={{ marginTop: "-5vh" }}>
						Create a new post
					</Text>
					<div className="container">
						<Image
							radius={"sm"}
							src={require("../../public/assets/thumbnail-placeholder.png")}
							objectFit="cover"
							layout="responsive"
						/>
					</div>
					<Textarea
						size="xs"
						minRows={4}
						className="mt-3"
						placeholder="caption"
						value={form.values.username}
						variant="default"
						onChange={(event) => form.setFieldValue("username", event.currentTarget.value)}
					/>
					<div className="container text-end">
						<small style={{ fontSize: "0.7rem" }}>0/300</small>
					</div>
					<div className="mt-4 mb-2 text-center">
						<Button
							style={{ width: "100%" }}
							variant="default"
							size="xs"
							onClick={() => {
								// console.log(form.values);
							}}
						>
							Save
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default CreatePostComponent;
