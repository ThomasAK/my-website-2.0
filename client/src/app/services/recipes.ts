

export interface Recipe {
    name: string;
    ingredients: [{name: string, amount: string, measurement: string}];
    instructions: [string];
    path: string
    description: string;
    locked: boolean;
    _id?: string;
}