import { createClient } from "@/utils/supabase/server";
import { getLiveCustomerCart } from "./getLiveCustomerCart";
import { getAllMenuItems } from "./getAllMenuItems";
import { getAllIngredientsNoSizes } from "./getAllIngredientsNoSizes";

export async function getLiveCartSubtotal() {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  
  const menuItems = await getAllMenuItems()
  const allIngredients = await getAllIngredientsNoSizes()

  const { cart, userId, error : cartError } = await getLiveCustomerCart();
  
  if (cartError) {
    console.error("Error fetching menu items:", cartError);
    return [];
  }

  let subTotal = 0;

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
