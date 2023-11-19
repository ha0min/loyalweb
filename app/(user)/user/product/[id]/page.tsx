'use client';

import { Badge, Button, Text, Container, Group, Space, Title, Image } from '@mantine/core';
import { ProductDetail } from '@/type';

const product: ProductDetail = {
    id: '45664243533479936',
    name: 'Sofa Pro',
    picture: 'http://dummyimage.com/400x400', // Replace with actual image URL
    category: 'Furniture',
    price: 1350,
    stock: 10,
    description: 'The best sofa, once you sit down you won’t want to get up',
};

const ProductPage = ({ params }: { params: { id: string } }) => {
    const handleAddToCart = () => {
        // Add your logic to handle adding the product to the cart
        console.log(`Product ${params.id} added to cart`);
    };

    return (
        <Container size="lg" my="md">
            <Group align="flex-start" gap="xl">
                <Image src={product.picture} alt={product.name} radius="md" width={300} height={300} />

                <div>
                    <Title order={2}>{product.name}, {params.id}</Title>
                    <Text c="dimmed" size="sm">{product.category}</Text>
                    <Badge color="purple" variant="light" size="lg" mt="md">
                        In Stock
                    </Badge>

                    <Text size="lg" fw={500} mt="md">
                        ${product.price.toFixed(2)}
                    </Text>

                    <Space h="md" />

                    <Text size="sm" style={{ lineHeight: 1.5 }}>
                        {product.description}
                    </Text>

                    <Space h="md" />

                    <Button
                        size="md"
                        radius="lg"
                        variant="filled"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </Button>
                </div>
            </Group>
        </Container>
    );
};

export default ProductPage;
