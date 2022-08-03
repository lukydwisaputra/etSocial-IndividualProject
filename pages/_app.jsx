import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, ColorSchemeProvider, ColorScheme } from "@mantine/core";
import "bootstrap/dist/css/bootstrap.min.css";
import LayoutComponent from "../components/layout/LayoutComponent";

function MyApp({ Component, pageProps }) {
	const [colorScheme, setColorScheme] = useState('');

	const toggleColorScheme = () => {
		if (!colorScheme) {
			setColorScheme((current) => current = "dark");
			localStorage.setItem('etSocial_ui_theme', 'dark')
		} else {
			setColorScheme((current) => current = colorScheme === "light" ? "dark" : "light");
			localStorage.setItem('etSocial_ui_theme', colorScheme === "light" ? "dark" : "light")
		}
	};
	
	useEffect(() => {
		setColorScheme((current) => current = localStorage.getItem('etSocial_ui_theme'));
	}, [colorScheme])
	
	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
				<LayoutComponent>
					<Component {...pageProps} />
				</LayoutComponent>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}

export default MyApp;
