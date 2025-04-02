'use client'

import { Button, TextInput, Title } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useState } from "react";
import { TbUser } from "react-icons/tb";
import { useBasket } from "../contexts/BasketContext";
import { useUser } from '../contexts/UserContext';

export default function LoginForm({ onLogin }) {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useUser();
    const { updateBasket } = useBasket();

    const handleLogin = () => {
        if (username === "") {
            notifications.show({
                title: "Username is required",
                message: "Please enter your username",
                color: "red",
            });
            return;
        }
        setLoading(true);
        axios.get("/api/fetchUser?username=" + username).then((res) => {
            login(res.data.userData);
            updateBasket(res.data.basketData);
            modals.closeAll();
            onLogin?.(res.data.userData);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
            notifications.show({
                title: "Error!",
                message: err.response.data.error,
                styles: {
                    root: {
                        backgroundColor: "#eb525c",
                        boxShadow: "0px 2px 0px 1px #6e252a"
                    },
                    title: {
                        color: "#fff",
                        fontWeight: 700,
                    },
                    closeButton: {
                        color: "#fff",
                    },
                    description: {
                        color: "#fff",
                    }
                }
            });
        });
    }

    return (
        <>
            <Title order={2} ta="center" c="bright" fw={800}>Login to your account</Title>
            <TextInput
                mt="2rem"
                onKeyDown={getHotkeyHandler([['Enter', handleLogin]])}
                leftSection={<TbUser size="1.4rem" />}
                placeholder="Your in-game Minecraft username"
                size="xl"
                c="bright"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Button fullWidth mt="1rem" size="xl" fw={700} loading={loading} onClick={handleLogin}>Login</Button>
        </>
    );
}
