import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { todoInput } from "~/types";

export const todoRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    const todos = await ctx.prisma.todo.findMany({
      where: {
        userId: ctx?.session?.user.id,
      },
    });
    console.log(
      "todos from prisma",
      todos.map(({ id, text, done }) => ({ id, text, done }))
    );
    return [
      {
        id: 2,
        text: "test",
        done: false,
      },
      {
        id: 1,
        text: "test 2",
        done: true,
      },
    ];
  }),
  create: publicProcedure.input(todoInput).mutation(({ ctx, input }) => {
    return ctx.prisma.todo.create({
      data: {
        text: input,
        user: {
          connect: {
            id: ctx?.session?.user.id,
          },
        },
      },
    });
  }),
  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.todo.delete({
      where: {
        id: input,
      },
    });
  }),
});
