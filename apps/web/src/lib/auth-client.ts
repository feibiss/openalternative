import { customSessionClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import { env } from "~/env"
import type { auth } from "~/lib/auth"

export const { signIn, signOut, useSession } = createAuthClient({
  baseURL: `${env.NEXT_PUBLIC_SITE_URL}/api/auth`,
  plugins: [customSessionClient<typeof auth>()],
})
