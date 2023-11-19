'use client';

import {
    HoverCard,
    Group,
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
    IconCoin,
    IconChevronDown,
    IconMessage,
    IconSettings,
    IconHistory,
    IconLogout,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import cx from 'clsx';
import { useRouter } from 'next/navigation';
import classes from './HeaderMenu.module.css';
import { Logo } from '@/components/Logo/Logo';
import { User } from '@/store/types/type';
import { useUserAtomLogout } from '@/store/userStoreUtils';
import {useCurrentUser, useLogout} from '@/api/user';

const RewardsMenu = [
    {
        icon: IconHistory,
        title: 'Rewards History',
        description: 'Look at your journey with us',
        url: '/user/rewards/history',
    },
    {
        icon: IconCoin,
        title: 'Redeem Rewards',
        description: 'Enjoy the rewards you have earned',
        url: '/user/rewards/redeem',
    },
];

const AvatarMenu = ({ user }: { user: User }) => {
    const theme = useMantineTheme();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const atomLogout = useUserAtomLogout();
    const route = useRouter();
    const { logout } = useLogout();

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
                            <Avatar src={user.avatar} alt={user.username} radius="xl" size={20} />
                            <Text fw={500} size="sm" lh={1} mr={3}>
                                {user.username}
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
                            <IconMessage
                                style={{
                                    width: rem(16),
                                    height: rem(16),
                                }}
                                color={theme.colors.blue[6]}
                                stroke={1.5}
                            />
                        }
                        component={Link}
                        href="/user/orders"
                    >
                        Your Orders
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
                        onClick={() => {
                            console.log('settings');
                            route.push('/user/profile');
                        }}
                    >
                        Profile settings
                    </Menu.Item>
                    <Menu.Item
                        onClick={() => {
                            console.log('logout');
                            console.log(user);
                            logout().then(() => {
                                atomLogout();
                                route.push('/');
                            }).catch((err) => {
                                console.log(err);
                            });
                        }}
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
    // const user = useAtomValue(userAtom);
    const {currentUser: user} = useCurrentUser();
    const theme = useMantineTheme();

    const links = RewardsMenu.map((item) => (
        <UnstyledButton
            className={classes.subLink}
            key={item.title}
            component={Link}
            href={item.url}
        >
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
        <Box>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <div>
                        <Logo size={32} />

                    </div>

                    <Group h="100%" gap={0} visibleFrom="sm">
                        <Link href="/user" className={classes.link}>
                            Home
                        </Link>
                        <Link href="/user/shop" className={classes.link}>
                            Shop
                        </Link>
                        <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                            <HoverCard.Target>
                                <Link href="#" className={classes.link}>
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
                                </Link>
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

                        <Link href="/user/orders" className={classes.link}>
                            Orders
                        </Link>
                    </Group>

                    <Group visibleFrom="sm">
                        <AvatarMenu
                            user={user}
                        />
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

                    <Link href="/" className={classes.link}>
                        Home
                    </Link>
                    <Link href="/user/shop" className={classes.link}>
                        Shop
                    </Link>
                    <UnstyledButton className={classes.link} onClick={toggleLinks}>
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
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{links}</Collapse>

                    <Divider my="sm" />

                    <Link href="/user/orders" className={classes.link}>
                        Orders
                    </Link>
                    <Group visibleFrom="sm">
                        <AvatarMenu
                            user={user}
                        />
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}
