//my only comment here is that this is definitely the way to pass data... but it's too late to go back and
//fix it if it's not broken, so...
export interface ingredient {
    menu_item_id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    customizable: any;   // or something more specific
    ingredients: any;    // or Ingredient[] if it's recursive
  }