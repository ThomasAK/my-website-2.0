import * as mongodb from "mongodb";

export interface Content {
    name: string;
    contentBlocks: [{name: string, subHeader:string, text: string, image: {path:string, href:string}}];
    sectionId: string
    _id?: mongodb.ObjectId;
}

export const jsonSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["sectionid", "contentBlocks"],
        additionalProperties: false,
        properties: {
            name: {
                bsonType: "string",
                description: "'name' is required and is a string",
            },
            sectionId: {
                bsonType:"string",
                description: "'sectionid' is required and is a string "
            },
            contentBlocks: {
                bsonType: ["array"],
                description: "'contentBlocks' is required and is a array of objects",
                items: {
                    bsonType: ["object"],
                    required: ["name"],
                    description: "'contentBlocks' must contain the stated fields",
                    properties: {
                        name: {
                          bsonType: "string",
                          description: "'name' is required and a string"
                        },
                        subHeader: {
                            bsonType: "string",
                            description: "'subHead' is optional and a string",
                        },
                        text: {
                            bsonType: "string",
                            description: "'text' is optional and a string",
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