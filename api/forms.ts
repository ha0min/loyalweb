import { useState } from 'react';

export type OrderResponse = {
    code: number;
    data: {
        id: string;
        pointsEarned: string;
        points: string;
    };
    message: string;
};

export type SubmitOrderFormValues = {
    remark: string;
    orderDetailAddRequestList: Array<{ productId: string; number: number; }>;
};

export const useSubmitOrder = () => {
    const [orderResponse, setOrderResponse] = useState<OrderResponse | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const submitOrder = async (values: SubmitOrderFormValues) => {
        console.log('submitOrder', values);
        setIsLoading(true);
        setError(null);
        try {
            // Start the fetch process
            const response = await fetch('/api/orders/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            // Check for HTTP errors
            if (!response.ok) {
                console.log('response', response);
                // Throw an error with the response status text
                throw new Error(response.statusText || 'Unknown error');
            }

            // Parse the JSON response
            const data = await response.json();

            console.log('data', data);
            // Check for API errors
            if (data.code !== 0) {
                throw new Error(data.message || 'API error without a message.');
            }

            console.log('data', data);

            // If everything is fine, update the order response state
            setOrderResponse(data);
        } catch (e) {
            setError(e as Error);
        } finally {
            setIsLoading(false);
        }
    };

    return { submitOrder, orderResponse, error, isLoading };
};

export type RedeemResponse = {
    code: number;
    data: {
        id: number;
        pointsRedeemed: number;
        points: number;
    };
    message: string;
};

export type SubmitRedeemFormValues = {
    rewardId: string;
    number: number;
};

export const useRedeem = () => {
    const [redeemResponse, setRedeemResponse] =
        useState<RedeemResponse | null>(null);
    const [error, setError] =
        useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const submitRedeem = async (values: SubmitRedeemFormValues) => {
        console.log('redeem', values);
        setIsLoading(true);
        setError(null);
        try {
            // Start the fetch process
            const response = await fetch('/api/orders/reward/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            // Check for HTTP errors
            if (!response.ok) {
                console.log('response', response);
                // Throw an error with the response status text
                throw new Error(response.statusText || 'Unknown error');
            }

            // Parse the JSON response
            const data = await response.json();

            console.log('data', data);
            // Check for API errors
            if (data.code !== 0) {
                throw new Error(data.message || 'API error without a message.');
            }

            console.log('data', data);

            // If everything is fine, update the order response state
            setRedeemResponse(data);
        } catch (e) {
            setError(e as Error);
        } finally {
            setIsLoading(false);
        }
    };

    return { submitRedeem, redeemResponse, error, isLoading };
};
