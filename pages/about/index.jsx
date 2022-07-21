import React from 'react';
import MenubarComponent from '../../components/menubar/MenubarComponent';
import { useMantineTheme, Text, Button, Anchor, Image } from "@mantine/core";

function AboutPage() {
    const desktop = 'd-none d-sm-none d-md-none d-lg-block'

    return ( 
        <>
            <div style={{marginTop: '3vh'}}>
                <MenubarComponent title={'About'} /> 
                <div className="container">
					<div>
						<Text className="fs-1 fw-bold">étSocial</Text>
						<Text className="fs-5 mt-2 lead">A place to find and share inspiration.</Text>
					</div>
					<hr />
					<article style={{marginTop: '5vh'}}>
						<Text className="fs-4 fw-bold mb-3">For creators, by creators</Text>
						<Image radius={'sm'} src={'https://assets-global.website-files.com/624de812dd74b622858823f2/6279524f26c3395dc4c69c64_aboutus_02.png'} height={350} width={'100%'}/>
						<p className="mt-2 fw-light" style={{ textAlign: 'justify'}}>
							Along the way, we’ve built a vibrant platform of creators around the world who continue to inspire us and our evolution.
							Listening to their stories has helped us focus on three key elements: a creator-first editing experience with optionality and control; 
							more ways to connect with other creators; and a transparent way to support themselves and the work they appreciate.
						</p>
					</article>
					<hr />
					<article style={{marginTop: '5vh'}}>
						<Text className="fs-4 fw-bold mb-3" style={{marginTop: '1vh'}}>Our inspiration today</Text>
						<Image radius={'sm'}  src={'https://assets-global.website-files.com/625d2a5ca1316da92392fd13/627ec54754271955be4d6101_make%20it%20anyway-p-500.png'} height={350} width={'100%'}/>
						<p className="mt-2 fw-light" style={{ textAlign: 'justify'}}>The way we express ourselves creatively is always changing. Whether we’re on a shoot, experimenting for the next one, or simply capturing life, we’re here to hone our craft, expand our perspective, and tell better stories. We’re here to grow.</p>
						<Image radius={'sm'}  src={'https://assets-global.website-files.com/625d2a5ca1316da92392fd13/62af4edd501088c08b2cad24_cover.png'} height={350} width={'100%'} style={{marginTop: '5vh'}}/>
						<p className="mt-2 fw-light" style={{ textAlign: 'justify'}}>We believe you are too. You’re our inspiration. We believe that with the right creative tools, inspiring resources, and a supportive community, you can do anything. We’re investing in you. Join us.</p>
					</article>
					
				</div>
            </div>
        </>
     );
}

export default AboutPage;