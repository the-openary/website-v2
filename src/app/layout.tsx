import "@mantine/core/styles.css";
import "~/styles/globals.css";
import {
    createTheme,
    MantineProvider,
    ColorSchemeScript,
    MantineColorScheme,
} from "@mantine/core";

export const metadata = {
    title: "The Openary",
    description: "The Openary",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const theme = createTheme({});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const defaultColorScheme: MantineColorScheme = "dark";
    return (
        <html lang="en">
            <body>
                <MantineProvider
                    theme={theme}
                    defaultColorScheme={defaultColorScheme}
                >
                    <ColorSchemeScript
                        // Required for SSR color scheme. Ensures no FOUC.
                        nonce="8IBTHwOdqNKAWeKl7plt8g=="
                        defaultColorScheme={defaultColorScheme}
                    />
                    {children}
                </MantineProvider>
            </body>
        </html>
    );
}
