import { NotCustomCartItem } from '../components/NotCustomCartItem'
import { CustomCartItem } from '../components/CustomCartItem'
import { getAllIngredientsAndSizes } from '../actions/getAllIngredientsAndSizes'
import { getAllIngredients } from '../actions/getAllIngredients';
import { getAllSizes } from '../actions/getAllSizes';
import { getSumCostOfIngredients } from '../actions/getSumCostOfIngredients';
import { updateItemInCart } from '../actions/updateItemInCart';

export async function CartItem({menuItem, cartItem}) {
  var ingredients = await getAllIngredients();
  var sizes = await getAllSizes();

  var cartItemIDs = cartItem.ingredientIds
  var cartItemPrice = await getSumCostOfIngredients(cartItemIDs)

  if (menuItem.customizable) {
    if (menuItem.category === "Pizza") {
      ingredients = ingredients.filter(ingredient => ingredient.category === "Pizza Ingredient");
      
      sizes = sizes.filter(size => size.category === "Pizza Ingredient");
    }
    else if (menuItem.category === "Salad") {
      ingredients = ingredients.filter(ingredient => ingredient.category === "Salad Ingredient");
      sizes = sizes.filter(size => size.category === "Salad Ingredient");
    }
    return (
        //<CustomCartItem menuItem={menuItem} cartItem={cartItem} allIngredients={allIngredients} />
        
        <CustomCartItem menuItem={menuItem} cartItem={cartItem} cartItemPrice={cartItemPrice} ingredients={ingredients} sizes={sizes} getSumCostOfIngredients={getSumCostOfIngredients} updateItemInCart={updateItemInCart} />
    )
  }
  else {
    return (
        <NotCustomCartItem menuItem={menuItem} cartItem={cartItem} cartItemPrice={cartItemPrice} ingredients={ingredients} sizes={sizes} getSumCostOfIngredients={getSumCostOfIngredients} updateItemInCart={updateItemInCart} />
    )
  }
};