'use client';

import { Flex, Image, Text, Title } from '@mantine/core';

export const PageTitle = ({
                              title,
                              subtitle,
                              url,
                          }:
                              { title: string, subtitle?: string, url?: string }) => (
    <Flex
        justify="flex-start"
        align="center"
        gap="md"
        my="md"
    >
        {url && <Image
            src={url}
            alt={title}
            w={80}
            h={80}
            radius="lg"
        />
        }

        <div>
            <Title>{title}</Title>
            {subtitle && <Text fw={500} size="lg">{subtitle}</Text>}
        </div>
    </Flex>
);
