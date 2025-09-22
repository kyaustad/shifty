import { db } from "@/db";
import { eq } from "drizzle-orm";
import { user, type User } from "../schema";


export const database = {
    getUser: async (id: string) => {
        const foundUser = await db.query.user.findFirst({
            where: eq(user.id, id),
        });
        return foundUser as User;
    }
}