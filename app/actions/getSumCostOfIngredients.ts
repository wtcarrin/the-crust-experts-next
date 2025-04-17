"use server"
import { createClient } from "@/utils/supabase/server";
import { getLiveCustomerCart } from "./getLiveCustomerCart";
import { getAllMenuItems } from "./getAllMenuItems";
import { getAllIngredientsAndSizes } from "./getAllIngredientsAndSizes";

export async function getSumCostOfIngredients(cartItemIDs: number[]) {  
  const allIngredients = await getAllIngredientsAndSizes()

  var subTotal = 0

  for (var itemId of cartItemIDs) {
    if(!allIngredients) return;
    const ingredient = allIngredients.find(item => item.menu_item_id === Number(itemId));
    console.log("Ingredient: ", itemId)
    if(!ingredient) {
      console.log("Can't find ingredient with id: " + itemId)
      console.log("Type of ingredient: " + typeof ingredient)
      console.log("Type of itemId: " + typeof itemId)
    }
    else {
      console.log("Ingredient: ", itemId, "\tCost: ", ingredient.price)
      subTotal += ingredient?.price;
    }
  }
  return subTotal;
}
