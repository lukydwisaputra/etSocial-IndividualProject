import React, { useState } from 'react';
import { Image, Text, Textarea, ActionIcon, Modal, createStyles, useMantineTheme, Button} from "@mantine/core";
import { AiOutlinePlus, AiFillHeart } from "react-icons/ai";
// import Image from 'next/image';
import Link from 'next/link';
import imgPlaceholder from '../../assets/images/thumbnail-placeholder.png';
import { useForm } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
	a: {
		color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[6],
		":hover": {
			color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[6],
		},
	},
}));


function CreatePostComponent() {
    const [opened, setOpened] = useState(false);
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const iconSize = 17;
    const buttonStyle = "col-2";

    const form = useForm({
		initialValues: {
			name: "",
			username: "",
			bio: "",
		},
	});

    return ( 
        <div>
            <ActionIcon
                component="button"
                className={buttonStyle}
                style={classes.theme}
                onClick={() => {
                    setOpened(prev => prev = true);
                }}
            >
                <AiOutlinePlus size={iconSize} />
            </ActionIcon>
            <Modal
                className='ms-1'
                size={'md'}
                centered
                opened={opened}
                onClose={() => setOpened(prev => prev = false)}
            >
                <div className='container'>
                    <Text className=' fw-bold mb-5 text-center' style={{marginTop:'-5vh'}}>
                        Create a new post
                    </Text>
                    <div className='container' style={{maxWidth: '200px'}}>
                        <div className='d-flex justify-content-center align-items-center p-0'>
                            <Image src={'https://images.unsplash.com/photo-1659247784906-8dacf685dea3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'} />
                        </div>
                    </div>
                    <Textarea
                        size='xs'
                        minRows={4}
                        className="mt-3"
                        placeholder="caption"
                        value={form.values.username}
                        variant="default"
                        onChange={(event) =>
                            form.setFieldValue("username", event.currentTarget.value)
                        }
                    />
                    <div className='container text-end'>
                        <small style={{fontSize: '0.7rem'}}>0/300</small>
                    </div>
                    <div className="mt-4 mb-2 text-center">
                        <Button
                            style={{width: '100%'}}
                            variant="default"
                            size="xs"
                            onClick={() => {
                                console.log(form.values);
                            }}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default CreatePostComponent;