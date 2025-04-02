'use client'

import { ActionIcon, Anchor, Badge, Box, Button, CloseButton, Drawer, Group, Image, NumberFormatter, Paper, ScrollArea, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { TbArrowLeft, TbBasket, TbChevronDown, TbChevronUp } from "react-icons/tb";
import { useBasket } from "../contexts/BasketContext";

export default function Basket({ user, forceOpen, onClose, hideIcon }) {
    const { basket } = useBasket();
    const [opened, setOpened] = useState(false);

    const subtotal = basket?.data?.packages?.reduce((acc, item) => acc + item.in_basket.price * item.in_basket.quantity, 0) || 0;

    return (
        <>
            {!hideIcon && <ActionIcon onClick={() => setOpened(true)} color="primary" w="3rem" h="3rem" pos="relative">
                {basket?.data?.packages?.length > 0 && (
                    <Box ta="center" fw={700} fz="sm" pos="absolute" bottom={4} right={3} w="1rem" h="1.2rem" bg="primary.5" c="#000" radius="50%" style={{ zIndex: 2 }}>
                        {basket?.data?.packages?.length}
                    </Box>
                )}
                <TbBasket color="#000" style={{ cursor: "pointer" }} size="1.8rem" />
            </ActionIcon>}

            <Drawer classNames={{ content: "drawer-content" }} zIndex={1000} styles={{ header: { display: "none" }, body: { height: "100%" } }} offset="1rem" position="right" opened={opened || forceOpen} onClose={() => {
                setOpened(false);
                onClose?.();
            }}>
                <ActionIcon c="#000" bg="#fff" pos="absolute" top="1rem" left="1rem" style={{ zIndex: 100000 }} onClick={() => setOpened(false)}>
                    <TbArrowLeft />
                </ActionIcon>
                <Stack justify="space-between" h="100%">
                    <ScrollArea offsetScrollbars type="always" my="1rem" mah="calc(100% - 7rem)" h="calc(100% - 7rem)">
                        <Stack>
                            {basket?.data?.packages.map((item, index) => (
                                <BasketItem item={item} basketIdent={basket.data.ident} key={index} />
                            ))}
                        </Stack>
                    </ScrollArea>
                    <div>
                        <Text mb="0.8rem" c="bright" size="xl" fw={600}>Total: <NumberFormatter value={subtotal} /></Text>
                        <Box>
                            <Button component={Anchor} href={basket?.data?.links?.checkout || "#"} disabled={!basket?.data?.packages?.length > 0} w="100%" size="lg" color="#0FF0EB">Checkout</Button>
                        </Box>
                    </div>
                </Stack>
            </Drawer>
        </>
    )
}

function BasketItem({ item, basketIdent }) {
    const { updateQuantity, removeFromBasket } = useBasket();
    const [loading, setLoading] = useState(false);

    const handleUpdateQuantity = (quantity) => {
        setLoading(true);
        if (quantity < 1) {
            removeFromBasket(basketIdent, item.id);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
            return;
        }
        updateQuantity(basketIdent, item.id, quantity);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    return (
        <Paper h="16rem" pos="relative">
            <Image src={item.image} alt={item.name} h="12rem" mx="auto" w="auto" />
            <Box pos="absolute" px="0.8rem" bottom="0.8rem" w="100%">
                <Group wrap="nowrap" justify="space-between" gap="0.4rem">
                    <Text c="bright" size="xl" fw={600}>{item.name}</Text>
                    <Group gap="0.4rem">
                        <Badge size="lg" variant="light" color="primary.5">
                            <NumberFormatter value={item.in_basket.price * item.in_basket.quantity} />
                        </Badge>
                        <Badge size="lg" c="#000" color="primary">
                            x{item.in_basket.quantity}
                        </Badge>
                        <Button.Group>
                            <Button loading={loading} h="1.6rem" p="0 0.2rem" variant="default" radius="md" onClick={() => handleUpdateQuantity(item.in_basket.quantity - 1)}>
                                <TbChevronDown color="var(--mantine-color-red-text)" />
                            </Button>
                            <Button loading={loading} h="1.6rem" p="0 0.2rem" variant="default" radius="md" onClick={() => handleUpdateQuantity(item.in_basket.quantity + 1)}>
                                <TbChevronUp color="var(--mantine-color-teal-text)" />
                            </Button>
                        </Button.Group>
                    </Group>
                </Group>
            </Box>
        </Paper>
    )
}

