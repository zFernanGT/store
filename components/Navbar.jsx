"use client";

import {
    Anchor,
    Box,
    Burger,
    Button,
    Container,
    Drawer,
    Group,
    Image,
    NumberFormatter,
    ScrollArea,
    Stack,
    Text,
    rem
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TbCopy, TbHome, TbPaperclip, TbShoppingCart, TbUserFilled } from 'react-icons/tb';
import { settings } from '../settings';
import Basket from './Basket';
import LoginForm from './LoginForm';
import { useUser } from '../contexts/UserContext';

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function Navbar() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { user, loading } = useUser();
    const [copied, setCopied] = useState(false);
    const [onlinePlayers, setOnlinePlayers] = useState(0);
    const [scrolledToTop, setScrolledToTop] = useState(true);

    const openLoginModal = () => {
        closeDrawer();
        modals.open({
            children: <LoginForm />,
            size: "50rem",
            padding: "3rem",
            styles: {
                header: {
                    backgroundColor: "transparent",
                }
            }
        });
    }

    useEffect(() => {
        fetch(`https://api.mcsrvstat.us/2/${settings.server_ip}`).then(res => res.json()).then(data => {
            setOnlinePlayers(data.players.online);
        });

        const handleScroll = () => {
            setScrolledToTop(window.scrollY === 0);
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleCopyIP = () => {
        navigator.clipboard.writeText(settings.server_ip);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    return (
        <Box className={"navbar" + (scrolledToTop ? "" : " scrolled")}>
            <Container py="0.8rem">
                <header>
                    <Group pos="relative" style={{ zIndex: 5 }} justify="space-between" h="100%">
                        <Group gap="4rem">
                            <Link href="/">
                                <Image onClick={closeDrawer} style={{ zIndex: 10 }} src="/logo.png" alt={settings.server_name} w="auto" h={70} />
                            </Link>
                            <Group gap="2rem" h="100%" visibleFrom="md">
                                <Group td="none" c={scrolledToTop ? "#fff" : "bright"} component={Link} href="/" gap="0.4rem">
                                    <TbHome size="1.4rem" />
                                    <Text size="xl">HOME</Text>
                                </Group>
                                <Group td="none" c={scrolledToTop ? "#fff" : "bright"} component={Link} href="/store" gap="0.4rem">
                                    <TbShoppingCart size="1.4rem" />
                                    <Text size="xl">STORE</Text>
                                </Group>
                                <Group td="none" c={scrolledToTop ? "#fff" : "bright"} component={Link} href="/vote" gap="0.4rem">
                                    <TbPaperclip size="1.4rem" />
                                    <Text size="xl">VOTE</Text>
                                </Group>
                            </Group>
                        </Group>

                        <Group gap="2rem" visibleFrom="md">
                            <Group>
                                {!loading && user && (
                                    <Basket user={user} />
                                )}
                                {!loading && (
                                    <Button bg="primary" h="3.1rem" leftSection={<TbUserFilled />} size="lg" variant="login" onClick={openLoginModal}>
                                        <Text fw={600}>{!user ? "Login" : user?.name}</Text>
                                    </Button>
                                )}
                            </Group>
                            <Button className="play-button" onClick={handleCopyIP} size="lg">
                                <Stack align="center" gap={5}>
                                    <Text mb="-0.2rem" fw={700}>{copied ? "COPIED!" : <Text inherit span><NumberFormatter prefix="" value={onlinePlayers} /> ONLINE</Text>}</Text>
                                    <Group gap="0.2rem">
                                        <TbCopy size="0.9rem" />
                                        <Text mb="-2px" size="xs" mt="-0.2rem" fw={700}>{settings.server_ip}</Text>
                                    </Group>
                                </Stack>
                            </Button>
                        </Group>

                        <Burger color="#fff" style={{ zIndex: 10 }} opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="md" />
                    </Group>
                </header>
            </Container>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="20rem"
                closeButtonProps={{
                    c: "#fff"
                }}
                styles={{
                    header: {
                        backgroundColor: "transparent"
                    }
                }}
                title={<Link href="/"><Image src="/logo.png" alt={settings.server_name} w="auto" h={100} /></Link>}
                padding="md"
                hiddenFrom="md"
                zIndex={1000}
            >
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                    <Stack mx="1rem">
                        <Anchor onClick={closeDrawer} size="lg" fw={800} c="bright" component={Link} href="/">HOME</Anchor>
                        <Anchor onClick={closeDrawer} size="lg" fw={800} c="bright" component={Link} href="/store">STORE</Anchor>
                        <Anchor onClick={closeDrawer} size="lg" fw={800} c="bright" component={Link} href="/vote">VOTE</Anchor>
                        {(user !== null && user !== "") && (
                            <Basket key={new Date().getTime()} user={user} />
                        )}
                        {user !== null && (
                            <Button bg="primary" h="3.1rem" leftSection={<TbUserFilled />} size="lg" variant="login" onClick={openLoginModal}>
                                <Text fw={600}>{user === "" ? "Login" : user?.name}</Text>
                            </Button>
                        )}
                        <Button className="play-button" onClick={handleCopyIP} size="lg">
                            <Stack align="center" gap={5}>
                                <Text mb="-0.2rem" fw={700}>{copied ? "COPIED!" : <Text inherit span><NumberFormatter prefix="" value={onlinePlayers} /> ONLINE</Text>}</Text>
                                <Group gap="0.2rem">
                                    <TbCopy size="0.9rem" />
                                    <Text mb="-2px" size="xs" mt="-0.2rem" fw={700}>{settings.server_ip}</Text>
                                </Group>
                            </Stack>
                        </Button>
                    </Stack>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}

