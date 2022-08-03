import React from "react";
import ProfileComponent from "../../components/profile/ProfileComponent";
import AlbumComponent from "../../components/post/AlbumComponent";
import MenubarComponent from "../../components/menubar/MenubarComponent";
import axios from 'axios';
import { API_URL } from "../../helper/helper";

export default function ProfilePage(props) {
	let contentClasses = "col-4 p-1";

	return (
        <>
            <MenubarComponent title={'lukydwisaputra'} /> 
            <div className='container' style={{marginTop: '1vh', marginBottom: '1vh'}}>
                <div className='row'>
                    <ProfileComponent />
                </div>
            </div>
            <div className='container' style={{marginTop: '1vh', marginBottom: '1vh'}}>
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