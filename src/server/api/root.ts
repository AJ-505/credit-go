import { generalRouter } from "@/server/api/routers/general";
import { identificationRouter } from "@/server/api/routers/identification";
import { mlRouter } from "@/server/api/routers/ml";
import { paymentRouter } from "@/server/api/routers/payment";
import { postRouter } from "@/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  general: generalRouter,
  identification: identificationRouter,
  ml: mlRouter,
  payment: paymentRouter,
  post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
