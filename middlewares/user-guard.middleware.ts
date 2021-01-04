import { httpErrors } from "https://deno.land/x/oak@v5.0.0/mod.ts";
import { hasUserRole } from "../helpers/roles.ts";
import type { roleTypes } from '../types/roleTypes.ts';

const userGuard = (roles ? : roleTypes) => {
    return async(ctx: any, next: () => Promise < void > ) => {
        const { user } = ctx;
        if (!user)
            throw new httpErrors.Unauthorized("Unauthorized user");


        if (roles) {
            const isRoleMatched = hasUserRole(user, roles);
            if (!isRoleMatched)
                throw new httpErrors.Forbidden("Forbidden user role");
        }
        await next();
    };
};

export { userGuard };