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

export default function AlbumComponent({ image }) {
    const desktop = "d-none d-sm-none d-md-block d-lg-block";
    const mobile = "d-md-none d-lg-none";
	const { classes } = useStyles();

	return (
        <div>
            <Paper
                shadow="md"
                p="md"
                radius="xs"
                sx={{ backgroundImage: `url(${image})`, maxHeight: '17.5vh', maxWidth: '35vw'}}
                className={`${classes.card} ${desktop}`}
            >
            </Paper>
            <Paper
                shadow="md"
                p="md"
                radius="xs"
                sx={{ backgroundImage: `url(${image})`, maxHeight: '12.5vh', maxWidth: '35vw'}}
                className={`${classes.card} ${mobile}`}
            >
            </Paper>
        </div>
	);
}
