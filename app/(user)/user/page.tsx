import { Container, Paper } from '@mantine/core';
import { PageTitle } from '@/components/PageTitle/PageTitle';
import { FeaturesCards } from '@/components/FeatureCards';

const Hello = () => (
        <Container p="md">
            <PageTitle
                title="Welcome to Fanly!"
                subtitle="Rewards you with your loyalty!"
                url="https://em-content.zobj.net/source/telegram/358/smiling-face-with-sunglasses_1f60e.webp"
            />

            <Paper p="md" radius="md">
                <FeaturesCards />
            </Paper>

        </Container>
    );

export default Hello;
