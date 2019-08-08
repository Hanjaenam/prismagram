import { prisma } from '../../../generated/prisma-client';

export default {
  User: {
    fullName: parent => `${parent.firstName} ${parent.lastName}`,
    amIFollowing: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return prisma.$exists.user({
        AND: [{ id: parentId }, { followers_some: { id: user.id } }],
      });
    },
    itsMe: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    },
  },
};
