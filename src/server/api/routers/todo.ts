import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

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

  create: protectedProcedure.input().mutation(async ({ ctx }) => {}
);
