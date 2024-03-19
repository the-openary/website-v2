import { Title, Container } from "@mantine/core";

export default function Header() {
    return (
        <header className="pb-5">
            <Container className="pl-3 pr-3 pt-3" mx={0}>
                <Title order={1}>The Openary</Title>
            </Container>
            <div className="mt-3 h-1 w-full bg-black"></div>
        </header>
    );
}
