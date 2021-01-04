import * as expressive from 'https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts';
import { config } from './config/config.ts';
import { UserModels } from './Models/UserModels.ts';
import * as jwt from './helpers/jwt.ts';

const port = 8001;
const app = new expressive.App();
// route with dynamic parameter
app.get("/", async(req, res) => {
    await res.json([
        { id: 2, name: "Jim Doe", phone: "12425323" },
    ]);
});
app.post("/register", async(req: expressive.Request, res: expressive.Response) => {
    let data: any = req.body;

    try {

        const client = new UserModels(data.email, data.password, data.lastname, data.firstname, data.phoneNumber, data.dateNaiss);
        await client.insert();
        const token = {
            "access_token": jwt.getAuthToken(user),
            "refresh_token": jwt.getRefreshToken(user),
        }
        res.status = 201;
        return res.json(token);

    } catch (err) {
        res.status = 401;
        return res.json({ error: true, message: err.message });
    }
});
app.post("/login", async(req: expressive.Request, res: expressive.Response) => {

    let data: any = req.body;

    try {
        if (data.email != "bob@bob.bob" && data.password != "bob@bob.bob"){
            res.status = 401
            return res.json({ error: true, message: 'login error' });
        }const token = {
            "access_token": jwt.getAuthToken(user),
            "refresh_token": jwt.getRefreshToken(user),
        }
        res.status = 200;
        return res.json(token);
    } catch (err) {
        res.status = 401;
        return res.json({ error: true, message: err.message });
    }
});

let user = new UserModels('joijoi', 'joijoi', 'joijoi', 'joijoi', 'joijoi', "1993-11-22");
user.insert()
console.log(user);

(async() => {
    const server = await app.listen(port);
    // deno run server.ts --allow-net --allow-read --unstable --isolatedModules
    console.log("app listening on port " + server.port);
})();