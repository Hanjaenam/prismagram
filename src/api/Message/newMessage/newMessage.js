import { prisma } from '../../../../generated/prisma-client';

export default {
  Subscription: {
    newMessage: {
      /**
       * prisma EndPoint - Docs에서 MessageSubscriptionPayload를 보면
       * mutation, node, updatedFields, previousValues가 있는 것을 확인할 수 있음.
       */
      subscribe: (_, args) => {
        const { roomId } = args;
        return prisma.$subscribe
          .message({
            AND: [
              { mutation_in: 'CREATED' },
              {
                node: {
                  room: {
                    id: roomId,
                  },
                }, //node
              },
            ], //AND
          })
          .node(); //prisma.$subscribe.message()
      }, // subscribe
      resolve: payload => payload,
    },
  },
};
