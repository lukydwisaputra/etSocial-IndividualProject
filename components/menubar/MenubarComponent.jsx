import React from 'react';
import Link from "next/link";
import { useMantineTheme, Text, ActionIcon } from "@mantine/core";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/router';

function MenubarComponent(props) {
    const theme = useMantineTheme();
    const border = "1px solid rgb(166,167,171, 0.2)";
    const router = useRouter();
    
    return ( 
        <div
            className="fixed-top d-none d-sm-none d-md-none d-lg-block"
        >
            <div className='container'>
                <div className="row" style={{ height: "5vh"}}>
                    <div className='col-1'></div>
                    <div className='col-7' style={{
                            backgroundColor:
                                theme.colorScheme === "dark" ? theme.colors.dark[7] : "white"
                        }}>
                        <div className="row border-sm-0" style={{ height: "5vh"}}>
                            <div className="col-1 m-auto d-none d-sm-none d-md-block d-lg-block " style={{ borderRight: border }}>
                                <ActionIcon component="button" onClick={() => router.back()}>
                                    <IoIosArrowBack size={25} />
                                </ActionIcon>
                            </div>
                            <div className="col-1 m-auto border-0 d-md-none d-lg-none" style={{ borderRight: border }}>
                                <ActionIcon component="button" onClick={() => router.back()}>
                                    <IoIosArrowBack size={25} />
                                </ActionIcon>
                            </div>
                            <div className="col-10 m-auto">
                                <Text className="fs-4 fw-bold">{props.title}</Text>
                            </div>
                        </div>
                    </div>
                    <div className='col-3'></div>
                </div>
            </div>
        </div>
    );
}

export default MenubarComponent;