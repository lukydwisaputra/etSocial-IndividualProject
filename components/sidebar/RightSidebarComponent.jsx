import React from 'react';
import { Text, createStyles } from "@mantine/core";
import { useRouter } from 'next/router';
import { ArticleComponent } from './articles/ArticleComponent';
import { NewsComponent } from './news/NewsComponent';
import { BannerComponent } from './banner/BannerComponent';

const useStyles = createStyles((theme) => ({
	a: {
		color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[6],
		":hover": {
			color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[6],
		},
	},
}));

export default function RightSidebarComponent() {
    const { theme } = useStyles();
	const { pathname } = useRouter();

	const allowedPage = ['/home', '/explore', '/saved', 'profile']
	const isAllowed = allowedPage.includes(pathname);
	const isLoginUser = pathname.includes('home')
	const border = "1px solid rgb(166,167,171, 0.2)";

	return ( 
		<>
			{
				isAllowed &&
				<div className="sticky-top" style={{backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : 'white', zIndex: '5'}}>
					{/* tinggal tambah row aja */}
					<div className="row" style={{ height: '6vh', borderBottom: border}}>
						<div className="col-12 m-auto">
								<div className='container'>
									<Text className='fs-6 fw-bold ms-1'>What&apos;s new today?</Text>
								</div>
							</div>
						</div>
					<div className='row mt-4'>
						<div className="col-12">
							<div className='container'>
								<BannerComponent />
							</div>
						</div>
					</div>
					<div className='row'>
						<div className="col-12 m-auto" >
							<div className='container'>
								<Text className="fs-6 my-3 ms-1 fw-bold">Curated Articles</Text>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className="col-12">
							<div className='container'>
								<ArticleComponent />
							</div>
						</div>
					</div>
					<div className='row'>
						<div className="col-12 m-auto" >
							<div className='container'>
								<Text className="fs-6 my-3 ms-1 fw-bold">Latest News</Text>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className="col-12">
							<div className='container'>
								<NewsComponent />
							</div>
						</div>
					</div>
					<div className='row my-3'>
						<div className="col-12">
							<div className='container'>
								<NewsComponent />
							</div>
						</div>
					</div>
				</div>
			}
		</>
	);
}

