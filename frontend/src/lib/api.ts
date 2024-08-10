import { hc } from "hono/client";

// @server path error for now
import { ApiRoutes } from "../../../server/app";

const client = hc<ApiRoutes>("/");

const api = client.api;

export default api;
