import "@mantine/core/styles.css";
import "~/styles/globals.css";
import {
    createTheme,
    MantineProvider,
    ColorSchemeScript,
    MantineColorScheme,
    Container,
} from "@mantine/core";
import Header from "./_components/header/header";
import ScreenSizeIndicator from "./_components/utils/ssi";
import { nodeFileTrace } from "@vercel/nft";
import fs from "fs";

async function traceFilesInDirectory(directoryPath: string) {
    try {
        // Read the directory
        const files = fs.readdirSync(directoryPath);

        // Map file names to their full paths
        const fullFilePaths = files.map((file) => `${directoryPath}/${file}`);

        // Trace the files using nodeFileTrace
        const { fileList } = await nodeFileTrace(fullFilePaths, {
            base: process.cwd(),
        });

        console.log(fileList);
    } catch (error) {
        console.error("Error tracing files:", error);
    }
}

traceFilesInDirectory("./src");

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
            <body className="">
                <MantineProvider
                    theme={theme}
                    defaultColorScheme={defaultColorScheme}
                >
                    <ColorSchemeScript
                        // Required for SSR color scheme. Ensures no FOUC.
                        nonce="8IBTHwOdqNKAWeKl7plt8g=="
                        defaultColorScheme={defaultColorScheme}
                    />
                    <ScreenSizeIndicator />
                    <Header />
                    <Container fluid>{children}</Container>
                </MantineProvider>
            </body>
        </html>
    );
}
