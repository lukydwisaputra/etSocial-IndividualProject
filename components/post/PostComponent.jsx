import React from 'react';
import { Card, Image, Text, Menu, Button, Group, useMantineTheme, Avatar, ActionIcon, Spoiler } from '@mantine/core';
import { AiFillHeart, AiOutlineHeart, AiOutlineEdit, AiOutlineDelete, AiOutlineShareAlt } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaCommentAlt } from "react-icons/fa";
import { CommentComponent } from './CommentComponent';
import Link from "next/link";

export default function PostComponent(props) {
    const theme = useMantineTheme();

    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7]
    ;

    const avatarBgColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[2]
    ;

    const avatarPost =  (<Avatar radius="xl" size={25} style={{backgroundColor: avatarBgColor}} src={'https://avatars.dicebear.com/api/identicon/your-custom-seed.svg?r=50&scale=84&flip=1&colors[]=amber&colors[]=blue&colors[]=blueGrey&colors[]=green&colors[]=grey&colors[]=lightGreen&colors[]=lime&colors[]=lightBlue&colors[]=indigo&colors[]=deepOrange&colorLevel=200'} />)

    return ( 
        <> 
            <div style={{ marginBottom: "1vh", marginTop: '1vh', zIndex: "5"}}>
                <div className='container'>
                    <div className='row my-3'>
                        <Card shadow="xs" p="md" radius={'md'}>
                            <Card.Section>
                                <Group className='mx-3 my-3' position='apart'>
                                    <Link href="/profile" passHref>
                                        <Group style={{cursor: 'pointer'}}>
                                                {avatarPost}
                                                <Text size="sm">
                                                    lukydwisaputra
                                                </Text>
                                        </Group>
                                    </Link>
                                    <Menu radius={'md'} shadow={'lg'} size={'sm'} placement='end' withArrow>
                                        <Menu.Item component="button">
                                            <Group>
                                                <AiOutlineShareAlt className='text-muted' />
                                                <p className='m-auto text-muted'>Share Post</p>
                                            </Group>
                                        </Menu.Item>
                                        <Menu.Item component="button">
                                            <Group>
                                                <AiOutlineEdit className='text-muted' />
                                                <p className='m-auto text-muted'>Edit Caption</p>
                                            </Group>
                                        </Menu.Item>
                                        <Menu.Item component="button">
                                            <Group>
                                                <AiOutlineDelete className='text-muted' />
                                                <p className='m-auto text-muted'>Delete Post</p>
                                            </Group>
                                        </Menu.Item>
                                    </Menu>
                                </Group>
                                <Image src={props.image} alt="Norway">
                                
                                </Image>
                            </Card.Section>
                            
                            <Group position='apart' className='my-3 mx-1' spacing="xs" size="sm" style={{ color: secondaryColor, lineHeight: 1.5, marginBottom: 5, marginTop: theme.spacing.sm }}>
                                <Group>
                                    <ActionIcon radius="sm" size={25}>
                                        <AiFillHeart size={20} color='rgb(235,72,72,0.8)' />
                                    </ActionIcon>
                                    <ActionIcon className='float-end' radius="sm" size={25} style={{marginLeft: '-10px'}}>
                                        <FaCommentAlt size={17} color={secondaryColor}/>
                                    </ActionIcon>
                                </Group>

                                <ActionIcon className='float-end' radius="sm" size={25}>
                                    <BsBookmark size={17} />
                                </ActionIcon>
                            </Group>

                            <Group className='my-3 mx-1' spacing="xs" size="sm" style={{ color: secondaryColor, lineHeight: 1.5, marginBottom: 5, marginTop: theme.spacing.sm }}>
                                <Avatar style={{backgroundColor: avatarBgColor}} radius="xl" size={25} src={''} />
                                <Avatar style={{marginLeft: '-20px', backgroundColor: avatarBgColor}} radius="xl" size={25} src={''} />
                                <Avatar style={{marginLeft: '-20px', backgroundColor: avatarBgColor}} radius="xl" size={25} src={''} />
                                <small>liked by <span className='fw-bold'>you</span> and 232.256 others</small>
                            </Group>

                            <Text className='mx-1' size="sm" style={{ color: secondaryColor, lineHeight: 1.5, marginBottom: 5, marginTop: theme.spacing.sm }}>
                                
                                <div>
                                    {/* 20 for every line of caption */}
                                    {/* Using hide or not ? */}
                                    <Spoiler maxHeight={20} showLabel="... more" size={'xs'}> 
                                        <Text size='sm' className='fw-bold' component='a'>@lukydwisaputra </Text>
                                        <span size='sm'> 
                                            With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                                            activities on and around the fjords of Norway.
                                        </span>
                                    </Spoiler>
                                </div>
                            </Text>
                            {/* <Anchor href="/" target="_blank" style={{fontColor: theme.colors.gray[1]}}> */}
                            <div className='mx-1 text-secondary'>
                                <Text size='xs'component='a'>View all 1.233 comments</Text>
                                {/* <small>View all 1.233 comments</small> */}
                                <CommentComponent />
                            </div>
                            <div className='mt-2'>
                                <small className='text-muted mx-1 mt-2'>a few seconds ago</small>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
     );
}
