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

export async function getServerSideProps(context) {
	let token = context.req.cookies?.token
	if (!token) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	} 

	if (dataUser.users.status === 'unverified') {
		return {
			redirect: {
				destination: '/home/unverified',
				permanent: false,
			},
		}
	}

	return {
		props: {}
	}
}