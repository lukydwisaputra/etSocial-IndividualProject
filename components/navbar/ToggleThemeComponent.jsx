import React from "react";
import { useMantineColorScheme, ActionIcon, Group } from "@mantine/core";
import { Sun, MoonStars } from "tabler-icons-react";

export function ToggleThemeComponent() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const iconSize = 17;

	return (
		<Group position="flex">
			<ActionIcon
				onClick={() => toggleColorScheme()}
				size="md"
				radius={'xl'}
				sx={(theme) => ({
					backgroundColor: 'none',
						// theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
					color: theme.colorScheme === "dark" ? theme.colors.yellow[4] : theme.colors.blue[6],
				})}
			>
				{colorScheme === "dark" ? <Sun size={iconSize} /> : <MoonStars size={iconSize} />}
			</ActionIcon>
		</Group>
	);
}
