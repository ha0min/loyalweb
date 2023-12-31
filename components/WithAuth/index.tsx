// withAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { notification } from 'antd';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useCurrentUser } from '@/api/user';
import { userAtom } from '@/store/userStore';

const withAuth = (WrappedComponent) => (props) => {
    const {
        currentUser,
        isCurrentUserLoading,
        currentError,
    } = useCurrentUser();
    const router = useRouter();
    const [stateUser, setUser] = useAtom(userAtom);

    useEffect(() => {
        // log current user
        console.log('current user: ', currentUser);
        console.log('state user: ', stateUser);

        if (!isCurrentUserLoading && !currentUser) {
            notification.info(
                {
                    message: 'Please login',
                }
            );
            router.push('/start');
        }

        if (currentError) {
            console.log('[withAuth] error useCurrentUser: ', currentError);
            notification.error({
                message: 'Something went wrong',
                description: `error ${currentError}`,
            });
        }

        if (!isCurrentUserLoading && currentUser) {
            setUser(currentUser);
        }
    }, [currentUser, isCurrentUserLoading, currentError, router]);

    if (isCurrentUserLoading) {
        return <div>Loading...</div>; // Or handle error/loading state as needed
    }

    if (currentError) {
        console.log('[withAuth] currentError: ', currentError);
        if (currentError.message === '40100') {
            return <Link href="/start">Please login to access</Link>;
        }
    }

    return <WrappedComponent {...props} />;
};

export const withAdminAuth = (WrappedComponent) => (props) => {
    const {
        currentUser,
        isCurrentUserLoading,
        currentError,
    } = useCurrentUser();
    const router = useRouter();
    const [stateUser, setStateUser] = useAtom(userAtom);

    useEffect(() => {
        if (!isCurrentUserLoading && !currentUser) {
            router.push('/start');
        }

        if (!isCurrentUserLoading && currentUser && !currentUser.userRole.includes('admin')
            && stateUser?.username && !stateUser?.userRole?.includes('admin')) {
            notification.error({
                message: 'Access denied',
                description: 'You are not authorized to view this page',
            });
            router.push('/start');
        }

        if (!isCurrentUserLoading && currentUser && currentUser.userRole.includes('admin')) {
            setStateUser(currentUser);
        }
    }, [currentUser, isCurrentUserLoading, currentError, router]);

    if (isCurrentUserLoading) {
        return <div>Loading...</div>; // Or handle error/loading state as needed
    }

    if (currentError) {
        if (currentError.message === '40100') {
            return <Link href="/start">Please login to access</Link>;
        }
    }
    return <WrappedComponent {...props} />;
};

export default withAuth;
