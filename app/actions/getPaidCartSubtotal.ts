import { getPaidCustomerCart } from "./getPaidCustomerCart";
import { getAllIngredientsNoSizes } from "./getAllIngredientsNoSizes";
//function to get the price of an order that's already paid
export async function getPaidCartSubtotal(order_id : number) {
  //get all ingredients from supabase
  const allIngredients = await getAllIngredientsNoSizes()

  const { cart, userId, error : cartError } = await getPaidCustomerCart(order_id);
  
  if (cartError) {
    console.error("Error fetching menu items:", cartError);
    return [];
  }

  //initialize subtotal
  let subTotal = 0;

  //add the price of each ingredient in each cart item to subtotal
  for (const item of cart) {
    var cartItemIDs = item.ingredientIds

    for (var itemId of cartItemIDs) {
      if(!allIngredients) return;
      const ingredient = allIngredients.find(item => item.menu_item_id === itemId);
      if(!ingredient) {
        console.log("Can't find ingredient with id: " + itemId)
        console.log("type of ingredient: " + typeof ingredient)
      }
      else{
      }
      subTotal += ingredient?.price;
    }

  }

  return subTotal;
}
