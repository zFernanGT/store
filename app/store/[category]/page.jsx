import { Badge, Box, Grid, GridCol, Group, Image, Paper, Text, Title } from "@mantine/core";
import AddToCartButton from "../../../components/AddToCartButton";
import RankPopup from "../../../components/RankPopup";
import { settings } from "../../../settings";
import { getCommunityGoal } from "../../../utils/getCommunityGoal";
import { tebexClient } from "../../../utils/tebexClient";
import { getSale } from "../../../utils/getSale";
import SaleWidget from "../../../components/SaleWidget";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page({ params }) {
    const { category } = await params;
    const sale = await getSale();

    const selectedCategory = [...settings.home_subcategories, ...settings.home_category_widgets].find(cat => cat.url.replace("/store/", "").toLowerCase() === category.toLowerCase());

    let allPackages = [];
    if (selectedCategory) {
        allPackages = await tebexClient(`categories/${selectedCategory.tebex_category_id}?includePackages=1`);
    }

    const communityGoal = await getCommunityGoal();

    if (selectedCategory) {
        return (
            <>
                {sale && <SaleWidget sale={sale} />}
                <Title mb="1rem" fz="2rem" c="bright" order={2}>All {selectedCategory.name}</Title>
                <Grid grow mb="4rem" cols={{ base: 1, md: 2, lg: 3 }}>
                    {allPackages?.data?.packages?.map((rank) => (
                        <GridCol span={{ base: 24, md: 6, lg: 4 }}>
                            <RankPopup rank={rank}>
                                <Paper pos="relative" mih="22rem" style={{ cursor: 'pointer' }}>
                                    <Group justify="center">
                                        <Image mt="1rem" src={rank.image} alt={rank.name} mah="14rem" w="auto" />
                                    </Group>
                                    <Box pos="absolute" px="0.8rem" bottom="0.8rem" w="100%">
                                        <Group justify="space-between" gap="0.4rem">
                                            <Text c="bright" size="xl" fw={600}>{rank.name}</Text>
                                            <Badge size="lg" c="#fff" color="#282C42">
                                                {rank.discount !== 0 && <Text c="red.5" inherit inline span td="line-through">{settings.currency_symbol}{rank.total_price + rank.discount}</Text>}
                                                &nbsp;{settings.currency_symbol}{rank.total_price}
                                            </Badge>
                                        </Group>
                                        <AddToCartButton package_id={rank.id} quantity={1} />
                                    </Box>
                                </Paper>
                            </RankPopup>
                        </GridCol>
                    ))}
                </Grid>
            </>
        );
    }
}

export async function generateStaticParams() {
    return [...settings.home_subcategories, ...settings.home_category_widgets].map(widget => ({ category: widget.url.replace("/", "").toLowerCase() }));
}

export async function generateMetadata({ params }) {
    const newParams = await params;
    const uppercaseCategory = newParams.category.charAt(0).toUpperCase() + newParams.category.slice(1);
    return {
        title: uppercaseCategory + " | Store | " + settings.server_name,
        description: "Buy " + uppercaseCategory + " from the " + settings.server_name + " store!",
        openGraph: {
            title: uppercaseCategory + " | Store | " + settings.server_name,
            description: "Buy " + uppercaseCategory + " from the " + settings.server_name + " store!",
        }
    }
}
