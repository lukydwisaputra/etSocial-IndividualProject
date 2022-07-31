import React, { useState} from 'react';
import {
	Modal,
    Text,
    TextInput,
    Textarea,
    Button,
    Avatar,
    useMantineTheme
} from "@mantine/core";
import { At } from "tabler-icons-react";
import {
	AiOutlineEdit,
} from "react-icons/ai";

function EditProfileComponent({ form, users}) {
    let { name, username, email, bio } = users;
    const [opened, setOpened] = useState(false);
    const theme = useMantineTheme();
    const avatarBgColor = theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2];

    return ( 
        <>
            <AiOutlineEdit
                className="text-muted"
                size={15}
                onClick={() => {
                    setOpened(true);
                    form.setFieldValue("name", name);
                    form.setFieldValue("username", username);
                    form.setFieldValue("bio", bio);
                }}
            />
            <Modal
                size={'sm'}
                style={{ marginTop: "5vh" }}
                centered
                opened={opened === true}
                onClose={() => setOpened(false)}
            >
                <div className="text-center mb-4" style={{ marginTop: "-3vh" }}>
                    <Text className="fw-bold" style={{ fontSize: "1rem", hover: "none" }}>
                        Edit Profilé
                    </Text>
                </div>
                <Avatar
                    style={{ 
                        border: "1px solid rgb(166,167,171, 0.3)",
                        backgroundColor: avatarBgColor
                    }}
                    src={
                        "https://avatars.dicebear.com/api/identicon/your-custom-seed.svg?r=50&scale=84&flip=1&colors[]=amber&colors[]=blue&colors[]=blueGrey&colors[]=green&colors[]=grey&colors[]=lightGreen&colors[]=lime&colors[]=lightBlue&colors[]=indigo&colors[]=deepOrange&colorLevel=200"
                    }
                    size={75}
                    radius={100}
                    mx="auto"
                />
                <div className="text-center mt-2">
                    <Text style={{ fontSize: "0.75rem" }} component="a">
                        Change profile photo
                    </Text>
                </div>
                <TextInput
                    className="mt-2"
                    label="Name"
                    value={form.values.name}
                    variant="default"
                    onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
                />
                <TextInput
                    icon={<At size={14} />}
                    className="mt-2"
                    label="Username"
                    value={form.values.username}
                    variant="default"
                    onChange={(event) =>
                        form.setFieldValue("username", event.currentTarget.value)
                    }
                />
                <Textarea
                    className="mt-2"
                    variant="default"
                    value={form.values.bio}
                    label="Bio"
                    onChange={(event) => form.setFieldValue("bio", event.currentTarget.value)}
                />
                <div className="mt-4 mb-2 text-center">
                    <Button
                        style={{width: '100%'}}
                        variant="default"
                        size="sm"
                        onClick={() => {
                            console.log(form.values);
                        }}
                    >
                        Save
                    </Button>
                </div>
            </Modal>
        </>
    );
}

export default EditProfileComponent;