'use client';

import { Container, Title, Text, Paper, Group, ThemeIcon, SimpleGrid, Flex, Grid } from '@mantine/core';
import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { IconArrowDownRight, IconArrowUpRight } from '@tabler/icons-react';
import { PageTitle } from '@/components/PageTitle/PageTitle';

// Assuming this is the type for your rewards record
type RewardRecord = {
    id: number;
    userId: number;
    points: number;
    createTime: string;
};

// Mock data from the server
const mockData = JSON.parse(`
{
    "code": 0,
    "data": {
        "total": "19",
        "records": [
            {
                "id": "45667743336235008",
                "userId": "45294884650745856",
                "points": 100,
                "createTime": "2023-12-29T20:27:32"
            },
            {
                "id": "45667714336817152",
                "userId": "45294884650745856",
                "points": -202,
                "createTime": "2023-12-29T20:27:25"
            },
            {
                "id": "45667060428046336",
                "userId": "45294884650745856",
                "points": 130,
                "createTime": "2023-11-29T20:24:49"
            },
            {
                "id": "45299244185157632",
                "userId": "45294884650745856",
                "points": 53,
                "createTime": "2023-12-28T20:03:15"
            },
            {
                "id": "45295983470313472",
                "userId": "45294884650745856",
                "points": -202,
                "createTime": "2023-06-28T19:50:17"
            },
            {
                "id": "45295984137207808",
                "userId": "45294884650745856",
                "points": -202,
                "createTime": "2023-10-28T19:50:17"
            },
            {
                "id": "45295973013913600",
                "userId": "45294884650745856",
                "points": -82,
                "createTime": "2023-10-28T19:50:15"
            },
            {
                "id": "45295969520058368",
                "userId": "45294884650745856",
                "points": -82,
                "createTime": "2023-10-28T19:50:14"
            },
            {
                "id": "45295971415883776",
                "userId": "45294884650745856",
                "points": -82,
                "createTime": "2023-10-28T19:50:14"
            },
            {
                "id": "45295846010388480",
                "userId": "45294884650745856",
                "points": 220,
                "createTime": "2023-10-28T19:49:45"
            },
            {
                "id": "45295846710837248",
                "userId": "45294884650745856",
                "points": 220,
                "createTime": "2023-10-28T19:49:45"
            },
            {
                "id": "45295847935574016",
                "userId": "45294884650745856",
                "points": 220,
                "createTime": "2023-10-28T19:49:45"
            },
            {
                "id": "45295848531165184",
                "userId": "45294884650745856",
                "points": 220,
                "createTime": "2023-10-28T19:49:45"
            },
            {
                "id": "45295833763020800",
                "userId": "45294884650745856",
                "points": 100,
                "createTime": "2023-10-28T19:49:42"
            },
            {
                "id": "45295834341834752",
                "userId": "45294884650745856",
                "points": 100,
                "createTime": "2023-10-28T19:49:42"
            },
            {
                "id": "45295834924843008",
                "userId": "45294884650745856",
                "points": 100,
                "createTime": "2023-10-28T19:49:42"
            },
            {
                "id": "45295835814035456",
                "userId": "45294884650745856",
                "points": 100,
                "createTime": "2023-10-28T19:49:42"
            },
            {
                "id": "45295832576032768",
                "userId": "45294884650745856",
                "points": 100,
                "createTime": "2023-10-28T19:49:41"
            },
            {
                "id": "45295828071350272",
                "userId": "45294884650745856",
                "points": 100,
                "createTime": "2023-10-28T19:49:40"
            }
        ]
    },
    "message": "ok"
}`);

const RewardsHistoryPage = () => {
    const [currentPoints, setCurrentPoints] = useState(1000); // Set this to the actual current points

    const rewardsByMonth = useMemo(() => {
        const { records } = mockData.data;

        records.sort((a, b) => dayjs(a.createTime)
            .isBefore(dayjs(b.createTime)) ? 1 : -1);

        const groupedByMonth: { [key: string]: RewardRecord[] } = {};

        records.forEach(record => {
            const month = dayjs(record.createTime)
                .format('MMM, YYYY');
            if (!groupedByMonth[month]) {
                groupedByMonth[month] = [];
            }
            groupedByMonth[month].push(record);
        });

        const result = Object.keys(groupedByMonth)
            .map(month => ({
                month,
                records: groupedByMonth[month],
                totalEarned: groupedByMonth[month].reduce(
                    (acc, record) => acc + (record.points > 0 ? record.points : 0),
                    0
                ),
                totalUsed:
                    groupedByMonth[month].reduce(
                        (acc, record) => acc + (record.points < 0 ? record.points : 0),
                        0
                    ),
            }));

        console.log(result);

        return result;
    }, []);

    return (
        <Container p="md">
            <PageTitle
                title="Check your rewards history"
                subtitle={`Current Points: ${currentPoints}`}
                url="https://em-content.zobj.net/source/telegram/358/magnifying-glass-tilted-right_1f50e.webp"
            />

            {rewardsByMonth.map((monthGroup) => (
                <Paper withBorder shadow="md" p="md" radius="md" mt="md" key={monthGroup.month}>
                    <Title order={3}>{monthGroup.month}</Title>
                    <Text>Earned this month: {monthGroup.totalEarned}</Text>
                    <Text>Used this month: {monthGroup.totalUsed}</Text>
                    <SimpleGrid cols={1} mt="md">
                        {monthGroup.records.map((record, index) => (
                            <Grid
                                justify="space-around"
                                p="md"
                                key={record.id}
                                grow
                                bg={index % 2 === 0 ? 'var(--mantine-primary-color-light)' : ''}
                            >
                                <Grid.Col span={6}>
                                    <Text>
                                        {dayjs(record.createTime)
                                            .format('DD/MMM/YYYY')}
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <Flex gap="xs">
                                        <ThemeIcon color={record.points > 0 ? 'green' : 'red'} variant="light">
                                            {record.points > 0 ? <IconArrowUpRight size={16} /> :
                                                <IconArrowDownRight size={16} />
                                            }
                                        </ThemeIcon>
                                        <Text
                                            c={record.points > 0 ? 'green' : 'red'}
                                        >
                                            {record.points} points
                                        </Text>
                                    </Flex>
                                </Grid.Col>
                            </Grid>
                        ))}
                    </SimpleGrid>
                </Paper>
            ))}
        </Container>
    );
};

export default RewardsHistoryPage;
