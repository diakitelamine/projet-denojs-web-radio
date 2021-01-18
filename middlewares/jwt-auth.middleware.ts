import { Context, AuthUser } from "./../types.ts";
import UserInterfaces from '../interfaces/UserInterfaces.ts';
import { validateJwt } from "https://deno.land/x/djwt@v1.7/validate.ts";

const getJwtPayload = async(token: string, secret: string): Promise < any | null > => {
    try {
        const jwtObject = await validateJwt(token, secret);
        if (jwtObject && jwtObject.payload)
            return jwtObject.payload;
    } catch (err) {
        console.log(err);
    }
    return null;
};

const JWTAuthMiddleware = (JWTSecret: string) => {
    return async(ctx: Context, next: () => Promise < void > ) => {
        try {
            const authHeader = ctx.request.headers.get("Authorization");
            if (authHeader) {
                const token = authHeader.replace(/^bearer/i, "").trim();
                const user = await getJwtPayload(token, JWTSecret);

                if (user)
                    ctx.user = user as UserInterfaces;
            }
        } catch (err) {
            console.log(err);
        }
        await next();
    };
}

export { JWTAuthMiddleware };