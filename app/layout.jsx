import "@mantine/carousel/styles.css";
import { Anchor, BackgroundImage, Box, ColorSchemeScript, Container, Group, Image, MantineProvider, Stack, Text } from "@mantine/core";
import "@mantine/core/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import Navbar from "../components/Navbar";
import "../theme/theme.css";
import { settings } from "../settings";
import ThemeHotkey from "../components/ThemeHotkey";
import { BasketProvider } from "../contexts/BasketContext";
import Link from "next/link";
import FadeIn from "../components/FadeIn";
import { theme } from "../theme/theme";
import { UserProvider } from '../contexts/UserContext';
import ThemeSwitcher from "../components/ThemeSwitcher";

export const metadata = {
  title: settings.server_name,
  description: "Welcome to " + settings.server_name + " Minecraft server.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body suppressHydrationWarning>
        {settings.theme.enable_snow && <div className="snowflakes">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="snowflake">
              <div className="inner">❅</div>
            </div>
          ))}
        </div>}

        <MantineProvider defaultColorScheme="dark" theme={theme}>
          <UserProvider>
            <ColorSchemeScript defaultColorScheme="dark" />
            <BasketProvider>
              <ModalsProvider>
                <ThemeHotkey />

                <Navbar />
                <Notifications position="bottom-center" />
                <BackgroundImage className="hero-image" src="/hero_image.webp">
                  <Group pt="7rem" pb="20rem" pos="relative" style={{ zIndex: 1 }} justify="center">
                    <Link href="/">
                      <Image src="/logo.png" alt={settings.server_name} maw={{base: 200, md: 300}} className="main-logo" />
                    </Link>
                  </Group>
                </BackgroundImage>
                <FadeIn>
                  <Box mt="-13rem">
                    {children}
                  </Box>
                </FadeIn>
                <Box p="0.4rem 1rem" mt="2rem" className="footer">
                  <Container>
                    <Group justify="space-between">
                      <Group>
                        <Link href="https://tebex.io" target="_blank">
                          <Image className="invert-icon" src="/tebex_logo.png" alt="Tebex Logo" h={40} /></Link>
                        <Stack gap={0} justify="space-between">
                          <Text>© {new Date().getFullYear()} {settings.server_name}. All rights reserved.</Text>
                          <Text size="sm" c="bright">This website and its checkout process is owned & operated by Tebex Limited, who handle product fulfilment, billing support and refunds.</Text>
                        </Stack>
                      </Group>
                      <div>
                        <Group>
                          <Anchor c="bright" size="sm" href="https://checkout.tebex.io/impressum" target="_blank">Impressum</Anchor>
                          <Anchor c="bright" size="sm" href="https://checkout.tebex.io/terms" target="_blank">Terms of Service</Anchor>
                          <Anchor c="bright" size="sm" href="https://checkout.tebex.io/privacy" target="_blank">Privacy Policy</Anchor>
                          <ThemeSwitcher />
                        </Group>
                      </div>
                    </Group>
                  </Container>
                </Box>
                
              </ModalsProvider>
            </BasketProvider>
          </UserProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
