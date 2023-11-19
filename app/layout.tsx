'use client';

import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Analytics } from '@vercel/analytics/react';
import { Provider } from 'jotai';
import { theme } from '../theme';

export default function RootLayout({ children }: { children: any }) {
    return (
        <html lang="en">
        <head>
            <title>Fanly, a reward program</title>
            <ColorSchemeScript />
            <link rel="shortcut icon" href="/favicon.ico" />
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
            />
        </head>
        <body>
        <Provider>
            <MantineProvider theme={theme}>
                    {children}
            </MantineProvider>
        </Provider>
        <Analytics />
        </body>
        </html>
    );
}
