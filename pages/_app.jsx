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
