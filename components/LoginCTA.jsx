'use client'

import { Group, Image, Paper, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState } from "react";
import { TbBasket } from "react-icons/tb";
import { useBasket } from "../contexts/BasketContext";
import { useUser } from "../contexts/UserContext";
import Basket from "./Basket";
import LoginForm from "./LoginForm";

export default function LoginCTA() {
    const { user } = useUser();
    const { basket } = useBasket();
    const [basketOpened, setBasketOpened] = useState(false);

    const basketLength = basket?.data?.packages?.length || 0;

    const openModal = () => {
        if (!user) {
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
        } else {
            setBasketOpened(true);
        }
    }

    return (
        <>
            <Basket onClose={() => setBasketOpened(false)} forceOpen={basketOpened} hideIcon />

            <Paper onClick={openModal} className="login-cta hover-card pointer" mb="1rem" p="1rem">
                <Group gap="0.2rem">
                    {!user && <Text c="#000" size="xl" fw={700}>Login</Text>}
                    {user && <Group gap="0.4rem">
                        <TbBasket color="#000" size="1.4rem" />
                        <Text c="#000" size="xl" fw={700}>{basketLength} item{basketLength > 1 ? "s" : ""}</Text>
                    </Group>}
                </Group>
                <Text c="#000" size="lg">{!user ? "To start shopping" : `Shopping as ${user?.name}`}</Text>
                <Image pos="absolute" right="2rem" bottom="0" src={`https://visage.surgeplay.com/bust/128/${user?.id || "c1d3dcd0-5125-4910-9ac0-0b738ad39d5c"}`} alt="User" w={82} />
            </Paper>
        </>
    )
}
