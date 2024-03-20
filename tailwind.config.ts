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
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },
    },
    safelist: [
        "indent-[0rem]",
        "indent-[1rem]",
        "indent-[2rem]",
        "indent-[3rem]",
        "indent-[4rem]",
        "indent-[5rem]",
        "indent-[6rem]",
    ],
    plugins: [],
    darkMode: ["selector", '[data-mantine-color-scheme="dark"]'],
} satisfies Config;
