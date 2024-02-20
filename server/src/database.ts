import * as mongodb from "mongodb";
import {Content} from "./content";

export const collections: {
    content?: mongodb.Collection<Content>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("website");
    await applySchemaValidationContent(db);

    collections.content = db.collection<Content>("content");
}

async function applySchemaValidationContent(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "contentBlocks"],
            additionalProperties: false,
            properties: {
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                contentBlocks: {
                    bsonType: ["array"],
                    description: "'contentBlocks' is required and is a array of objects",
                    items: {
                        bsonType: ["object"],
                        required: ["subHeader", "text"],
                        description: "'contentBlocks' must contain the stated fields",
                        properties: {
                            subHeader: {
                                bsonType: "string",
                                description: "'subHead' is required and a string",
                            },
                            text: {
                                bsonType: "string",
                                description: "'text' is required and a string",
                            },
                            image: {
                                bsonType: "object",
                                description: "'image' is optional field of type object",
                                properties:{
                                    href: {
                                        bsonType: "string",
                                        description: "'href' is optional and a string"
                                    },
                                    path: {
                                      bsonType: "string",
                                      description: "'path' is optional and a string"
                                    }
                                }
                            }
                        }
                    }
                }
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it
    await db.command({
        collMod: "content",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("content", {validator: jsonSchema});
        }
    });
}