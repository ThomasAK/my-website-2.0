

export interface Recipe {
    name: string;
    ingredients: [{name: string, measurement: string}];
    instructions: [string];
    description: string;
    meal: string;
    path: string
    locked: boolean;
    _id?: string;
}