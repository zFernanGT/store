'use client'

import { Box, Button, darken } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { TbShoppingCart } from "react-icons/tb";
import { useBasket } from "../contexts/BasketContext";
import LoginForm from "./LoginForm";

export default function AddToCartButton({ package_id, quantity = 1, children, extraProps, onComplete, overrideText }) {
    const [loading, setLoading] = useState(false);
    const { basket, addToBasket } = useBasket();

    const handleAddToCart = async (event) => {
        event.stopPropagation();
        setLoading(true);

        try {
            if (!basket?.data?.ident) {
                modals.open({
                    children: <LoginForm onLogin={() => window.location.reload()} />,
                    withCloseButton: false,
                    onClose: () => setLoading(false),
                    size: "50rem",
                    padding: "4rem"
                });
                return;
            }

            const data = await addToBasket(basket.data.ident, package_id, quantity);
            notifications.show({
                title: "Product added!",
                message: data.message,
                styles: {
                    root: {
                        backgroundColor: "var(--mantine-color-primary-5)",
                        boxShadow: "0px 2px 0px 1px " + darken("var(--mantine-color-primary-5)", 0.5),
                    },
                    title: {
                        color: "#000",
                        fontWeight: 700,
                    },
                    closeButton: {
                        color: "#000",
                    },
                    description: {
                        color: "#000",
                    }
                }
            });
        } catch (error) {
            console.error(error);
            notifications.show({
                title: "Error!",
                message: error.message,
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box style={{ cursor: "pointer" }} onClick={handleAddToCart}>
            {children || <Button size="md" bd="none" w="100%" leftSection={<TbShoppingCart size="1.4rem" />} mt="0.6rem" loading={loading} {...extraProps}>{overrideText || "Add to cart"}</Button>}
        </Box>
    );
}
