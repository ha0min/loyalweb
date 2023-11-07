'use client';

import {
    Badge,
    Group,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
    rem,
    useMantineTheme,
} from '@mantine/core';
import {
    IconTruck,
    IconUsers,
    IconHeadset,
    IconGift,
    IconStar, IconWallet,
} from '@tabler/icons-react';
import classes from './FeatureCards.module.css';

const rewardsFeatures = [
    {
        title: 'Earn Points on Every Purchase',
        description:
            'Accumulate points with each order and redeem them for discounts on future purchases. The more you shop, the more you save!',
        icon: IconWallet,
    },
    {
        title: 'Exclusive Member Deals',
        description:
            'As a rewards member, gain access to members-only pricing, special promotions, and early access to our biggest sales and product launches.',
        icon: IconStar,
    },
    {
        title: 'Birthday Bonanza',
        description:
            'Celebrate your special day with bonus points! Receive extra reward points every year on your birthday to use on your favorite products.',
        icon: IconGift,
    },
    {
        title: 'Refer and Earn',
        description:
            'Spread the joy! Refer friends and family to our program and earn points when they make their first purchase. It’s a win-win for everyone.',
        icon: IconUsers,
    },
    {
        title: 'Free Shipping Perks',
        description:
            'Members enjoy the benefit of free shipping on select orders. It’s our way of saying thank you for your loyalty.',
        icon: IconTruck,
    },
    {
        title: 'VIP Customer Support',
        description:
            'Get your questions answered with priority support from our dedicated rewards program customer service team.',
        icon: IconHeadset,
    },
];

export function FeaturesCards() {
    const theme = useMantineTheme();
    const features = rewardsFeatures.map((feature) => (
        <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
            <feature.icon
                style={{ width: rem(50), height: rem(50) }}
                stroke={2}
                color={theme.colors.blue[6]}
            />
            <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
                {feature.title}
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
                {feature.description}
            </Text>
        </Card>
    ));

    return (
        <Container size="lg" py="xl">
            <Group justify="center">
                <Badge variant="filled" size="lg">
                    Best rewards program ever
                </Badge>
            </Group>

            <Title order={2} className={classes.title} ta="center" mt="sm">
                Reward Yourself Every Time You Shop
            </Title>

            <Text c="dimmed" className={classes.description} ta="center" mt="md">
                Join our rewards program and enjoy benefits tailored to enhance your shopping experience!
            </Text>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
                {features}
            </SimpleGrid>
        </Container>
    );
}
