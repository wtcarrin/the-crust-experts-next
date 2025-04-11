'use client'
import { ingredient } from "../types/ingredient"

export async function clientGetSumCostOfIngredients(cartItemIDs: number[] , ingredients: ingredient[]) {  
  const allIngredients = ingredients

  var subTotal = 0

  for (var itemId of cartItemIDs) {
    if(!allIngredients) return;
    const ingredient = allIngredients.find(item => item.menu_item_id === Number(itemId));
    if(!ingredient) {
      console.log("Can't find ingredient with id: " + itemId)
      console.log("Type of ingredient: " + typeof ingredient)
      console.log("Type of itemId: " + typeof itemId)
    }
    subTotal += ingredient?.price ?? 0;
  }
  return subTotal;
}
