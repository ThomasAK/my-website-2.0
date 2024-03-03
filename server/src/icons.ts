import * as mongodb from "mongodb";

export interface Icons {
    name: string;
    icons: [{name:string, href: string}];
    _id?: mongodb.ObjectId;
}

export const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name"],
            additionalProperties: false,
            properties: {
                id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                icons: {
                    bsonType: ["array"],
                    description: "'icons' is not required and is a array of objects",
                    items: {
                        bsonType: ["object"],
                        required: ["name", "href"],
                        description: "'icons' must contain the stated fields",
                        properties: {
                            name: {
                                bsonType: "string",
                                description: "'name' is required and a string",
                            },
                            href: {
                                bsonType: "string",
                                description: "'name' is required and a string",
                            }
                        }
                    }
                }
            },
        },
    };