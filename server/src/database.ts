import * as mongodb from "mongodb";
import { Content,jsonSchema as contentSchema } from "./content";
import { Icons, jsonSchema as iconsSchema } from "./icons";
import { Recipe, jsonSchema as recipeSchema } from "./recipes";
import {Token, jsonSchema as tokenSchema} from "./token";

export const collections: {
    content?: mongodb.Collection<Content>;
    icons?: mongodb.Collection<Icons>
    recipes?: mongodb.Collection<Recipe>
    auth?: mongodb.Collection<Token>
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("website");
    await applySchemaValidation(db, contentSchema, "content");
    await applySchemaValidation(db, iconsSchema, "icons");
    await applySchemaValidation(db, recipeSchema, "recipes");
    await applySchemaValidation(db, tokenSchema, 'auth')

    collections.content = db.collection<Content>("content");
    collections.icons = db.collection<Icons>("icons");
    collections.recipes = db.collection<Recipe>('recipes');
    collections.auth = db.collection<Token>('auth')
}

async function applySchemaValidation(db: mongodb.Db, jsonSchema: object, name: string) {

    // Try applying the modification to the collection, if the collection doesn't exist, create it
    await db.command({
        collMod: name,
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection(name, {validator: jsonSchema});
        }
    });
}