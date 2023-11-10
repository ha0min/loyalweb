'use client';

import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Provider } from 'jotai';
import { theme } from '../theme';

export default function RootLayout({ children }: { children: any }) {
    return (
        <html lang="en">
        <head>
            <ColorSchemeScript />
            <link rel="shortcut icon" href="/favicon.svg" />
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
        </body>
        </html>
    );
}
