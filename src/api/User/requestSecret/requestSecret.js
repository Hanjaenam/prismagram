import { generateSecret } from '../../../utils';
import { prisma } from '../../../../generated/prisma-client';
import { sendSecretMail } from '../../../utils';

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = generateSecret();
      try {
        await sendSecretMail(email, loginSecret);
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        return true;
      } catch (err) {
        return false;
      }
    },
  },
};
