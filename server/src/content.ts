import * as mongodb from "mongodb";

export interface Content {
    name: string;
    contentBlocks: [{subHeader:string, text: string, links: [string], image: string}];
    _id?: mongodb.ObjectId;
}