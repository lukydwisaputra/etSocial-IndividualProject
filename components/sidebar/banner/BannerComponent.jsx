import React from "react";
import { createStyles, Paper, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
	card: {
		position: "relative",
		overflow: "hidden",
		padding: theme.spacing.xs,
		paddingLeft: theme.spacing.md * 2,

		"&::before": {
			content: '""',
			position: "absolute",
			top: 0,
			bottom: 0,
			left: 0,
			width: 6,
			backgroundImage: theme.fn.linearGradient(0, theme.colors.pink[6], theme.colors.orange[6]),
		},
	},
}));

export function BannerComponent({ title, description }) {
	const { classes } = useStyles();
	return (
		<Paper withBorder radius="md" className={classes.card} style={{ bottom: "0px" }}>
			<Text size="md" weight={700} mt="xs">
				{"Howdy, lukydwisaputra!"}
			</Text>
			<Text size="sm" mt="xs" color="dimmed" className="mb-2">
				Welcome to <span className="fw-bold"> étSocial </span>. Enjoy 🤞🏼
			</Text>
		</Paper>
	);
}
