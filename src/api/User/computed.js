import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        // parent: 위에 존재하는 resolver의 user 정보를 담고 있음
        fullName: (parent) => {
            return `${parent.firstName} ${parent.lastName}`;
        },
        isFollowing: (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            try {
                return prisma.$exists.user({
                    AND: [{ id: user.id }, { following_some: { id: parentId } }],
                });
            } catch {
                return false;
            }
        },
        isSelf: (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId;
        },
    },
};
