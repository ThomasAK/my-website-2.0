import * as mongodb from "mongodb";

export interface Content {
    name: string;
    contentBlocks: [{subHeader:string, text: string, image: {path:string, href:string}}];
    _id?: mongodb.ObjectId;
}