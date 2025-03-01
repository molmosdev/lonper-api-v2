import { Hono } from "hono";
import DbSelectController from "@controllers/dbSelectController.ts";
import jwtValidation from "@middlewares/jwtValidation.ts";
import { getDbSelectResultsDescription } from "@openapi/dbSelectDescriptions.ts";

const router = new Hono();

// Get DB select results route
router.get(
  "/getDbSelectResults",
  jwtValidation,
  getDbSelectResultsDescription,
  DbSelectController.getDbSelectResults,
);

export default router;
