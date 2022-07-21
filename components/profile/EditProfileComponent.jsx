import { useState } from "react";
import {
	Popover,
	Button,
	Group,
	TextInput,
	Avatar,
	Anchor,
	Text,
	ActionIcon,
	useMantineTheme,
    Textarea,
    Modal
} from "@mantine/core";
import { useForm, useMediaQuery } from "@mantine/hooks";
import { Edit } from "tabler-icons-react";
import DropzoneComponent from './DropzoneComponent';

function UserEditForm({ initialValues, onSubmit, onCancel }) {
	const isMobile = useMediaQuery("(max-width: 755px");

	const form = useForm({
		initialValues,
		validationRules: {
			name: (value) => value.trim().length > 2,
			email: (value) => value.trim().length > 2,
		},
	});

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<TextInput
				placeholder="Username"
				style={{ minWidth: isMobile ? 220 : 300 }}
				onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
				variant="default"
			/>

            <Textarea
                className="mt-3"
                placeholder="Bio"
                variant="default"
            />

            <DropzoneComponent />

			<Group position="apart" style={{ marginTop: 15 }}>
				<Anchor component="button" color="gray" size="sm" onClick={onCancel}>
					Cancel
				</Anchor>
				<Button type="submit" size="sm">
					Save
				</Button>
			</Group>
		</form>
	);
}

export default function EditProfileComponent() {
	const [values, setValues] = useState({ name: "Bob Handsome", email: "bob@handsome.inc" });
	const [opened, setOpened] = useState(false);
	const theme = useMantineTheme();

	return (
		<Group position="right">
			<Popover
				opened={opened}
				onClose={() => setOpened(false)}
				position="bottom"
				placement="end"
				withCloseButton
				title="Edit Profile"
				transition="pop-top-right"
				target={
					<ActionIcon
						// variant={theme.colorScheme === "dark" ? "hover" : "light"}
						onClick={() => setOpened((o) => !o)}
					>
						<Edit size={16} />
					</ActionIcon>
				}
			>
				<UserEditForm
					initialValues={values}
					onCancel={() => setOpened(false)}
					onSubmit={(data) => {
						setValues(data);
						setOpened(false);
					}}
				/>
			</Popover>
		</Group>
	);
}
