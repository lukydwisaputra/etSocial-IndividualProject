import React, { useState } from "react";
import "../styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, ColorSchemeProvider, ColorScheme } from "@mantine/core";
import "bootstrap/dist/css/bootstrap.min.css";
import LayoutComponent from "../components/layout/LayoutComponent";

function MyApp({ Component, pageProps }) {
	const [colorScheme, setColorScheme] = useState("dark");

	const toggleColorScheme = () => {
		setColorScheme((current) => (current === "light" ? "dark" : "light"));
	};

	return (
		<>
			<Head>
				<title>étSocial</title>
				<link rel="icon" href="/favicon.ico" />
				{/* <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" /> */}
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
			</Head>

			<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
				<MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
					<LayoutComponent>
						<Component {...pageProps} />
					</LayoutComponent>
				</MantineProvider>
			</ColorSchemeProvider>
		</>
	);
}

export default MyApp;
