import React from "react";
import { createStyles, Card, Image, Avatar, Text, Group } from "@mantine/core";

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
	},

	title: {
		fontWeight: 600,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		lineHeight: 1.2,
		fontSize: '0.8rem'
	},

	body: {
		padding: theme.spacing.sm,
	},
}));

export function NewsComponent() {
	const { classes } = useStyles();

	return (
		<Card withBorder radius="sm" p={0} className={classes.card}>
			<Group noWrap spacing={0}>
				{/* <Image src={'https://techcrunch.com/wp-content/uploads/2020/06/NSussman_Techcrunch_Exchange-multicolor.jpg?w=1390&crop=1'} height={25} width={25} /> */}
				<div className={classes.body}>
					<Text transform="uppercase" color="dimmed" weight={600} style={{fontSize: '0.65rem'}}>
						Market Analysis
					</Text>
					<Text className={` my-2 ${classes.title}`}>
						{"Empowering a new wave of health tech startups — with data"}
					</Text>
					<Group noWrap spacing="xs">
						<Text className="text-secondary" style={{fontSize: '0.7rem'}}>{"Anna Heim - published in techcrunch.com"}</Text>
					</Group>
				</div>
			</Group>
		</Card>
	);
}
