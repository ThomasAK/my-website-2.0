import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const contentRouter = express.Router();
contentRouter.use(express.json());

contentRouter.get("/", async (_req, res) => {
    try {
        const content = await collections.content.find({}).toArray();
        res.status(200).send(content);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

contentRouter.get("/:name", async (req, res) => {
    try {
        const name = req?.params?.name;
        const content = await collections.content.findOne({ sectionid: name });

        if (content) {
            res.status(200).send(content);
        } else {
            res.status(404).send(`Failed to find content: ${name}`);
        }

    } catch (error) {
        res.status(404).send(`Failed to find content: ${req?.params?.name}`);
    }
});

