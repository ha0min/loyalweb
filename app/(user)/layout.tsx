import HeaderMenu from '@/components/HeaderMenu/HeaderMenu';

const UserLayout = ({ children }: { children: React.ReactNode }) =>
    // get user info from context

     (
        <div>
            <HeaderMenu />
            {children}

        </div>
    );

export default UserLayout;
