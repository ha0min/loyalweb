import { ActionIcon, Anchor, Container, rem, Text } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import Link from 'next/link';
import classes from './Footer.module.css';
import { Logo } from '@/components/Logo/Logo';

const Footer = () => (
    <footer className={classes.footer}>
        <div className="wrapper">
            <Container className={classes.inner}>
                <div className={classes.logo}>
                    <Logo size={30} />
                    <Text size="xs" c="dimmed" className={classes.description}>
                        A loyality program that rewards you.
                    </Text>
                </div>
                <div className={classes.link}>
                    <ActionIcon
                        size="lg"
                        color="violet"
                        variant="transparent"
                        component="a"
                        href="https://github.com/ha0min/loyalweb"
                        target="_blank"
                    >
                        <IconBrandGithub
                            style={{
                            width: rem(18),
                            height: rem(18),
                        }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                </div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text c="dimmed" size="sm">
                    Made by Haomin with ❤
                </Text>
            </Container>
        </div>

    </footer>
);

export default Footer;
