'use server'
import { getAllIngredients } from '../actions/getAllIngredients';
import { getSumCostOfIngredients } from '../actions/getSumCostOfIngredients';
import { CheckoutItem } from './CheckoutItem';

//component used to fetch all ingredients data from the server and wrap the checkoutitem
//so that it can access the ingredients data.
export async function CheckoutItemServerComponent({menuItem, cartItem}) {
  var ingredients = await getAllIngredients();

  var cartItemIDs = cartItem.ingredientIds
  var cartItemPrice = await getSumCostOfIngredients(cartItemIDs)

  return (
    <CheckoutItem menuItem={menuItem} cartItem={cartItem} cartItemPrice={cartItemPrice} ingredients={ingredients} cartItemIDs={cartItemIDs}  />
  )
};