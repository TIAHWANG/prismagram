import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        me: async (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const user = await prisma.user({ id: request.user.id });
            const posts = await prisma.user({ id: request.user.id }).posts();
            return {
                user,
                posts,
            };
        },
    },
};
