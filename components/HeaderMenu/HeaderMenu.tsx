import {
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Menu,
    Collapse,
    ScrollArea,
    rem,
    useMantineTheme, Avatar,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconChevronDown,
    IconHeart,
    IconStar,
    IconMessage,
    IconSettings,
    IconSwitchHorizontal,
    IconLogout,
    IconPlayerPause,
    IconTrash,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import cx from 'clsx';
import classes from './HeaderMenu.module.css';
import { Logo } from '@/components/Logo/Logo';

const mockdata = [
    {
        icon: IconCode,
        title: 'Open source',
        description: 'This Pokémon’s cry is very loud and distracting',
    },
    {
        icon: IconCoin,
        title: 'Free for everyone',
        description: 'The fluid of Smeargle’s tail secretions changes',
    },
    {
        icon: IconBook,
        title: 'Documentation',
        description: 'Yanma is capable of seeing 360 degrees without',
    },
    {
        icon: IconFingerprint,
        title: 'Security',
        description: 'The shell’s rounded shape and the grooves on its.',
    },
    {
        icon: IconChartPie3,
        title: 'Analytics',
        description: 'This Pokémon uses its flying ability to quickly chase',
    },
    {
        icon: IconNotification,
        title: 'Notifications',
        description: 'Combusken battles with the intensely hot flames it spews',
    },
];

type User = {
    name: string;
    image: string;
};

const AvatarMenu = (user: User) => {
    const theme = useMantineTheme();
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    return (
        <div>
            <Menu
                width={260}
                position="bottom-end"
                transitionProps={{ transition: 'pop-top-right' }}
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
                withinPortal
            >
                <Menu.Target>
                    <UnstyledButton
                        className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                    >
                        <Group gap={7}>
                            <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                            <Text fw={500} size="sm" lh={1} mr={3}>
                                {user.name}
                            </Text>
                            <IconChevronDown
                                style={{
                                    width: rem(12),
                                    height: rem(12),
                                }}
                                stroke={1.5}
                            />
                        </Group>
                    </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item
                        leftSection={
                            <IconHeart
                                style={{
                                    width: rem(16),
                                    height: rem(16),
                                }}
                                color={theme.colors.red[6]}
                                stroke={1.5}
                            />
                        }
                    >
                        Liked posts
                    </Menu.Item>
                    <Menu.Item
                        leftSection={
                            <IconStar
                                style={{
                                    width: rem(16),
                                    height: rem(16),
                                }}
                                color={theme.colors.yellow[6]}
                                stroke={1.5}
                            />
                        }
                    >
                        Saved posts
                    </Menu.Item>
                    <Menu.Item
                        leftSection={
                            <IconMessage
                                style={{
                                    width: rem(16),
                                    height: rem(16),
                                }}
                                color={theme.colors.blue[6]}
                                stroke={1.5}
                            />
                        }
                    >
                        Your comments
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Label>Settings</Menu.Label>
                    <Menu.Item
                        leftSection={
                            <IconSettings
                                style={{
                                    width: rem(16),
                                    height: rem(16),
                                }}
                                stroke={1.5}
                            />
                        }
                    >
                        Account settings
                    </Menu.Item>
                    <Menu.Item
                        leftSection={
                            <IconSwitchHorizontal
                                style={{
                                    width: rem(16),
                                    height: rem(16),
                                }}
                                stroke={1.5}
                            />
                        }
                    >
                        Change account
                    </Menu.Item>
                    <Menu.Item
                        leftSection={
                            <IconLogout
                                color="red"
                                style={{
                                    width: rem(16),
                                    height: rem(16),
                                }}
                                stroke={1.5}
                            />
                        }
                    >
                        Logout
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
    );
};

export default function HeaderMenu() {
    const [drawerOpened, {
        toggle: toggleDrawer,
        close: closeDrawer,
    }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme = useMantineTheme();

    const links = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon
                        style={{
                            width: rem(22),
                            height: rem(22),
                        }}
                        color={theme.colors.blue[6]}
                    />
                </ThemeIcon>
                <div>
                    <Text size="sm" fw={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));

    return (
        <Box pb={120}>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <div>
                        <Logo size={32} />

                    </div>

                    <Group h="100%" gap={0} visibleFrom="sm">
                        <a href="#" className={classes.link}>
                            Home
                        </a>
                        <a href="shop" className={classes.link}>
                            Shop
                        </a>
                        <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                            <HoverCard.Target>
                                <a href="#" className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Rewards
                                        </Box>
                                        <IconChevronDown
                                            style={{
                                                width: rem(16),
                                                height: rem(16),
                                            }}
                                            color={theme.colors.blue[6]}
                                        />
                                    </Center>
                                </a>
                            </HoverCard.Target>

                            <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                                <Group justify="space-between" px="md">
                                    <Text fw={500}>Rewards</Text>
                                </Group>

                                <Divider my="sm" />

                                <SimpleGrid cols={2} spacing={0}>
                                    {links}
                                </SimpleGrid>
                            </HoverCard.Dropdown>
                        </HoverCard>
                    </Group>

                    <Group visibleFrom="sm">
                        <AvatarMenu name="test" image={"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80'"} />
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                    <Divider my="sm" />

                    <a href="#" className={classes.link}>
                        Home
                    </a>
                    <UnstyledButton className={classes.link} onClick={toggleLinks}>
                        <Center inline>
                            <Box component="span" mr={5}>
                                Features
                            </Box>
                            <IconChevronDown
                                style={{
                                    width: rem(16),
                                    height: rem(16),
                                }}
                                color={theme.colors.blue[6]}
                            />
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{links}</Collapse>

                    <Divider my="sm" />

                    <Group justify="center" grow pb="xl" px="md">
                        <Button variant="default" component={Link} href="login">
                            Get Started
                        </Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}
