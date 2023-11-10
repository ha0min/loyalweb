import { useSetAtom } from 'jotai';
import { userAtom } from '@/store/userStore';

export const useUserAtomLogout = () => {
    const setUserAtom = useSetAtom(userAtom);
    const logout = () => {
        setUserAtom({
            username: undefined,
            email: undefined,
            avatar: undefined,
            phone: undefined,
            address: undefined,
            userRole: undefined,
            profile: undefined,
            points: undefined,
        });
    };
    return logout;
};
