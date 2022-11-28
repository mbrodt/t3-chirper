import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const chirpRouter = router({
  list: publicProcedure.query(({ ctx }) => {
    const chirps = ctx.prisma.chirp.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return chirps;
  }),
  add: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.chirp.create({
        data: {
          text: input.text,
          authorId: ctx.session?.user?.id as string,
        },
      });
    }),
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.chirp.delete({
      where: {
        id: input,
      },
    });
  }),
});
