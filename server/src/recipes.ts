import * as mongodb from "mongodb";

export interface Recipe {
    name: string;
    ingredients: [{name: string, measurement: string}];
    instructions: [string];
    description: string;
    meal: string;
    path: string;
    locked: boolean;
    _id?: mongodb.ObjectId;
}

export const jsonSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["name", "ingredients", "instructions", "locked"],
        additionalProperties: false,
        properties: {
            name: {
                bsonType: "string",
                description: "'name' is required and is a string",
            },
            ingredients: {
                bsonType: ["array"],
                description: "'ingredients' is required and is a array of objects",
                items: {
                    bsonType: ["object"],
                    required: ["name", "amount", "measurement"],
                    description: "'ingredients' must contain the stated fields",
                    properties: {
                        name: {
                            bsonType: "string",
                            description: "'name' is required and is a string",
                        },
                        measurement: {
                            bsonType:"string",
                            description: "'measurement' is required and is a string"
                        }
                    }
                }
            },
            instructions:{
                bsonType: ["array"],
                description: "'instructions' is a required field and is a array of strings",
                items:{
                    bsonType: "string",
                }
            },
            description: {
                bsonType: "string",
                description: "'description' is not a required field and is a string"
            },
            locked:{
                bsonType: "boolean",
                description: "'locked' is a required field and is a string"
            },
            path:{
                bsonType: "string",
                description: "'path' is not a required field and is a string"
            },
            meal:{
                bsonType: "string",
                description: "'meal' is not required and is a string"
            },
            _id:{}
        },
    },
};