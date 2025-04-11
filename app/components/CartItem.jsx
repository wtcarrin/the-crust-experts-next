import { NotCustomCartItem } from '../components/NotCustomCartItem'
import { CustomCartItem } from '../components/CustomCartItem'
import { getAllIngredientsAndSizes } from '../actions/getAllIngredientsAndSizes'
import { getAllIngredients } from '../actions/getAllIngredients';
import { getAllSizes } from '../actions/getAllSizes';
import { getSumCostOfIngredients } from '../actions/getSumCostOfIngredients';
import { updateItemInCart } from '../actions/updateItemInCart';
import { deleteItemFromCart } from '../actions/deleteItemFromCart'

import { clientGetSumCostOfIngredients } from '../actions/clientGetSumCostOfIngredients';

export async function CartItem({menuItem, cartItem, allIngredients, sizes}) {
  
  function getSumCostOfIngredients(cartItemIDs,ingredients) {  
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
  //var ingredients = await getAllIngredients();
  var ingredients = allIngredients
  

  var cartItemIDs = cartItem.ingredientIds
  //var cartItemPrice = await getSumCostOfIngredients(cartItemIDs)
  var cartItemPrice = getSumCostOfIngredients(cartItemIDs, allIngredients)
  if (menuItem.category === "Pizza") {
    var myIngredients = ingredients.filter(ingredient => ingredient.category === "Pizza Ingredient");
    var mySizes = sizes.filter(size => size.category === "Pizza Ingredient");
  }
  else if (menuItem.category === "Salad") {
    var myIngredients = ingredients.filter(ingredient => ingredient.category === "Salad Ingredient");
    var mySizes = sizes.filter(size => size.category === "Salad Ingredient");
  }
  else if (menuItem.category === "Drink") {
    var mySizes = sizes.filter(size => size.category === "Drink Ingredient");
  }
  if (menuItem.customizable) {
    return (
      <CustomCartItem menuItem={menuItem} cartItem={cartItem} cartItemPrice={cartItemPrice} ingredients={myIngredients} sizes={mySizes} deleteItemFromCart={deleteItemFromCart} updateItemInCart={updateItemInCart}/>
    )
  }
  else {
    return (
      <NotCustomCartItem menuItem={menuItem} cartItem={cartItem} cartItemPrice={cartItemPrice} ingredients={myIngredients} sizes={mySizes} deleteItemFromCart={deleteItemFromCart} updateItemInCart={updateItemInCart} />
    )
  }
};