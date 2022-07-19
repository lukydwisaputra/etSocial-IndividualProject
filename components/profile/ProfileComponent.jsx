import React from "react";
import { Avatar, Text, Button, Paper, Group, Menu } from "@mantine/core";
import { AiFillHeart, AiOutlineHeart, AiOutlineEdit, AiOutlineDelete, AiOutlineShareAlt } from "react-icons/ai";

export default function UserInfoAction() {
	return (
        <>
            <Paper
                radius="md"
                withBorder
                p="lg"
                sx={(theme) => ({
                    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
                })}
            >
                {/* Criteria: Fullname, Bio, Username, Email, Profile Picture */}
                <div className="container">
                    <div align='right'>
                        <Menu radius={'md'} shadow={'lg'} size={'sm'} placement='end' withArrow>
                            <Menu.Item component="button">
                                <Group>
                                    <AiOutlineShareAlt className='text-muted' />
                                    <p className='m-auto text-muted'>Share Profile</p>
                                </Group>
                            </Menu.Item>
                            <Menu.Item component="button">
                                <Group>
                                    <AiOutlineEdit className='text-muted' />
                                    <p className='m-auto text-muted'>Edit Profile</p>
                                </Group>
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>
                <Avatar style={{border: '1px solid rgb(166,167,171, 0.3)', marginTop: '-2.5vh'}} src={"https://avatars.dicebear.com/api/identicon/your-custom-seed.svg?r=50&scale=84&flip=1&colors[]=amber&colors[]=blue&colors[]=blueGrey&colors[]=green&colors[]=grey&colors[]=lightGreen&colors[]=lime&colors[]=lightBlue&colors[]=indigo&colors[]=deepOrange&colorLevel=200"} size={75} radius={100} mx="auto" />
                <Text align="center" size="sm" weight={500} className='mt-4'>
                    Luky Dwi Saputra • <span className="fw-light">@lukydwisaputra</span>
                </Text>
                <Text align="center" color="dimmed" size="xs">
                    lukydwisaputra@mail.com
                </Text>
                <Text align="center" size="xs" weight={500} className='mt-2'>
                    Bio: 
                </Text>
                <Text align="center" color="dimmed" size="xs">
                    Make It Anyway 🐙
                </Text>
            </Paper>
            <div>

            </div>
        </>
	);
}
