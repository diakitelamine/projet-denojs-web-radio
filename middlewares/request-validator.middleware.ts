import { validate, ValidationErrors, ValidationRules } from "https://deno.land/x/validasaur@v0.8.0/src/mod.ts";
import { httpErrors } from "https://deno.land/x/oak@v5.0.0/mod.ts";
import { Context } from "./../types.ts";
import EmailException from '../exception/EmailException.ts';
import PasswordException from '../exception/PasswordException.ts';

const registerMidd = (req: Request, res: Response, next: () => void) => {

    let data: any = req.body;

    const champsRequire = [`lastname`, `firstname`, `dateNaiss`, `phoneNumber`, `email`, `password`]

    try {

        let error: boolean = true;
        let textError: string = '';
        for (const require in champsRequire) {
            error = true;
            for (const champs in data)
                if (champs === champsRequire[require])
                    error = false;

            if (error)
                textError += `${champsRequire[require]}, `
        }
        if (textError.length > 0) {
            textError = textError.slice(0, -2);
            throw new Error(`Les champs ${textError} sont manquant!`)
        }

        if (EmailException.checkEmail(data.email))
            throw new EmailException();
        if (!PasswordException.isValidPassword(data.password))
            throw new PasswordException();
        // if (!DateException.checkDate(data.dateNaiss))
        //     throw new DateException();

        next()

    } catch (err) {
        return res.status(401).json({ error: true, message: err.message }).end();
    }
}


const loginMidd = (req: Request, res: Response, next: () => void) => {

    let data: any = req.body;

    const champsRequire = [`email`, `password`]

    try {

        let error: boolean = true;
        let textError: string = '';
        for (const require in champsRequire) {
            error = true;
            for (const champs in data) {
                if (champs === champsRequire[require])
                    error = false;
            }
            if (error)
                textError += `${champsRequire[require]}, `
        }
        if (textError.length > 0) {
            textError = textError.slice(0, -2); // Delete ', '
            throw new Error(`Les champs ${textError} sont manquant!`)
        }

        if (EmailException.checkEmail(data.email))
            throw new EmailException();
        if (!PasswordException.isValidPassword(data.password))
            throw new PasswordException();

        next()

    } catch (err) {
        return res.status(401).json({ error: true, message: err.message }).end();
    }
}

export { registerMidd, loginMidd };