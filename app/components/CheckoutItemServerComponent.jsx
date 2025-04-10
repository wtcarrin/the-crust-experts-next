'use server'
import { getAllIngredients } from '../actions/getAllIngredients';
import { getAllSizes } from '../actions/getAllSizes';
import { getSumCostOfIngredients } from '../actions/getSumCostOfIngredients';
import { CheckoutItem } from './CheckoutItem';


export async function CheckoutItemServerComponent({menuItem, cartItem}) {
  var ingredients = await getAllIngredients();
  var sizes = await getAllSizes();

  var cartItemIDs = cartItem.ingredientIds
  var cartItemPrice = await getSumCostOfIngredients(cartItemIDs)
  console.log("cartItem: ", cartItem);
  console.log("menuItem: ", menuItem);

  var ingredientsString = ''
  for (const ingredient of ingredients) {
    if (cartItemIDs.includes(ingredient.menu_item_id)) {
      if (ingredientsString === '') {
        ingredientsString += ingredient.name
      }
      else {
        ingredientsString += ', ' + ingredient.name
      }
      }
    }

  return (
    <CheckoutItem menuItem={menuItem} cartItem={cartItem} cartItemPrice={cartItemPrice} ingredients={ingredients} cartItemIDs={cartItemIDs}  />
  )
};