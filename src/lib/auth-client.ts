import { createAuthClient } from "better-auth/react"
import { env } from "@/env"
import { inferAdditionalFields } from "better-auth/client/plugins";
import { authType } from "./auth";

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: env.NEXT_PUBLIC_BASE_URL,
    plugins: [
        inferAdditionalFields<authType>(),
      ],
})