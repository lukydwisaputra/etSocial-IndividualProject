import React, { useEffect, useState } from 'react'
import '../styles/globals.css'
import { MantineProvider, ColorSchemeProvider } from '@mantine/core'
import 'bootstrap/dist/css/bootstrap.min.css'
import LayoutComponent from '../components/layout/LayoutComponent'
import Cookies from 'js-cookie'
import { store } from '../store'
import { Provider } from 'react-redux'

export default function MyApp({ Component, pageProps }) {
	// HOOKS
	const [colorScheme, setColorScheme] = useState('')

	// VAR
	const toggleColorScheme = () => {
		setColorScheme((current) => (current = colorScheme === 'light' ? 'dark' : 'light'))
		Cookies.set('etSocial_ui_theme', colorScheme === 'light' ? 'dark' : 'light', { expires: 1 })
	}

	useEffect(() => {
		if (!Cookies.get('etSocial_ui_theme')) {
			Cookies.set('etSocial_ui_theme', 'dark', { expires: 1 })
		}
		setColorScheme((current) => (current = Cookies.get('etSocial_ui_theme')))
	}, [colorScheme])

	return (
		<Provider store={store}>
			<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
				<MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
					<LayoutComponent>
						<Component {...pageProps} />
					</LayoutComponent>
				</MantineProvider>
			</ColorSchemeProvider>
		</Provider>
	)
}
