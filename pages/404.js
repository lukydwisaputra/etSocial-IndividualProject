import React from "react";
import { createStyles, Image, Container, Title, Text, Button, SimpleGrid } from "@mantine/core";
import image from '../public/404/404.svg';
import Link from "next/link";

const UseStyles = createStyles((theme) => ({
	root: {
		paddingTop: 50,
		paddingBottom: 80,
	},

	title: {
		fontWeight: 600,
		marginBottom: theme.spacing.md,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,

		[theme.fn.smallerThan("sm")]: {
			fontSize: 32,
		},
	},

	control: {
		[theme.fn.smallerThan("sm")]: {
			width: "100%",
		},
	},

	mobileImage: {
		[theme.fn.largerThan("sm")]: {
			display: "none",
		},
	},

	desktopImage: {
		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
	},
}));

export default function Custom404() {
	const { classes } = UseStyles();

	return (
        <div className="d-flex justify-content-center align-items-center p-0" style={{height: '90vh'}}>
            <Container className={classes.root}>
                <div className="mb-5">
                    <Image src={image.src} className={classes.mobileImage} alt='404.svg'/>
                    <Image src={image.src} className={classes.desktopImage} alt='404.svg'/>
                </div>
                <div>
                    <Title className={`${classes.title} fs-3`}>Something is not right...</Title>
                    <Text color="dimmed" size="sm" style={{textAlign: 'justify'}}>
                        Page you are trying to open does not exist. You may have mistyped the address, or
                        the page has been moved to another URL. If you think this is an error contact
                        support.
                    </Text>
                    <Link href="/home" passHref>
                        <Button variant="outline" size="sm" mt="xl" className={classes.control}>
                            Get back to home page
                        </Button>
                    </Link>
                </div>
            </Container>
        </div>
	);
}

