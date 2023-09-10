import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    type PgTableFn,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import type { InferColumnsDataTypes } from "drizzle-orm";

export type Role = "user" | "admin";

export const users = pgTable("user", {
    id: text("id").notNull().primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    roles: text("roles").array().$type<Role[]>().$default(() => ["user"]),
});

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey(account.provider, account.providerAccountId),
    })
);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").notNull().primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey(vt.identifier, vt.token),
    })
);


export const tableFn = (table: string) => {
    switch (table) {
        case "user":
            return users;
        case "account":
            return accounts;
        case "session":
            return sessions;
        case "verificationToken":
            return verificationTokens;
        default:
            throw new Error(`Table ${table} not found`);
    }
}
