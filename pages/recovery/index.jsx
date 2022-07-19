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

export default function ForgotPassword() {
	const { classes } = useStyles();
	const [value, setValue] = useState("");
	const data =
		value.trim().length > 0 && !value.includes("@")
			? ["gmail.com", "outlook.com", "yahoo.com"].map((provider) => `${value}@${provider}`)
			: []
    ;
    
	return (
		<Container size={"sm"} my={30} style={{ marginTop: "10vh", maxWidth: "500px" }}>
			<Title className="fs-2" align="center">
				Oops.. Forgot your password?
			</Title>
			<Text className="mt-2" color="dimmed" size="sm" align="center">
				Don't worry, just type your email and get a recovery link
			</Text>

			<Paper withBorder shadow="md" p={30} radius="md" mt="xl">
				<Autocomplete
					required
					icon={<AiOutlineMail size={14} />}
					label="Email"
					onChange={setValue}
					placeholder="e-mail"
					data={data}
				/>
				<Group position="apart" mt="lg" className={classes.controls}>
					<Button size="sm" variant="light" color="gray" type="submit">
						Send recovery link
					</Button>
				</Group>
			</Paper>
		</Container>
	);
}
