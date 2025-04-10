import { getAllIngredients } from '../actions/getAllIngredients';
import { getAllSizes } from '../actions/getAllSizes';
import { CustomMenuItem } from './CustomMenuItem';
import { addItemToCart } from '../actions/addItemToCart';
import { getSumCostOfIngredients } from '../actions/getSumCostOfIngredients';

export async function CustomMenuItemServerComponent({ menuItem , ingredients}) {
  var sizes = await getAllSizes();
  var menuItemIDs = menuItem.ingredients

  var menuItemPrice = await getSumCostOfIngredients(menuItemIDs, ingredients)
  if (menuItem.category === "Pizza") {
    var myIngredients = ingredients.filter(ingredient => ingredient.category === "Pizza Ingredient");
    sizes = sizes.filter(size => size.category === "Pizza Ingredient");
  }
  else if (menuItem.category === "Salad") {
    var myIngredients = ingredients.filter(ingredient => ingredient.category === "Salad Ingredient");
    sizes = sizes.filter(size => size.category === "Salad Ingredient");
  }
  return <CustomMenuItem menuItem={menuItem} ingredients={myIngredients} menuItemPrice={menuItemPrice} sizes={sizes} addItemToCart={addItemToCart} getSumCostOfIngredients={getSumCostOfIngredients}/>;
}