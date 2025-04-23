import { createClient } from "@/utils/supabase/server";
import { getLiveCustomerCart } from "./getLiveCustomerCart";
import { getAllMenuItems } from "./getAllMenuItems";
import { getAllIngredientsNoSizes } from "./getAllIngredientsNoSizes";
//function to get customer's subtotal according to the cart currently in the database
export async function getLiveCartSubtotal() {
  //get all ingredient information
  const allIngredients = await getAllIngredientsNoSizes()
  
  //get customer cart information
  const { cart, userId, error : cartError } = await getLiveCustomerCart();
  
  if (cartError) {
    console.error("Error fetching menu items:", cartError);
    return [];
  }

  //initialize variable for keeping track of subtotal
  let subTotal = 0;

  //iterate through all items in customer's current cart and sum the cost of their ingredients
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
      //if data is passed correctly, update the subtotal here
      subTotal += ingredient?.price;
    }

  }

  return subTotal;
}
