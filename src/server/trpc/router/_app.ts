import { router } from "../trpc";
import { authRouter } from "./auth";
import { chirpRouter } from "./chirp";

export const appRouter = router({
  chirp: chirpRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
