import React from "react";
import { createStyles, Paper, Text, Title, Button } from "@mantine/core";

const useStyles = createStyles((theme) => ({
	card: {
		height: 440,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "flex-start",
		backgroundSize: "cover",
		backgroundPosition: "center",
	},

	title: {
		fontFamily: `Greycliff CF ${theme.fontFamily}`,
		fontWeight: 900,
		color: theme.white,
		lineHeight: 1.2,
		fontSize: '0.8rem',
		marginTop: theme.spacing.xs,
		maxWidth: '70%'
	},

	category: {
		color: theme.white,
		opacity: 0.7,
		fontWeight: 700,
		fontSize: '0.65rem',
		textTransform: "uppercase",
	},
}));

export function ArticleComponent() {
	const { classes } = useStyles();
    const content = {
		image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1640&q=80",
		title: "The best laptop for Frontend engineers in 2022",
		category: "Technology"
	}

	return (
		<Paper
			shadow="md"
			p="md"
			radius="md"
			sx={{ backgroundImage: `url(${content.image})`, maxHeight: '12.5vw'}}
			className={classes.card}
		>
			<div>
				<Text className={classes.category} size="xs">
					{content.category}
				</Text>
				<Title order={3} className={classes.title}>
					{content.title}
				</Title>
			</div>
			<Button variant="light" color="dark" size="xs">
				Read article
			</Button>
		</Paper>
	);
}
