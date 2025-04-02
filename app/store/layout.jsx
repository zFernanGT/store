import { Anchor, Button, Container, Grid, GridCol, Group, Image, NumberFormatter, Paper, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { TbTarget, TbTrophy } from "react-icons/tb";
import CommunityGoal from "../../components/CommunityGoal";
import { settings } from "../../settings";
import { getCommunityGoal } from "../../utils/getCommunityGoal";
import { getTopDonator } from "../../utils/getTopDonator.js";
import LoginCTA from "../../components/LoginCTA.jsx";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function StoreLayout({ children }) {
    const communityGoal = await getCommunityGoal();
    const topDonator = await getTopDonator();

    return (
        <Container pos="relative" style={{ zIndex: 1 }} mt="-4rem">
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
                {settings.home_category_widgets.map((widget) => (
                    <Anchor component={Link} c="bright" href={widget.url} key={widget.key}>
                        <Paper className={"hover-card" + (settings.featured_categories.includes(widget.key) ? " featured-category" : "")} p="1.4rem">
                            {settings.featured_categories.includes(widget.key) && <Paper className="featured-category-label" px="0.4rem" fz="1rem" >{settings.featured_categories_label}</Paper>}
                            <Group justify="center" wrap="nowrap">
                                <Image src={widget.image} alt={widget.name} w={80} />
                                <div>
                                    <Title fz="2.2rem" tt="uppercase" order={2}>{widget.name}</Title>
                                    <Text>{widget.description}</Text>
                                </div>
                            </Group>
                        </Paper>
                    </Anchor>
                ))}
            </SimpleGrid>

            <Grid columns={24} gutter="2rem" mt="3rem">
                <GridCol span={{ base: 24, sm: 12, md: 8, lg: 6 }}>
                    {settings.show_login_cta && <LoginCTA />}
                    <Paper mb="1rem" p="1rem">
                        <Stack gap="1.4rem">
                            {settings.home_subcategories.map((subcategory) => (
                                <Anchor component={Link} c="bright" href={subcategory.url} key={subcategory.key}>
                                    <Group mx="1rem" wrap="nowrap">
                                        <Image src={subcategory.image} alt={subcategory.name} w={35} />
                                        <Title fz="1.4rem" tt="uppercase" order={2}>{subcategory.name}</Title>
                                        {settings.featured_categories.includes(subcategory.key) && <Paper className="featured-category-label not-stuck" px="0.4rem" fz="1rem">{settings.featured_categories_label}</Paper>}
                                    </Group>
                                </Anchor>
                            ))}
                        </Stack>
                    </Paper>
                    {communityGoal &&
                        <Paper mb="1rem" p="1rem">
                            <Group mb="1rem" gap="0.8rem">
                                <TbTarget style={{ marginTop: "-2px" }} size="1.8rem" />
                                <Title order={2} c="bright">Community Goal</Title>
                            </Group>
                            <CommunityGoal goal={communityGoal} />
                        </Paper>}
                    {topDonator.id && <Paper mb="1rem" p="1rem 1rem 0 1rem">
                        <Group mb="1rem" gap="0.8rem">
                            <TbTrophy style={{ marginTop: "-2px" }} size="1.8rem" />
                            <Title order={2} c="bright">Top Donator</Title>
                        </Group>
                        <Group>
                            <Image src={"https://visage.surgeplay.com/bust/128/" + topDonator.id} alt={topDonator.name} w={128} />
                            <div>
                                <Text size="xl" fw={700} c="bright">{topDonator.name}</Text>
                                <Text size="xl" c="bright"><NumberFormatter value={topDonator.total} /></Text>
                            </div>
                        </Group>
                    </Paper>}
                    {settings.show_support_widget && <Paper mb="1rem" p="1rem">
                        <Title c="bright" mb="0.6rem" order={2}>Need help?</Title>
                        <Text mb="1rem" size="lg">Join our Discord server for help with your purchase.</Text>
                        <Button component={Link} leftSection={<FaDiscord size="1rem" />} href={settings.discord_url} target="_blank">Join the Discord</Button>
                    </Paper>}
                </GridCol>
                <GridCol span={{ base: 24, sm: 12, md: 16, lg: 18 }}>
                    {children}
                </GridCol>
            </Grid>
        </Container>
    );
}
