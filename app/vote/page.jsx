import { Anchor, Container, Grid, GridCol, Group, List, ListItem, Paper, Stack, Text, Title } from "@mantine/core";
import { TbLink } from "react-icons/tb";
import { settings } from "../../settings";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
    title: "Vote | " + settings.server_name,
    description: "Vote for " + settings.server_name + " to earn rewards!",
    openGraph: {
        title: "Vote | " + settings.server_name,
        description: "Vote for " + settings.server_name + " to earn rewards!",
    }
}

export default async function Page() {
    return (
        <>
            <Container size={1000} mb="6rem" pos="relative" style={{ zIndex: 1 }} mt="-4rem">
                <Grid>
                    <GridCol span={{ base: 12, md: 5 }}>
                        <Paper mih="100%" p="1rem">
                            <Stack>
                                {settings.voting_links.map((item) => (
                                    <Anchor size="lg" td="none" c="bright" href={item.url} target="_blank" key={item.name}>
                                        <Group gap="0.4rem">
                                            <TbLink size="1.8rem" />
                                            <Text size="xl" p="0.4rem">{item.name}</Text>
                                        </Group>
                                    </Anchor>
                                ))}
                            </Stack>
                        </Paper>
                    </GridCol>
                    <GridCol h="100%" span={{ base: 12, md: 7 }}>
                        <Paper h="100%" mb="1rem" p="1rem">
                            <Title order={2} mb="1rem">How to vote</Title>
                            <Text mb="1rem">
                                To earn rewards, you must vote for {settings.server_name} on the following websites:
                            </Text>
                            <List type="ordered" spacing="md">
                                <ListItem>
                                    Click on the voting link above.
                                </ListItem>
                                <ListItem>
                                    Enter your username and click on the vote button.
                                </ListItem>
                                <ListItem>
                                    Wait for the confirmation message in-game for your vote to be registered.
                                </ListItem>
                            </List>
                        </Paper>
                        <Paper p="1rem">
                            <Title order={2} mb="1rem">Thank you for voting!</Title>
                            <Text>
                                Your vote helps to grow the server and community. Thank you for your support! You will receive your rewards in-game shortly after voting.
                            </Text>
                        </Paper>
                    </GridCol>
                </Grid>
            </Container>
        </>
    );
}
