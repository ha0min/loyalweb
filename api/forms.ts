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
    orderDetailAddRequestList: Array<{ productId: number; number: number; }>;
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
            const response = await fetch('/api/order/add', {
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

export const useUserRegister = () => {
    const register = async (username: string, password: string) => {
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
            }),
        });
        const data = await response.json();
        return data;
    };
    return { register };
};
