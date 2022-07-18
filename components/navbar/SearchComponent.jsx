import React from "react";
import { TextInput, TextInputProps, ActionIcon, useMantineTheme } from "@mantine/core";
import { Search, ArrowRight, ArrowLeft } from "tabler-icons-react";

export function SearchComponent(props) {
	const theme = useMantineTheme();
	const desktop = "d-none d-sm-none d-md-block d-lg-block";

	return (
		<TextInput
			// style={{maxWidth: '500px'}}
			icon={<Search size={18} />}
			radius="xl"
			size="sm"
			color={theme.colorScheme === "dark" ? theme.primaryColor : "gray"}
			rightSection={
				<ActionIcon size={32} radius="xl" variant="default" className="border-0">
					<ArrowRight
						size={18}
						color={theme.colorScheme === "dark" ? theme.colors.gray[1] : theme.colors.gray[8]}
					/>
				</ActionIcon>
			}
			placeholder="Search"
			rightSectionWidth={42}
			className={desktop}
			// {...props}
		/>
	);
}
