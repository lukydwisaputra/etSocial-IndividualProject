import React from 'react';
import { createStyles, Paper, Text, Title, Button } from "@mantine/core";
import MenubarComponent from '../menubar/MenubarComponent';

const useStyles = createStyles((theme) => ({
	card: {
		height: 440,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "flex-start",
		backgroundSize: "cover",
		backgroundPosition: "center",
        margin : "auto"
	},

	title: {
		fontFamily: `Greycliff CF ${theme.fontFamily}`,
		fontWeight: 700,
		color: theme.white,
		lineHeight: 1.2,
		fontSize: 20,
		marginTop: theme.spacing.xs,
	},

	category: {
		color: theme.white,
		opacity: 0.7,
		fontWeight: 700,
		textTransform: "uppercase",
	},
}));

export default function AlbumComponent(props) {
    const desktop = "d-none d-sm-none d-md-none d-lg-block";
	const { classes } = useStyles();
    const bgImage = props.image;

	return (
        <div>
            <Paper
                shadow="md"
                p="md"
                radius="xs"
                sx={{ backgroundImage: `url(${bgImage})`, maxHeight: '12.5vh', maxWidth: '35vw'}}
                className={classes.card}
            >
                {/* <div>
                    <Text className={classes.category} size="xs">
                        @lukydwisaputra
                    </Text>
                    <Title order={3} className={classes.title}>
                    </Title>
                </div> */}
            </Paper>
        </div>
	);
}
