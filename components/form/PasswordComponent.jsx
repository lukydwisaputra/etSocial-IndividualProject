import { useState } from "react";
import { PasswordInput, Progress, Text, Popover, Box } from "@mantine/core";
import { BsCheck } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

function PasswordRequirement({ meets, label }) {
	return (
		<Text
			color={meets ? "teal" : "red"}
			sx={{ display: "flex", alignItems: "center" }}
			mt={7}
			size="sm"
		>
			{meets ? <BsCheck color="teal" /> : <AiOutlineClose color="red" />} <Box ml={10}>{label}</Box>
		</Text>
	);
}

const requirements = [
	// { re: /[a-z]/, label: "Includes lowercase letter" },
	{ re: /[0-9]/, label: "Includes number" },
	{ re: /[A-Z]/, label: "Includes uppercase letter" },
	{ re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password) {
	let multiplier = password.length >= 8 ? 0 : 1;

	requirements.forEach((requirement) => {
		if (!requirement.re.test(password)) {
			multiplier += 1;
		}
	});

	return (Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10));
}

export function PasswordComponent() {
    const [popoverOpened, setPopoverOpened] = useState(false);
	const [value, setValue] = useState("");
	const checks = requirements.map((requirement, index) => (
        <PasswordRequirement
            key={index}
            label={requirement.label}
            meets={requirement.re.test(value)}
		/>
    ));
    
	const strength = getStrength(value);

    const indicator = (strength) => {
        let result  = '';

        switch (strength) {
            case 10:
                result = ''
                break;
            case 25:
                result = 'Weak 🥱'
                break;
            case 50:
                result = 'Medium 👀'
                break;
            case 75:
                result = 'Strong 💪🏽'
                break;
            case 100:
                result = 'Very Strong ⚡️'
                break;
            default:
                break;
        }
        return result;
    }

	return (
        <>
            <Popover
                opened={popoverOpened}
                position="bottom"
                placement="start"
                withArrow
                styles={{ popover: { width: "100%" } }}
                trapFocus={false}
                transition="pop-top-left"
                onFocusCapture={() => setPopoverOpened(true)}
                onBlurCapture={() => setPopoverOpened(false)}
                target={
                    <PasswordInput
                        required
                        icon={<RiLockPasswordLine size={14}/>}
                        placeholder="password"
                        onChange={(event) => { 
                            getStrength(value)
                            setValue(event.currentTarget.value)
                        }}
                    />
                }
            >
                <small className='text-muted fw-bold text-secondary'>{'Strength: ' + indicator(strength)} </small>
                <PasswordRequirement label="Includes at least 8 characters" meets={value.length >= 8} />
                {checks}
            </Popover>
        </>
	);
}
