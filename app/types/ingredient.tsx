export interface ingredient {
    menu_item_id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    customizable: any;   // or something more specific
    ingredients: any;    // or Ingredient[] if it's recursive
  }