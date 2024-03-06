import * as mongodb from "mongodb";

export interface Token {
    token: string;
    _id?: mongodb.ObjectId;
}

export const jsonSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["token"],
        additionalProperties: false,
        properties: {
            _id: {},
            token: {
                bsonType: "string",
                description: "'token' is required and is a string",
            },
        },
    },
};