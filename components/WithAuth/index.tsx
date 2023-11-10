// withAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { notification } from 'antd';
import { useAtomValue } from 'jotai';
import { useCurrentUser } from '@/api/user';
import { userAtom } from '@/store/userStore';

const withAuth = (WrappedComponent) => (props) => {
        const { currentUser, isCurrentUserLoading, currentError } = useCurrentUser();
        const router = useRouter();
        const stateUser = useAtomValue(userAtom);

        useEffect(() => {
            // log current user
            console.log('current user: ', currentUser);
            console.log('state user: ', stateUser);

            if (!isCurrentUserLoading && !currentUser && !stateUser?.username) {
                notification.info(
                    {
                        message: 'Please login',
                    }
                );
                router.push('/start');
            }
        }, [currentUser, isCurrentUserLoading, currentError, router]);

        if (isCurrentUserLoading) {
            return <div>Loading...</div>; // Or handle error/loading state as needed
        }

        if (currentError) {
            console.log('error: ', currentError);
        }

        return <WrappedComponent {...props} />;
    };

export const withAdminAuth = (WrappedComponent) => (props) => {
    const { currentUser, isCurrentUserLoading, currentError } = useCurrentUser();
    const router = useRouter();

    useEffect(() => {
        if (!isCurrentUserLoading && !currentUser) {
            router.push('/start'); // Redirect to login if not authenticated
        }
        if (!isCurrentUserLoading && currentUser && !currentUser.userRole.includes('admin')) {
            notification.error({
                message: 'Access denied',
                description: 'You are not authorized to view this page',
            });
            router.push('/start');
        }
    }, [currentUser, isCurrentUserLoading, currentError, router]);

    if (isCurrentUserLoading) {
        return <div>Loading...</div>; // Or handle error/loading state as needed
    }
    if (currentError) {
        console.log('error: ', currentError);
    }

    return <WrappedComponent {...props} />;
};

export default withAuth;
