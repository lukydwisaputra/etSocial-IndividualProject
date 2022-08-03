import React from 'react';
import MenubarComponent from '../../components/menubar/MenubarComponent';
import axios from 'axios';
import { API_URL } from "../../helper/helper";

export default function ExplorePage(props) {
    const desktop = 'd-none d-sm-none d-md-none d-lg-block'
    return ( 
        <>
            <div className={desktop}>
                <MenubarComponent title={'Exploré'} /> 
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