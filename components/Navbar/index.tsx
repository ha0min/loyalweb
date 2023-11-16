'use client';

import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
    IconHome2,
    IconGauge,
    IconDeviceDesktopAnalytics,
    IconFingerprint,
    IconUser,
    IconSettings,
    IconLogout,
    IconBuildingStore,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import classes from './Navbar.module.css';
import { Logo } from '@/components/Logo/Logo';

interface NavbarLinkProps {
    icon: typeof IconHome2;
    label: string;
    active?: boolean;
    onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton
                onClick={onClick}
                className={classes.link}
                data-active={active || undefined}
            >
                <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    );
}

const mockdata = [
    { icon: IconGauge, label: 'Dashboard', links: '/admin/dashboard' },
    { icon: IconDeviceDesktopAnalytics, label: 'Analytics', links: '/admin/analytics' },
    { icon: IconBuildingStore, label: 'Orders', links: '/admin/orders' },
    { icon: IconUser, label: 'Account', links: '/admin/account' },
    { icon: IconFingerprint, label: 'Rewards', links: '/admin/rewards' },
    { icon: IconSettings, label: 'Settings', links: '/admin/setting' },
];

export function NavbarMinimal() {
    const route = useRouter();
    const [active, setActive] = useState(0);

    const links = mockdata.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => {
                setActive(index);
                route.push(link.links);
            }}
        />
    ));

    return (
        <nav className={classes.navbar}>
            <Center>
                <Logo size={30} />
            </Center>

            <div className={classes.navbarMain}>
                <Stack justify="center" gap={0}>
                    {links}
                </Stack>
            </div>

            <Stack justify="center" gap={0}>
                <NavbarLink icon={IconLogout} label="Logout" />
            </Stack>
        </nav>
    );
}
