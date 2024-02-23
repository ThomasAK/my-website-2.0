import * as express from "express";
import { collections } from "./database";

export const iconRouter = express.Router();
iconRouter.use(express.json());

iconRouter.get("/", async (_req, res) => {
    try {
        const content = await collections.icons.find({}).toArray();
        res.status(200).send(content);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

iconRouter.get("/:name", async (req, res) => {
    try {
        const iconName = req?.params?.name;
        const content = await collections.icons.findOne({ name: iconName });

        if (content) {
            res.status(200).send(content);
        } else {
            res.status(404).send(`Failed to find icon: ${iconName}`);
        }

    } catch (error) {
        res.status(404).send(`Failed to find icon: ${req?.params?.name}`);
    }
});

