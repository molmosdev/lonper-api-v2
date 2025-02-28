import { Hono } from "hono";
import { cors } from "hono/cors";
import { swaggerUI } from "@hono/swagger-ui";
import addressesRouter from "@routers/addressesRouter.ts";
import authRouter from "@routers/authRouter.ts";
import { serveStatic } from "hono/deno";
import config from "@config";
import { basicAuth } from "hono/basic-auth";

const app = new Hono();

// CORS configuration
const allowedOrigins = config.production
  ? ["https://www.portal.lonper.molmos.dev"]
  : ["http://localhost:4200"];

app.use(
  "/api/*",
  cors({
    origin: (origin) => {
      if (allowedOrigins.includes(origin) || !origin) {
        return origin;
      }
      return null;
    },
    credentials: true,
  })
);

// Basic Auth configuration for Swagger UI and JSON
app.use(
  "/docs/*",
  basicAuth({
    username: config.swagger.user!,
    password: config.swagger.password!,
  })
);

// Serve the Swagger JSON file under /docs/json
app.use("/docs/json", serveStatic({ path: "./api/swagger.json" }));

// Use the middleware to serve Swagger UI at /docs/ui
app.get("/docs/ui", swaggerUI({ url: "/docs/json" }));

// Auth router
app.route("/api/v2/auth", authRouter);

// Addresses router
app.route("/api/v2/addresses", addressesRouter);

Deno.serve(app.fetch);
