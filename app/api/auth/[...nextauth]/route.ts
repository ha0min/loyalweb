import NextAuth from 'next-auth';

const handler = NextAuth({
    callbacks: {
        session({ session, token, user }) {
            return session; // The return type will match the one returned in `useSession()`
        },
    },
    providers: [
        // credential providers
        ],
});

export { handler as GET, handler as POST };
