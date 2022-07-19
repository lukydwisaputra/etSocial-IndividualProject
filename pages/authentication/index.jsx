import React, { useState } from "react";
import { Autocomplete, InputWrapper } from '@mantine/core';
import { useForm, useToggle, upperFirst } from "@mantine/hooks";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { PasswordComponent } from "../../components/form/PasswordComponent";
import {
	TextInput,
	PasswordInput,
	Text,
	Paper,
	Group,
	Button,
	Anchor,
    useMantineTheme
} from "@mantine/core";
import { At } from 'tabler-icons-react';
import Link from "next/link";

export default function AuthenticationForm(props) {
	const [type, toggle] = useToggle("login", ["login", "register"]);
    const theme = useMantineTheme();
    const btnColor = theme.colorScheme === "dark" ? 'light' : 'dark'

	const form = useForm({
		initialValues: {
			username: "",
			email: "",
			password: "",
            userOrEmailLogin: "",
            passwordLogin: "",
		},

		validationRules: {
            // username: (val) => val,
			email: (val) => /^\S+@\S+$/.test(val),
			password: (val) => val.length >= 6,
			userOrEmailLogin: (val) => /^\S+@\S+$/.test(val),
			passwordLogin: (val) => val.length >= 8,
		},
	});
    const [value, setValue] = useState('');
    const data =
        value.trim().length > 0 && !value.includes('@')
        ? ['gmail.com', 'outlook.com', 'yahoo.com'].map((provider) => `${value}@${provider}`)
        : []
    ;

    // console.log(form.values)

	return (
        <div className="container" style={{marginTop: '10vh', maxWidth: '500px'}}>
			<div className="container">
                <div>
                    <Text weight={700} className='fs-2 mb-4 text-center'>
                        {type === 'login' ? 'Welcome back to étSocial!' : 'Welcome to étSocial!'}
                    </Text>
                </div>
                <div>
                    <p className='text-center m-auto mb-5' style={{maxWidth: '300px'}}>
                        { 
                            type === 'login' ? "Keep create, discover and connect with the global community" : "Start create, discover and connect with the global community"
                        }
                    </p>
                </div>

                <Paper radius="md" p="xl" withBorder {...props}>
                    <Text size="lg" weight={700} className='mb-4'>
                        {(type).toUpperCase() + ' FORM'}
                    </Text>

                    <form onSubmit={form.onSubmit(() => {})}>
                        <Group direction="column" grow>
                            {
                                type === 'register' ? 
                                <>
                                    <TextInput
                                        required
                                        icon={<At size={14}/>}
                                        placeholder="username"
                                        value={form.values.username}
                                        onChange={(event) => form.setFieldValue("username", event.currentTarget.value)}
                                    />

                                    <Autocomplete
                                        required
                                        icon={<AiOutlineMail size={14}/>}
                                        value={value}
                                        onChange={setValue}
                                        placeholder="e-mail"
                                        data={data}
                                    />

                                    <PasswordComponent />

                                    <PasswordInput
                                        icon={<RiLockPasswordLine size={14}/>}
                                        required
                                        placeholder="repeat password"
                                        value={form.values.password}
                                        onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
                                        // error={form.errors.password && "Password should include at least 8 characters"}
                                    />
                                    <small className="text-muted">Strong password should include at least 8 characters including an uppercase letter, a symbol, and a number.</small>
                                </>
                                :
                                <>
                                    <TextInput
                                        required
                                        icon={<At size={14}/>}
                                        placeholder="username or email"
                                        value={form.values.userOrEmail}
                                        onChange={(event) => form.setFieldValue("userOrEmail", event.currentTarget.value)}
                                    />

                                    <PasswordInput
                                        icon={<RiLockPasswordLine size={14}/>}
                                        required
                                        placeholder="password"
                                        value={form.values.passwordLogin}
                                        onChange={(event) => form.setFieldValue("passwordLogin", event.currentTarget.value)}
                                        // error={form.errors.passwordLogin === "" ? "" : "Password should include at least 8 characters"}
                                    />
                                    <Link href="/recovery" passHref>
                                        <Anchor
                                            className="text-muted"
                                            component="a"
                                            size="xs"
                                        >
                                            Forgot password? 
                                        </Anchor>
                                    </Link>
                                </>
                                
                            }
                        </Group>

                        <Group position="apart" mt="xl">
                            <Anchor
                                className="text-muted fw-bold"
                                component="a"
                                color={btnColor}
                                onClick={() => toggle()}
                                size="xs"
                            >
                                {type === "register"
                                    ? "Already have an account? Login"
                                    : "Don't have an account? Register"}
                            </Anchor>
                            <Button variant="light" color="gray" type="submit">{upperFirst(type)}</Button>
                        </Group>
                    </form>
                </Paper>
            </div>
        </div>
	);
}
