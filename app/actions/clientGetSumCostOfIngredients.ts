'use client'
import { ingredient } from "../types/ingredient"
//client-side function to sum the cost of provided ingredients based on their id
//the cartItemIDs change on components every time a new ingredient is selected
//or deselected, but ingredients is only fetched once from the server and then
//passed here. before, selecting/deselecting was very slow
export async function clientGetSumCostOfIngredients(cartItemIDs: number[] , ingredients: ingredient[]) {  
  const allIngredients = ingredients

  var subTotal = 0

  //for each id
  for (var itemId of cartItemIDs) {
    if(!allIngredients) return;
    const ingredient = allIngredients.find(item => item.menu_item_id === Number(itemId));
    if(!ingredient) {
      console.log("Can't find ingredient with id: " + itemId)
      console.log("Type of ingredient: " + typeof ingredient)
      console.log("Type of itemId: " + typeof itemId)
    }
    //add cost of this ingredient to the subtotal
    subTotal += ingredient?.price ?? 0;
  }
  //return subtotal
  return subTotal;
}
