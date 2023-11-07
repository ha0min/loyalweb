import { Flex, Image, Text, Title } from '@mantine/core';

export const PageTitle = ({
                              title,
                              subtitle,
                              url,
                          }:
                              { title: string, subtitle: string, url: string }) => (
        <Flex
            justify="flex-start"
            align="center"
            gap="md"
            my="md"
        >
            <Image
                src={url}
                alt={title}
                w={80}
                h={80}
                radius="lg"
            />

            <div>
                <Title>{title}</Title>
                <Text fw={500} size="lg">{subtitle}</Text>
            </div>
        </Flex>
    );
