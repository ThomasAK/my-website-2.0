
export interface Content {
    name: string;
    contentBlocks: [{name: string, subHeader:string, text: string, image: {path:string, href:string}}];
    _id?: string;
}


