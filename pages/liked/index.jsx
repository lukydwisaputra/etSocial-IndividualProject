import React from 'react';
import AlbumComponent from '../../components/post/AlbumComponent';
import MenubarComponent from '../../components/menubar/MenubarComponent';
import Head from "next/head";
import axios from 'axios';
import { API_URL } from "../../helper/helper";

export default function SavedPage(props) {
    let contentClasses = 'col-4 p-1';

    return ( 
        <>
			<Head>
				<title>étSocial | Likéd</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
			</Head>
            <MenubarComponent title={'Likéd'} /> 
            <div className='container'>
                <div className='row'>
                    <div className={contentClasses}>
                        <AlbumComponent image='"https://images.unsplash.com/photo-1657664043009-c4975cb4eed3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"' />
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658158509859-34f343915bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658171757201-41b9aa2b3651?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658171757201-41b9aa2b3651?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image='"https://images.unsplash.com/photo-1657664043009-c4975cb4eed3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"' />
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658158509859-34f343915bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image='"https://images.unsplash.com/photo-1657664043009-c4975cb4eed3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"' />
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658158509859-34f343915bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658171757201-41b9aa2b3651?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658171757201-41b9aa2b3651?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image='"https://images.unsplash.com/photo-1657664043009-c4975cb4eed3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"' />
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658158509859-34f343915bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image='"https://images.unsplash.com/photo-1657664043009-c4975cb4eed3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"' />
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658158509859-34f343915bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658171757201-41b9aa2b3651?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658171757201-41b9aa2b3651?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image='"https://images.unsplash.com/photo-1657664043009-c4975cb4eed3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"' />
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658158509859-34f343915bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image='"https://images.unsplash.com/photo-1657664043009-c4975cb4eed3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"' />
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658158509859-34f343915bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658171757201-41b9aa2b3651?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658171757201-41b9aa2b3651?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image='"https://images.unsplash.com/photo-1657664043009-c4975cb4eed3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"' />
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658158509859-34f343915bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image='"https://images.unsplash.com/photo-1657664043009-c4975cb4eed3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"' />
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658158509859-34f343915bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658171757201-41b9aa2b3651?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658171757201-41b9aa2b3651?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image='"https://images.unsplash.com/photo-1657664043009-c4975cb4eed3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"' />
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658158509859-34f343915bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image='"https://images.unsplash.com/photo-1657664043009-c4975cb4eed3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"' />
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658158509859-34f343915bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658171757201-41b9aa2b3651?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658171757201-41b9aa2b3651?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image='"https://images.unsplash.com/photo-1657664043009-c4975cb4eed3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"' />
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658158509859-34f343915bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image='"https://images.unsplash.com/photo-1657664043009-c4975cb4eed3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"' />
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658158509859-34f343915bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658171757201-41b9aa2b3651?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658171757201-41b9aa2b3651?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image='"https://images.unsplash.com/photo-1657664043009-c4975cb4eed3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"' />
                    </div>
                    <div className={contentClasses}>
                        <AlbumComponent image="https://images.unsplash.com/photo-1658158509859-34f343915bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps = async (context) => {
    try {
        // console.log('Data Context Request', context);
		// let { avatar, username, images, caption, comments, postingTime} = props;
        let results = await axios.get(`${API_URL}/api/posts?id=1`)
        return {
            props: {
                posts: results.data.posts
            }
        }

    } catch(error) {
		console.log(error)
		return error;
	}
}