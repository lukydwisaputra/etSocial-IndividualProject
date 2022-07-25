import React from 'react';
import MenubarComponent from '../../components/menubar/MenubarComponent';
import { Text } from "@mantine/core";
import Link from "next/link";
import Image from 'next/image';
import about_us_1 from '../../assets/images/about_us_1.png';
import about_us_2 from '../../assets/images/about_us_2.png';
import about_us_3 from '../../assets/images/about_us_3.png';
import Head from "next/head";

function AboutPage() {

    return ( 
        <>
			<Head>
				<title>étSocial | About</title>
				<link rel="icon" href="/favicon.ico" />
				{/* <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" /> */}
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
			</Head>
			
            <div>
                <MenubarComponent title={'About'} /> 
                <div className="container">
					<div>
						<Text className="fs-1 fw-bold">étSocial</Text>
						<Text className="fs-5 mt-2 lead">A place to find and share inspiration.</Text>
					</div>
					<hr />
					<article style={{marginTop: '5vh'}}>
						<Text className="fs-4 fw-bold mb-3">For creators, by creators</Text>
						<Image radius={'sm'} 
							src={about_us_1}
							objectFit='cover'
							layout='responsive'
						/>
						<p className="mt-2 fw-light" style={{ textAlign: 'justify'}}>
							Along the way, we’ve built a vibrant platform of creators around the world who continue to inspire us and our evolution.
							Listening to their stories has helped us focus on three key elements: a creator-first editing experience with optionality and control; 
							more ways to connect with other creators; and a transparent way to support themselves and the work they appreciate.
						</p>
					</article>
					<hr />
					<article style={{marginTop: '5vh', marginBottom: '2.5vh'}}>
						<Text className="fs-4 fw-bold mb-3" style={{marginTop: '1vh'}}>Our inspiration today</Text>
						<Image radius={'sm'} 
							src={about_us_2}
							objectFit='cover'
							layout='responsive'
						/>
						<p className="mt-2 fw-light" style={{ textAlign: 'justify'}}>The way we express ourselves creatively is always changing. Whether we’re on a shoot, experimenting for the next one, or simply capturing life, we’re here to hone our craft, expand our perspective, and tell better stories. We’re here to grow.</p>
						{/* <Image radius={'sm'}  src={'https://assets-global.website-files.com/625d2a5ca1316da92392fd13/62af4edd501088c08b2cad24_cover.png'} height={350} width={'100%'} style={{marginTop: '5vh'}}/> */}
						<Image radius={'sm'} 
							src={about_us_3}
							objectFit='cover'
							layout='responsive'
						/>
						<p className="mt-2 fw-light" style={{ textAlign: 'justify'}}>We believe you are too. You’re our inspiration. We believe that with the right creative tools, inspiring resources, and a supportive community, you can do anything. We’re investing in you. 
							<Link href="/authentication" passHref><span className='fw-bold' style={{textDecoration: 'underline', cursor: 'pointer'}}> Join us!</span></Link>
						</p>
					</article>
				</div>
            </div>
        </>
     );
}

export default AboutPage;