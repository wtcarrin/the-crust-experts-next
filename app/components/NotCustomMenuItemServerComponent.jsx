import { getAllIngredients } from '../actions/getAllIngredients';
import { getAllSizes } from '../actions/getAllSizes';
import { NotCustomMenuItem } from './NotCustomMenuItem';
import { addItemToCart } from '../actions/addItemToCart';
import { getSumCostOfIngredients } from '../actions/getSumCostOfIngredients';

export async function NotCustomMenuItemServerComponent({ menuItem }) {
  var ingredients = await getAllIngredients();
  var sizes = await getAllSizes();

  var menuItemIDs = menuItem.ingredients

  var menuItemPrice = await getSumCostOfIngredients(menuItemIDs)
  if (menuItem.category === "Pizza") {
    ingredients = ingredients.filter(ingredient => ingredient.category === "Pizza Ingredient");
    sizes = sizes.filter(size => size.category === "Pizza Ingredient");
  }
  else if (menuItem.category === "Salad") {
    ingredients = ingredients.filter(ingredient => ingredient.category === "Salad Ingredient");
    sizes = sizes.filter(size => size.category === "Salad Ingredient");
  }
  return <NotCustomMenuItem menuItem={menuItem} ingredients={ingredients} menuItemPrice={menuItemPrice} sizes={sizes} addItemToCart={addItemToCart} getSumCostOfIngredients={getSumCostOfIngredients}/>;
}