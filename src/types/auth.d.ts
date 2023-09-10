import type { Role } from '$lib/server/database/schema'
import type { DefaultJWT } from '@auth/core/jwt'
import type { DefaultSession } from '@auth/core/types'

declare module '@auth/core/types' {
    interface Session {
        user?: {
            roles: Role[]
        } & DefaultSession['user']
    }
}

declare module '@auth/core/jwt' {
    interface JWT extends DefaultJWT {
        roles: Role[]
    }
}

declare module '@auth/core/adapters' {
    interface AdapterUser extends User {
        id: string
        email: string
        emailVerified: Date | null
        roles: Role[]
    }
}