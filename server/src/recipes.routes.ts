import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const recipeRouter = express.Router();
recipeRouter.use(express.json());

recipeRouter.get("/", async (_req, res) => {
    try {
        const recipes = await collections.recipes.find({}).toArray();
        res.status(200).send(recipes);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

recipeRouter.get("/:name", async (req, res) => {
    try {
        const name = req?.params?.name;
        const query = { _name: new mongodb.ObjectId(name) };
        const recipes = await collections.recipes.findOne(query);

        if (recipes) {
            res.status(200).send(recipes);
        } else {
            res.status(404).send(`Failed to find recipes: ${name}`);
        }

    } catch (error) {
        res.status(404).send(`Failed to find recipes: ${req?.params?.name}`);
    }
});

recipeRouter.post("/", async (req, res) => {
    try {
        const recipes = req.body;
        const result = await collections.recipes.insertOne(recipes);

        if (result.acknowledged) {
            res.status(201).send(`Created new recipes: name ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create recipes.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

recipeRouter.put("/:name", async (req, res) => {
    try {
        const name = req?.params?.name;
        const recipes = req.body;
        const query = { _name: new mongodb.ObjectId(name) };
        const result = await collections.recipes.updateOne(query, { $set: recipes });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated recipes: name ${name}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find recipes: name ${name}`);
        } else {
            res.status(304).send(`Failed to update recipes: name ${name}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

recipeRouter.delete("/:name", async (req, res) => {
    try {
        const name = req?.params?.name;
        const query = { _name: new mongodb.ObjectId(name) };
        const result = await collections.recipes.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed recipes: name ${name}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove recipes: name ${name}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find recipes: name ${name}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});