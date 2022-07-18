import React from "react";
import { Text, Group } from "@mantine/core";

export function CommentComponent(props) {
	return (
        <Group className="ms-2">
            <Text size="xs" component="a" className="fw-bold">another_people</Text>
            <Text style={{marginLeft: '-12px'}} size="xs">nice view 👀</Text>
        </Group>
	);
}
