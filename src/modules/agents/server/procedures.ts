import {
  createTRPCRouter,
  // baseProcedure,
  protectedProcedure,
} from "@/trpc/init";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { agentsInsertSchema } from "../schemas";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { z } from "zod";

export const agentsRouter = createTRPCRouter({
  // GET ONE to use protected procedure
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async (input) => {
      const [existingAgent] = await db
        .select({
          //  TODO: Change to the actual count
          meetingCount: sql<number>`1`,
          ...getTableColumns(agents),
        })
        .from(agents)
        .where(eq(agents.id, input.id));

      return existingAgent;
    }),

  getMany: protectedProcedure.query(async () => {
    const data = await db.select().from(agents);

    return data;
  }),

  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();

      return createdAgent;
    }),
});
