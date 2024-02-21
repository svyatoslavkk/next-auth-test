import { z } from 'zod';
import { publicProcedure, router } from "../trpc";
import { SignJWT } from 'jose';
import { nanoid } from 'nanoid';
import { getJwtSecretKey } from '@/lib/auth';
import cookie from 'cookie';

export const authRouter = router({
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { res } = ctx
      const { email, password } = input

      if (email === process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
        const token = await new SignJWT({})
          .setProtectedHeader({ alg: "HS256" })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime('2h')
          .sign(new TextEncoder().encode(getJwtSecretKey()))

          res.setHeader(
            'Set-Cookie',
            cookie.serialize('user-token', token, {
              httpOnly: true,
              path: '/',
              secure: process.env.NODE_ENV === 'production'
            }))

        return { success: true }
      }

      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid username or password"
      })
    }),
})