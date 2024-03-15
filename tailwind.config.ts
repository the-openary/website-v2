import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)", ...fontFamily.sans],
            },
        },
    },
    plugins: [],
    darkMode: ["selector", '[data-mantine-color-scheme="dark"]'],
} satisfies Config;
