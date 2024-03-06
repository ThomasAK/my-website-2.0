import * as express from "express";
import { collections } from "./database";
import * as mongodb from "mongodb";

export const recipeRouter = express.Router();
recipeRouter.use(express.json());

recipeRouter.get("/", async (_req, res) => {
    try {
        const recipe = await collections.recipes.find({}).toArray();
        res.status(200).send(recipe);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

recipeRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const recipe = await collections.recipes.findOne(query);

        if (recipe) {
            res.status(200).send(recipe);
        } else {
            res.status(404).send(`Failed to find recipe: ${id}`);
        }

    } catch (error) {
        res.status(404).send(`Failed to find recipe: ${req?.params?.id}`);
    }
});

recipeRouter.post("/" , async (req ,res ) => {
    try {
        const recipe = req.body;
        const result = await collections.recipes.insertOne(recipe);

        if (result.acknowledged){
            res.status(201).send(recipe._id)
        } else {
            res.status(500).send("Failed to create new recipe")
        }
    } catch (err) {
        console.error(err);
        res.send(400).send(err.message)
    }
})

recipeRouter.put("/:id", async (req ,res ) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id)};
        const recipe = req.body;
        const result = await collections.recipes.updateOne(query, {$set: recipe})
        if (result && result.matchedCount) {
            res.status(200).send(`Updated recipe ${recipe.name}`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find recipe ${recipe.name}`);
        } else {
            res.status(304).send(`Failed to update recipe ${recipe.name}`);
        }
    } catch (err){
        console.error(err);
        res.status(400).send(err.message)
    }
})

recipeRouter.delete("/:id", async (req, res ) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id)};
        if (!(await collections.recipes.findOne(query)).locked ) {
            const result = await collections.recipes.deleteOne(query)

            if (result && result.deletedCount) {
                res.status(202).send(`Removed recipe ${id}`);
            } else if (!result) {
                res.status(400).send(`Failed to remove recipe ${id}`);
            } else if (!result.deletedCount) {
                res.status(404).send(`Failed to find  recipe ${id}`);
            }
        } else {
            res.status(423).send('This recipe is locked and can not be edited')
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
}
})