import React from 'react';
import { Text } from "@mantine/core";
import Link from "next/link";

function Custom404() {
    return ( 
        <div
            className="d-flex justify-content-center align-items-center p-0"
            style={{ minHeight: "70vh", marginTop: "7vh", marginBottom: "7vh" }}
		>
            <div className=''>
                    <Text className='fw-bold fs-5'>404 - PAGE NOT FOUND</Text>
                <Link href="/" passHref>
                    <Text className='mt-5 text-center' style={{textDecoration: 'underline'}}>back to the right path</Text>
                </Link>
            </div>
        </div>
     );
}

export default Custom404;