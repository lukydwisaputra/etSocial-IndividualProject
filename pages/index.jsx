import Head from "next/head";
import { useMantineTheme, Text, Button, Anchor, Image } from "@mantine/core";
import { BsArrowRight } from "react-icons/bs";
import { RiArrowDropRightLine } from "react-icons/ri";
import Link from "next/link";

export default function Home() {
	const theme = useMantineTheme();
	const btnColor = theme.colorScheme === "dark" ? 'gray' : 'dark';

	return (
		<div className="d-flex justify-content-center align-items-center text-center" style={{minHeight: '75vh'}}>
			{/* if user already login redirect to her home page */}
			{/* if user not login redirect to Login page */}
			{/*  justify-content-center align-items-center */}
			<div className="container">
				<div>
					<Text className="fs-1 fw-bold">étSocial</Text>
					<Text className="fs-3 mt-2 lead">A place to find and share inspiration.</Text>
				</div>
				<div style={{marginTop: '5vh'}}>
					<Link href="/authentication" target='_blank' passHref>
						<Button variant="outline" color={btnColor} radius={'0'} style={{marginTop: '1vh'}}>
							Get Started <span className="ms-3"><BsArrowRight /></span>
						</Button>
					</Link>
				</div>
				<div className="mt-2 text-muted">
					<Link href="/about" passHref>
						<small style={{cursor: 'pointer'}}>or, <span style={{textDecoration: 'underline'}}>Learn More</span></small>
					</Link>
				</div>
			</div>
		</div>
	);
}
