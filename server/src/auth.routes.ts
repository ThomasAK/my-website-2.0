import * as express from "express";
import { collections } from "./database";

export const authRouter = express.Router();
authRouter.use(express.json());

authRouter.get("/:token", async (req, res) => {
    try {
        const token = req?.params?.token;
        const auth = await collections.auth.findOne({ token: token });

        if (auth) {
            res.status(200).send(true);
        } else {
            res.status(401).send(false);
        }

    } catch (error) {
        res.status(404).send(`Unauthorized`);
    }
});
