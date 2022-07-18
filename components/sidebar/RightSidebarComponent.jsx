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
	const isLoginUser = pathname.includes('login') || pathname === '/';
	const border = "1px solid rgb(166,167,171, 0.2)";

	return ( 
		<>
			{
				!isLoginUser &&
				<div className="sticky-top" style={{backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : 'white', zIndex: '5'}}>
					{/* tinggal tambah row aja */}
					<div className="row" style={{ height:  '5vh', borderBottom: border}}>
						<div className="col-12  m-auto">
								<div className='container'>
									<Text className='fs-5 fw-bold'>What's new today?</Text>
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
								<Text className="fs-5 my-3 ms-2 fw-bold">Curated Articles</Text>
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
								<Text className="fs-5 my-3 ms-2 fw-bold">Latest News</Text>
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

