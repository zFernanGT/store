'use client'

import { useState } from "react";
import { settings } from "../settings";
import { Anchor, Box, Collapse, Group, Image, Paper, Stack, Title } from "@mantine/core";
import Link from "next/link";

export default function CategoriesSidebar() {
    const [opened, setOpened] = useState(false);
    return (
        <Stack>
            {settings.home_subcategories.slice(0, 6).map((widget) => (
                <Anchor component={Link} c="bright" href={widget.url} key={widget.key}>
                    <Box style={{ borderRadius: 5 }} pos="relative" className={settings.featured_categories.includes(widget.key) ? " featured-category" : ""} p="0.6rem">
                        <Group w="100%" justify="space-between">
                            <Group wrap="nowrap">
                                <Image src={widget.image} alt={widget.name} w={35} />
                                <Title fz="1.4rem" tt="uppercase" order={2}>{widget.name}</Title>
                            </Group>
                            {settings.featured_categories.includes(widget.key) && <Paper className="featured-category-label not-stuck" px="0.4rem" fz="0.9rem">{settings.featured_categories_label}</Paper>}

                        </Group>
                    </Box>
                </Anchor>
            ))}
            {settings.home_subcategories.length > 6 && <>
                <Box ml={opened ? "-0.6rem" : "0"} onClick={() => setOpened(!opened)} style={{ transition: "0.2s ease-in-out", borderRadius: 5 }} pos="relative" className="pointer" p="0.6rem">
                    <Group wrap="nowrap">
                        <Image className="invert-icon" src="/more.png" alt="Plus icon" w={35} />
                        <Title c="bright" fz="1.4rem" tt="uppercase" order={2}>{opened ? "Less" : "More"}</Title>
                    </Group>
                </Box>
                <Collapse in={opened}>
                    <Stack>
                        {settings.home_subcategories.slice(6).map((subcategory) => (
                            <Anchor component={Link} c="bright" href={subcategory.url} key={subcategory.key}>
                                <Box style={{ borderRadius: 5 }} pos="relative" className={settings.featured_categories.includes(subcategory.key) ? " featured-category" : ""} p="0.6rem">
                                    <Group w="100%" justify="space-between">
                                        <Group wrap="nowrap">
                                            <Image src={subcategory.image} alt={subcategory.name} w={35} />
                                            <Title fz="1.4rem" tt="uppercase" order={2}>{subcategory.name}</Title>
                                        </Group>
                                        {settings.featured_categories.includes(subcategory.key) && <Paper className="featured-category-label not-stuck" px="0.4rem" fz="0.9rem">{settings.featured_categories_label}</Paper>}

                                    </Group>
                                </Box>
                            </Anchor>
                        ))}
                    </Stack>
                </Collapse>
            </>}
        </Stack>
    )
}
