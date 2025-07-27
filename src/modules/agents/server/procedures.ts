import {
  createTRPCRouter,
  // baseProcedure,
  protectedProcedure,
} from "@/trpc/init";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { agentsInsertSchema } from "../schemas";
import { and, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { z } from "zod";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/constants";

export const agentsRouter = createTRPCRouter({
  // GET ONE to use protected procedure
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async (input) => {
      const [existingAgent] = await db
        .select({
          //  TODO: Change to the actual count
          meetingCount: sql<number>`2`,
          ...getTableColumns(agents),
        })
        .from(agents)
        .where(eq(agents.id, input.id));

      return existingAgent;
    }),

  getMany: protectedProcedure
    .input(
      z
        .object({
          page: z.number().default(DEFAULT_PAGE),
          pageSize: z
            .number()
            .min(MIN_PAGE_SIZE)
            .max(MAX_PAGE_SIZE)
            .default(DEFAULT_PAGE_SIZE),
          search: z.string().nullish(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const {
        page = DEFAULT_PAGE,
        pageSize = DEFAULT_PAGE_SIZE,
        search,
      } = input ?? {};

      const whereConditions = [eq(agents.userId, ctx.auth.user.id)];

      if (search) {
        whereConditions.push(ilike(agents.name, `%${search}%`));
      }

      const data = await db
        .select(getTableColumns(agents))
        .from(agents)
        .where(and(...whereConditions))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

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
