import React from 'react'
import MenubarComponent from '../../components/menubar/MenubarComponent'
import { Text } from '@mantine/core'
import Link from 'next/link'
import Image from 'next/image'
import about_us_1 from '../../public/about/about_us_1.png'
import about_us_2 from '../../public/about/about_us_2.png'
import about_us_3 from '../../public/about/about_us_3.png'
import Head from 'next/head'
import Cookies from 'js-cookie'

export default function AboutPage() {
	// VAR
	const token = Cookies.get('token')

	return (
		<>
			<Head>
				<title>étSocial | About</title>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
			</Head>

			<div>
				<MenubarComponent title={'About'} />

				<div className="container">
					<div>
						<Text className="fs-3 fw-bold">étSocial</Text>
						<Text className="fs-6 mt-2 lead">A place to find and share inspiration.</Text>
					</div>

					<hr />

					<article style={{ marginTop: '2vh' }}>
						<Text className="fs-5 fw-bold mb-3">For creators, by creators</Text>

						<Image priority alt="about_us_1" radius={'sm'} src={about_us_1} objectFit="cover" layout="responsive" />

						<Text size='sm' className="mt-2 mb-4 fw-light" style={{ textAlign: 'justify' }}>
							Along the way, we&apos;ve built a vibrant platform of creators around the world who continue to inspire us and our evolution. Listening to their stories has helped us focus
							on three key elements: a creator-first editing experience with optionality and control; more ways to connect with other creators; and a transparent way to support
							themselves and the work they appreciate.
						</Text>
					</article>

					<hr />

					<article style={{ marginTop: '2vh', marginBottom: '2.5vh' }}>
						<Text className="fs-5 fw-bold mb-3" style={{ marginTop: '1vh' }}>
							Our inspiration today
						</Text>

						<Image priority alt="about_us_2" radius={'sm'} src={about_us_2} objectFit="cover" layout="responsive" />

						<Text size='sm' className="mt-2 mb-4 fw-light" style={{ textAlign: 'justify' }}>
							The way we express ourselves creatively is always changing. Whether we&apos;re on a shoot, experimenting for the next one, or simply capturing life, we&apos;re here to hone
							our craft, expand our perspective, and tell better stories. We&apos;re here to grow.
						</Text>
						{/* <Image radius={'sm'}  src={'https://assets-global.website-files.com/625d2a5ca1316da92392fd13/62af4edd501088c08b2cad24_cover.png'} height={350} width={'100%'} style={{marginTop: '5vh'}}/> */}

						<Image priority alt="about_us_3" radius={'sm'} src={about_us_3} objectFit="cover" layout="responsive" />

						<Text size='sm' className="mt-2 mb-4 fw-light" style={{ textAlign: 'justify' }}>
							We believe you are too. You&apos;re our inspiration. We believe that with the right creative tools, inspiring resources, and a supportive community, you can do anything.
							We&apos;re investing in you.
							{
								!token && 
								<Link href="/authentication" passHref>
									<span className="fw-bold" style={{ textDecoration: 'underline', cursor: 'pointer' }}>
										{' '}
										Join us!
									</span>
								</Link>
							}
						</Text>
					</article>
				</div>
			</div>
		</>
	)
}
