import React from 'react';
import { createStyles, Card, Image, Avatar, Text, Group } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));

export function NewsComponent({
  image,
  category,
  title,
  date,
  author,
}) {
  const { classes } = useStyles();
  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group noWrap spacing={0}>
        {/* <Image src={'https://techcrunch.com/wp-content/uploads/2020/06/NSussman_Techcrunch_Exchange-multicolor.jpg?w=1390&crop=1'} height={25} width={25} /> */}
        <div className={classes.body}>
          <Text transform="uppercase" color="dimmed" weight={700} size="xs">
            {'Market Analysis'}
          </Text>
          <Text className={classes.title} mt="xs" mb="md">
            {'Empowering a new wave of health tech startups — with data'}
          </Text>
          <Group noWrap spacing="xs">
            <Group spacing="xs" noWrap>
              <Text size="xs">{'Anna Heim - published in techcrunch.com'}</Text>
            </Group>
            {/* <Text size="xs" color="dimmed">
              •
            </Text> */}
            {/* <Text size="xs" color="dimmed">
              {'July 17, 2022'}
            </Text> */}
          </Group>
        </div>
      </Group>
    </Card>
  );
}