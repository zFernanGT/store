import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Badge, Box, Group, Image, Paper, Text, Title } from "@mantine/core";
import AddToCartButton from "../../components/AddToCartButton";
import RankPopup from "../../components/RankPopup";
import { settings } from "../../settings";
import { getRecentSales } from "../../utils/getRecentSales";
import { getTimeAgo } from "../../utils/getTimeAgo";
import { getFeaturedPackages } from "../../utils/getFeaturedPackages";
import { getSale } from "../../utils/getSale";
import SaleWidget from "../../components/SaleWidget";

export const metadata = {
    title: "Store | " + settings.server_name,
    description: "Buy ranks from the " + settings.server_name + " store!",
}

export default async function Page() {
    const recentSales = await getRecentSales();
    const featuredPackages = await getFeaturedPackages();
    const sale = await getSale();

    return (
        <>
            {sale && <SaleWidget sale={sale} />}
            <Paper bg="gold" p="0.2rem 0.8rem" mb="-0.4rem" w="fit-content" pos="relative" style={{ zIndex: 2 }}>
                <Title fz="1.2rem" c="#000" order={2}>Featured packages</Title>
            </Paper>
            <Carousel
                slideGap="1rem"
                h={365}
                align="start"
                mb="2rem"
                slideSize={{ base: "100%", sm: "50%", md: "27%" }}
            >
                {featuredPackages?.map((item) => (
                    <CarouselSlide key={item.data.id}>
                        <RankPopup rank={item.data}>
                            <Paper pos="relative" mih="22rem" style={{ cursor: 'pointer' }}>
                                <Group justify="center">
                                    <Image mt="2rem" src={item.data.image} alt={item.data.name} mah="14rem" w="auto" />
                                </Group>
                                <Box pos="absolute" px="0.8rem" bottom="0.8rem" w="100%">
                                    <Group justify="space-between" gap="0.4rem">
                                        <Text c="bright" size="xl" fw={600}>{item.data.name}</Text>
                                        <Badge size="lg" c="#fff" color="#282C42">
                                            {item.data.discount !== 0 && <Text c="red.5" inherit inline span td="line-through">{settings.currency_symbol}{item.data.total_price + item.data.discount}</Text>}
                                            &nbsp;{settings.currency_symbol}{item.data.total_price}
                                        </Badge>
                                    </Group>
                                    <AddToCartButton package_id={item.data.id} quantity={1} />
                                </Box>
                            </Paper>
                        </RankPopup>
                    </CarouselSlide>
                ))}
            </Carousel>
            <Paper bg="gold" p="0.2rem 0.8rem" mb="-0.4rem" w="fit-content" pos="relative" style={{ zIndex: 2 }}>
                <Title fz="1.2rem" c="#000" order={2}>Recent purchases</Title>
            </Paper>
            <Carousel
                mb="2rem"
                slideGap="1rem"
                align="start"
                h={365}
                slideSize={{ base: "100%", sm: "50%", md: "27%" }}
            >
                {recentSales?.map((item) => (
                    <CarouselSlide key={item.data.id}>
                        <RankPopup rank={item.data}>
                            <Paper pos="relative" mih="22rem" style={{ cursor: 'pointer' }}>
                                <Badge className="recent-purchase-badge" radius={4} variant="light" pos="absolute" top="0.5rem" right="0.5rem" size="lg" color="primary.5">
                                    {getTimeAgo(item.purchasedAt)}
                                </Badge>
                                <Group justify="center">
                                    <Image mt="2rem" src={item.data.image} alt={item.data.name} mah="14rem" w="auto" />
                                </Group>
                                <Box pos="absolute" px="0.8rem" bottom="0.8rem" w="100%">
                                    <Group justify="space-between" gap="0.4rem">
                                        <Text c="bright" size="xl" fw={600}>{item.data.name}</Text>
                                        <Badge size="lg" c="#fff" color="#282C42">
                                            {item.data.discount !== 0 && <Text c="red.5" inherit inline span td="line-through">{settings.currency_symbol}{item.data.total_price + item.data.discount}</Text>}
                                            &nbsp;{settings.currency_symbol}{item.data.total_price}
                                        </Badge>
                                    </Group>
                                    <AddToCartButton package_id={item.data.id} quantity={1} />
                                </Box>
                            </Paper>
                        </RankPopup>
                    </CarouselSlide>
                ))}
            </Carousel>
        </>
    );
}