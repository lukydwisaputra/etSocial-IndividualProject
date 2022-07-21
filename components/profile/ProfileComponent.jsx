import React, { useState } from "react";
import {
	Avatar,
	Text,
	Button,
	Paper,
	Group,
	Menu,
	ActionIcon,
	Modal,
	useMantineTheme,
	TextInput,
    Textarea
} from "@mantine/core";
import {
	AiFillHeart,
	AiOutlineHeart,
	AiOutlineEdit,
	AiOutlineDelete,
	AiOutlineShareAlt,
} from "react-icons/ai";
import EditProfileComponent from "./EditProfileComponent";

export default function UserInfoAction() {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	const [value, setValue] = useState("");

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
					<div align="right">
						<ActionIcon variant="transparent">
							<AiOutlineEdit
								className="text-muted"
								size={15}
								onClick={() => {
									setOpened(true);
								}}
							/>
							<Modal
                                style={{marginTop: "5vh" }}
								centered
								opened={opened}
								onClose={() => setOpened(false)}
							>
                                <div className="text-center mb-4" style={{marginTop: "-5vh" }}>
                                    <Text className="fw-bold" style={{fontSize: '1rem', hover: 'none'}}>Edit Profilé</Text>
                                </div>
                                <Avatar
                                    style={{ border: "1px solid rgb(166,167,171, 0.3)"}}
                                    src={
                                        "https://avatars.dicebear.com/api/identicon/your-custom-seed.svg?r=50&scale=84&flip=1&colors[]=amber&colors[]=blue&colors[]=blueGrey&colors[]=green&colors[]=grey&colors[]=lightGreen&colors[]=lime&colors[]=lightBlue&colors[]=indigo&colors[]=deepOrange&colorLevel=200"
                                    }
                                    size={75}
                                    radius={100}
                                    mx="auto"
                                />
                                <div className="text-center mt-2">
                                    <Text style={{fontSize: '0.75rem'}} component="a">Change profile photo</Text>
                                </div>
								<TextInput
                                    className="mt-2"
                                    label="Name"
                                    value={'Luky Dwi Saputra'}
                                    variant='default'
									// value={value}
									onChange={(event) => setValue(event.currentTarget.value)}
								/>
								<TextInput
                                    className="mt-2"
                                    label="Username"
                                    value={'lukydwisaputra'}
                                    variant='default'
									// value={value}
									onChange={(event) => setValue(event.currentTarget.value)}
								/>
                                <Textarea
                                    className="mt-2"
                                    variant='default'
                                    value="Make It Anyway 🐙"
                                    label="Bio"
                                />
                                <div 
                                    className="mt-3 text-center"
                                >
                                    <Button variant="default" size="sm">
                                        Done
                                    </Button>
                                </div>
							</Modal>
						</ActionIcon>
					</div>
				</div>
				<Avatar
					style={{ border: "1px solid rgb(166,167,171, 0.3)", marginTop: "-2.5vh" }}
					src={
						"https://avatars.dicebear.com/api/identicon/your-custom-seed.svg?r=50&scale=84&flip=1&colors[]=amber&colors[]=blue&colors[]=blueGrey&colors[]=green&colors[]=grey&colors[]=lightGreen&colors[]=lime&colors[]=lightBlue&colors[]=indigo&colors[]=deepOrange&colorLevel=200"
					}
					size={75}
					radius={100}
					mx="auto"
				/>
				<Text align="center" size="sm" weight={500} className="mt-4">
					Luky Dwi Saputra • <span className="fw-light">@lukydwisaputra</span>
				</Text>
				<Text align="center" color="dimmed" size="xs">
					lukydwisaputra@mail.com
				</Text>
				<Text align="center" size="xs" weight={500} className="mt-2">
					Bio:
				</Text>
				<Text align="center" color="dimmed" size="xs">
					Make It Anyway 🐙
				</Text>
			</Paper>
			<div></div>
		</>
	);
}
