import React, { useState, useId } from "react";
import { Autocomplete, InputWrapper } from "@mantine/core";
import { useForm, useToggle, upperFirst } from "@mantine/hooks";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { PasswordComponent } from "../../components/form/PasswordComponent";
import { At } from "tabler-icons-react";
import Link from "next/link";
import MenubarComponent from "../../components/menubar/MenubarComponent";
import {
	TextInput,
	PasswordInput,
	Text,
	Paper,
	Group,
	Button,
	Anchor,
	useMantineTheme,
} from "@mantine/core";
import Head from "next/head";

export default function AuthenticationForm(props) {
	const [type, toggle] = useToggle("login", ["login", "register"]);
	const [value, setValue] = useState("");
	const [isError, setIsError] = useState(false);
	const theme = useMantineTheme();
	const btnColor = theme.colorScheme === "dark" ? "light" : "dark";
	const border = `1px solid rgb(166,167,171, 0.2)`;
	let id = useId();

	const form = useForm({
		initialValues: {
			// register
			username: "",
			email: "",
			password: "",
			secondPassword: "",
			// login
			userOrEmailLogin: "",
			passwordLogin: "",
		},

		validationRules: {
			email: (val) => /^\S+@\S+$/.test(val),
			password: (val) => val.length >= 8,
			userOrEmailLogin: (val) => /^\S+@\S+$/.test(val),
			secondPassword: (val) => val === form.values.password,
		},
	});

	const data =
		value.trim().length > 0 && !value.includes("@")
			? ["gmail.com", "outlook.com", "yahoo.com"].map((provider) => `${value}@${provider}`)
			: [];
	const passwordComponentValue = (input) => {
		form.setFieldValue("password", input);
	};

	return (
		<>
			<Head>
				<title>étSocial | {type === "register" ? "Régister" : "Login"}</title>
				<link rel="icon" href="/favicon.ico" />
				{/* <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" /> */}
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1"
				></meta>
			</Head>
			<MenubarComponent title={"Authéntication"} />
			<div
				className="d-flex justify-content-center align-items-center p-0"
				style={{ minHeight: "70vh", marginTop: "7vh", marginBottom: "7vh" }}
			>
				<div className="container" style={{ maxWidth: "500px" }}>
					<div>
						<Text weight={700} className="fs-4 mb-25 text-center">
							{type === "login" ? "Welcome back to étSocial!" : "Welcome to étSocial!"}
						</Text>
					</div>
					<div style={{ marginBottom: "5vh" }}>
						<Text className="mt-2 mb-4" color="dimmed" size="sm" align="center">
							{type === "login"
								? "Keep create, discover and connect with the global community"
								: "Start create, discover and connect with the global community"}
						</Text>
					</div>

					<Paper radius="md" p="xl" shadow="sm" style={{ border: border }} {...props}>
						<Text size="sm" weight={700} className="mb-4 text-center">
							{type.toUpperCase() + " FORM"}
						</Text>

						<form onSubmit={form.onSubmit(() => {})}>
							<Group direction="column" grow>
								{type === "register" ? (
									<>
										<TextInput
											id={`username-${id}`}
											required
											icon={<At size={14} />}
											placeholder="username"
											value={form.values.username}
											onChange={(event) =>
												form.setFieldValue("username", event.currentTarget.value)
											}
										/>

										<Autocomplete
											id={`email-${id}`}
											required
											icon={<AiOutlineMail size={14} />}
											onChange={(input) => {
												setValue(input);
												form.setFieldValue("email", input);
											}}
											placeholder="email"
											data={data}
											error={
												form.values.email === "" ? (
													""
												) : form.values.email.includes("@") &&
												  form.values.email.includes(".") ? (
													""
												) : (
													<small style={{ textAlign: "left" }}>
														please check your email format
													</small>
												)
											}
										/>

										<PasswordComponent getValue={passwordComponentValue} />

										<PasswordInput
											id={`secondPassword-${id}`}
											icon={<RiLockPasswordLine size={14} />}
											required
											placeholder="repeat password"
											onChange={(event) => {
												form.setFieldValue("secondPassword", event.currentTarget.value);
												console.log(event.currentTarget.value === form.values.password);
												// form.setErrors("secondPassword", true)
											}}
											error={
												form.values.secondPassword === "" ? (
													""
												) : form.values.secondPassword === form.values.password ? (
													""
												) : (
													<small>password did not match</small>
												)
											}
										/>
									</>
								) : (
									<>
										<TextInput
											id={`userOrEmailLogin-${id}`}
											value={form.values.userOrEmailLogin}
											required
											icon={<At size={14} />}
											placeholder="username or email"
											onChange={(event) =>
												form.setFieldValue(
													"userOrEmailLogin",
													event.currentTarget.value
												)
											}
											error={""}
										/>

										<PasswordInput
											id={`passwordLogin-${id}`}
											icon={<RiLockPasswordLine size={14} />}
											required
											placeholder="password"
											onChange={(event) =>
												form.setFieldValue("passwordLogin", event.currentTarget.value)
											}
											// error={form.values.passwordLogin === "" ? "" : <small>password should include at least 8 characters</small>}
										/>
										<Link href="/recovery" passHref>
											<Anchor
												className="text-muted"
												component="a"
												size="xs"
												style={{ textAlign: "left" }}
											>
												Forgot password?
											</Anchor>
										</Link>
									</>
								)}
							</Group>

							<Group position="apart" mt="xl">
								<Anchor
									className="text-muted fw-bold"
									component="a"
									color={btnColor}
									onClick={() => {
										let formFields = [
											"email",
											"password",
											"passwordLogin",
											"secondPassword",
											"userOrEmailLogin",
											"username",
										];

										form.reset();
										toggle();
									}}
									size="xs"
								>
									{type === "register"
										? "Have an account? Login"
										: "Don't have an account? Register"}
								</Anchor>
								<Button
									variant="light"
									color="gray"
									type="submit"
									onClick={() => {
										console.log(form);
									}}
								>
									{upperFirst(type)}
								</Button>
							</Group>
						</form>
					</Paper>
				</div>
			</div>
		</>
	);
}
