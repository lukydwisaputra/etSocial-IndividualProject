import React from "react";
import {
	UnstyledButton,
	UnstyledButtonProps,
	Group,
	Avatar,
	Text,
	createStyles,
} from "@mantine/core";
import { ChevronRight } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
	user: {
		display: "block",
		width: "100%",
		color: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.dark[4],
		padding: 'auto 50px',

		// "&:hover": {
		// 	backgroundColor:
		// 		theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[2],
		// },
	},
}));

export default function UserButtonComponent({ image, name, email, icon, ...others }) {
	const { classes } = useStyles();
	const desktop = 'd-none d-sm-none d-md-none d-lg-block'

	return (
		<UnstyledButton className={classes.user} {...others}>
			
			<Group>
				<Avatar src={'https://avatars.dicebear.com/api/identicon/your-custom-seed.svg?r=50&scale=84&flip=1&colors[]=amber&colors[]=blue&colors[]=blueGrey&colors[]=green&colors[]=grey&colors[]=lightGreen&colors[]=lime&colors[]=lightBlue&colors[]=indigo&colors[]=deepOrange&colorLevel=200'} radius="xl" size={'sm'} />

				<div style={{ flex: 1 }}>
					<Text size="sm" weight={500} className={desktop}>
						@lukydwisaputra
					</Text>

					<Text color="dimmed" size="xs" className={desktop}>
						{email}
					</Text>
				</div>

				{icon || <ChevronRight size={14} className={desktop}/>}
			</Group>
		</UnstyledButton>
	);
}
