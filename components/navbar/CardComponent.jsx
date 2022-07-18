import React from "react";
import { Heart } from "tabler-icons-react";
import {
	Card,
	Image,
	Text,
	Group,
	Badge,
	Button,
	ActionIcon,
	createStyles,
	useMantineTheme,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
	},

	section: {
		borderBottom: `1px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
		paddingBottom: theme.spacing.md,
	},

	like: {
		color: theme.colors.red[6],
	},

	label: {
		textTransform: "uppercase",
		fontSize: theme.fontSizes.xs,
		fontWeight: 700,
	},
}));

// interface BadgeCardProps {
//   image: string;
//   title: string;
//   country: string;
//   description: string;
//   badges: {
//     emoji: string;
//     label: string;
//   }[];
// }

export function CardComponent({ image, title, description, country, badges }) {
	const { classes } = useStyles();
	const theme = useMantineTheme();

	// const features = badges.map((badge) => (
	//   <Badge
	//     color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
	//     key={badge.label}
	//     leftSection={badge.emoji}
	//   >
	//     {/* {badge.label} */}
	//     LABEL
	//   </Badge>
	// ));

	return (
		<Card withBorder radius="md" p="md" className={classes.card}>
			<Card.Section>
				<Image
					src={
						"https://images.unsplash.com/photo-1657702980735-3e2130fa00da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
					}
					alt={title}
					height={180}
				/>
			</Card.Section>

			<Card.Section className={classes.section} mt="md">
				<Group position="apart">
					<Text size="lg" weight={500}>
						{/* {title} */}
						TITLE
					</Text>
					{/* <Badge size="sm">{country}</Badge> */}
					COUNTRY
				</Group>
				<Text size="sm" mt="xs">
					{description}
				</Text>
			</Card.Section>

			<Card.Section className={classes.section}>
				<Text mt="md" className={classes.label} color="dimmed">
					Perfect for you, if you enjoy
				</Text>
				<Group spacing={7} mt={5}>
					{/* {features} */}
					FEATURES
				</Group>
			</Card.Section>

			<Group mt="xs">
				<Button radius="md" style={{ flex: 1 }}>
					Show details
				</Button>
				<ActionIcon variant="default" radius="md" size={36}>
					<Heart size={18} className={classes.like} />
				</ActionIcon>
			</Group>
		</Card>
	);
}
