import { Anchor, Button, Container, Grid, GridCol, Group, Image, NumberFormatter, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { TbTarget, TbTrophy } from "react-icons/tb";
import CategoriesSidebar from "../components/CategoriesSidebar";
import CommunityGoal from "../components/CommunityGoal";
import { settings } from "../settings";
import { getCommunityGoal } from "../utils/getCommunityGoal";
import { getTopDonator } from "../utils/getTopDonator.js";
import LoginCTA from "../components/LoginCTA.jsx";
import { getSale } from "../utils/getSale.js";
import SaleWidget from "../components/SaleWidget.jsx";
import { getRecentPurchases } from "../utils/recentPurchases.js";
import RecentPurchases from "../components/RecentPurchases.jsx";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Store | " + settings.server_name,
  description: "Buy coins, ranks and more from the " + settings.server_name + " store!",
  openGraph: {
    title: "Store | " + settings.server_name,
    description: "Buy coins, ranks and more from the " + settings.server_name + " store!",
  }
}

export default async function Page() {
  const communityGoal = await getCommunityGoal();
  const topDonator = await getTopDonator();
  const sale = await getSale();
  const recentPurchases = await getRecentPurchases();

  return (
    <Container mb="6rem" pos="relative" style={{ zIndex: 1 }} mt="-4rem">
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
      <Grid mt="2rem">
        <GridCol span={{ base: 12, md: 3 }}>
          {settings.show_login_cta && <LoginCTA />}
          <Paper mb="1rem" p="1rem">
            <CategoriesSidebar />
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
        <GridCol span={{ base: 12, md: 9 }}>
          {sale && <SaleWidget sale={sale} />}
          <Paper p="2rem">
            <Title c="bright" mb="1rem">Welcome to {settings.server_name}</Title>
            <Text mb="2rem" size="lg">Here you can buy coins, ranks and more for the {settings.server_name} Minecraft server! Start by browing our list of categories, pickout something you like and click on it to view the products. Add the items to your basket and checkout when you're ready. If you have any questions, please join our Discord server.</Text>

            <Title c="bright" mb="1rem" order={2}>Check out some of our categories</Title>
            <Group mb="2rem">
              {[...settings.home_category_widgets, ...settings.home_subcategories].map((widget) => (
                <Anchor component={Link} c="bright" td="none" href={widget.url} key={widget.key}>
                  <Paper className="hover-card" p="0.6rem">
                    <Group mx="1rem" wrap="nowrap">
                      <Image src={widget.image} alt={widget.name} w={35} />
                      <Title fz="1.4rem" tt="uppercase" order={2}>{widget.name}</Title>
                    </Group>
                  </Paper>
                </Anchor>
              ))}
            </Group>

            <Title c="bright" mb="1rem" order={2}>What payment methods do you accept?</Title>
            <Text size="lg" mb="1rem">We accept a variety of payment methods, including PayPal, credit cards, and more.</Text>
            <Image src="https://i.ibb.co/SwZ2723/paymentmethds.png" alt="Payment methods" w="6rem" />
          </Paper>

          <RecentPurchases recentPurchases={recentPurchases} />
        </GridCol>
      </Grid>
    </Container>
  );
}
